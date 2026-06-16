import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type {
  Class, Subject, Student, TeacherRecord, Announcement,
  AttendanceRecord, ResultRecord, FeeRecord,
} from "@/data/dashboard";
import { portrait } from "@/data/images";

const PHOTOS = [
  "1503454537195-1dcabb73ffb9","1531123897727-8f129e1688ce","1502685104226-ee32379fefbe","1517841905240-472988babdf9",
  "1554151228-14d9def656e4","1500648767791-00dcc994a43e","1494790108377-be9c29b29330","1438761681033-6461ffad8d80",
  "1531427186611-ecfd6d936c79","1488161628813-04466f872be2","1492562080023-ab3db95bfbce","1507003211169-0a1dd7228f2d",
];
const pickPhoto = (i: number) => portrait(PHOTOS[i % PHOTOS.length]);

const splitName = (full: string) => {
  const [first, ...rest] = full.split(" ");
  return { firstName: first ?? full, lastName: rest.join(" ") || "—" };
};

const mapLevel = (lvl: string): Class["level"] =>
  lvl?.startsWith("Senior") ? "Senior" : lvl?.startsWith("Primary") ? "Primary" : "Junior";

const mapAttStatus = (s: string): AttendanceRecord["status"] =>
  s === "absent" ? "Absent" : s === "late" ? "Late" : s === "excused" ? "Excused" : "Present";

const mapFeeStatus = (s: string): FeeRecord["status"] =>
  s === "paid" ? "Paid" : s === "partial" ? "Partially Paid" : "Outstanding";

export type DashboardSnapshot = {
  classes: Class[];
  subjects: Subject[];
  teachers: TeacherRecord[];
  students: Student[];
  attendance: AttendanceRecord[];
  results: ResultRecord[];
  fees: FeeRecord[];
  announcements: Announcement[];
};

export const getDashboardSnapshot = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<DashboardSnapshot> => {
    const { supabase } = context;
    const [cls, subs, tch, stu, att, res, fee, ann] = await Promise.all([
      supabase.from("classes").select("*").order("name"),
      supabase.from("subjects").select("*").order("code"),
      supabase.from("teachers").select("*").order("staff_code"),
      supabase.from("students").select("*").order("admission_no"),
      supabase.from("attendance").select("*").order("date", { ascending: false }).limit(5000),
      supabase.from("results").select("*").limit(5000),
      supabase.from("fees").select("*"),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
    ]);
    for (const r of [cls, subs, tch, stu, att, res, fee, ann]) {
      if (r.error) throw new Error(r.error.message);
    }
    const classes: Class[] = (cls.data ?? []).map((c) => ({
      id: c.id, name: c.name, level: mapLevel(c.level),
      teacherId: c.homeroom_teacher ?? "", studentCount: 0,
    }));
    const subjects: Subject[] = (subs.data ?? []).map((s) => ({
      id: s.id, name: s.name, code: s.code,
      classes: classes.map((c) => c.id), teacherIds: [],
    }));
    const teachers: TeacherRecord[] = (tch.data ?? []).map((t, i) => {
      const { firstName, lastName } = splitName(t.full_name);
      return {
        id: t.id, firstName, lastName, department: t.department ?? "—",
        qualification: "B.Ed", subjects: t.subjects ?? [],
        yearsOfExperience: t.hire_date
          ? Math.max(1, new Date().getFullYear() - new Date(t.hire_date).getFullYear())
          : 1,
        phone: t.phone ?? "", email: t.email ?? "",
        photo: t.photo_url ?? pickPhoto(i),
      };
    });
    const feesData = fee.data ?? [];
    const attData = att.data ?? [];
    const presentByStudent = new Map<string, { p: number; t: number }>();
    for (const a of attData) {
      const row = presentByStudent.get(a.student_id) ?? { p: 0, t: 0 };
      row.t += 1; if (a.status === "present" || a.status === "late") row.p += 1;
      presentByStudent.set(a.student_id, row);
    }
    const feeByStudent = new Map<string, FeeRecord["status"]>();
    for (const f of feesData) feeByStudent.set(f.student_id, mapFeeStatus(f.status));
    const students: Student[] = (stu.data ?? []).map((s, i) => {
      const att = presentByStudent.get(s.id);
      const attRate = att && att.t > 0 ? Math.round((att.p / att.t) * 100) : 95;
      return {
        id: s.id,
        firstName: splitName(s.full_name).firstName,
        lastName: splitName(s.full_name).lastName,
        classId: s.class_id ?? "",
        gender: (s.gender === "Female" ? "Female" : "Male") as Student["gender"],
        dateOfBirth: s.date_of_birth ?? "2010-01-01",
        parentName: s.guardian_name ?? "—",
        parentPhone: s.guardian_phone ?? "—",
        address: s.address ?? "—",
        photo: s.photo_url ?? pickPhoto(i),
        attendancePercentage: attRate,
        feeStatus: feeByStudent.get(s.id) ?? "Outstanding",
        createdAt: s.created_at?.slice(0, 10) ?? "2024-09-01",
      };
    });
    for (const c of classes) c.studentCount = students.filter((s) => s.classId === c.id).length;

    const attendance: AttendanceRecord[] = attData.map((a) => ({
      id: a.id, studentId: a.student_id, classId: a.class_id ?? "",
      date: a.date, status: mapAttStatus(a.status),
    }));
    const results: ResultRecord[] = (res.data ?? []).map((r) => ({
      id: r.id, studentId: r.student_id, subjectId: r.subject_id,
      term: "1st", session: r.academic_year,
      score: Number(r.score), grade: r.grade ?? "—",
    }));
    const fees: FeeRecord[] = feesData.map((f) => ({
      id: f.id, studentId: f.student_id,
      amount: Number(f.amount_due),
      status: mapFeeStatus(f.status),
      term: "1st", session: f.academic_year,
      paymentDate: Number(f.amount_paid) > 0 ? f.updated_at?.slice(0, 10) ?? null : null,
    }));
    const announcements: Announcement[] = (ann.data ?? []).map((a) => ({
      id: a.id, title: a.title, body: a.body,
      audience: (a.audience === "students" ? "Students"
        : a.audience === "parents" ? "Parents"
        : a.audience === "staff" ? "Staff" : "All") as Announcement["audience"],
      createdAt: a.created_at.slice(0, 10),
    }));
    return { classes, subjects, teachers, students, attendance, results, fees, announcements };
  });

export type MyAccess = { userId: string; email: string; roles: string[] };

export const getMyAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MyAccess> => {
    const { supabase, userId, claims } = context;
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    if (error) throw new Error(error.message);
    return { userId, email: (claims as { email?: string }).email ?? "", roles: (data ?? []).map((r) => r.role) };
  });

export const createAnnouncement = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { title: string; body: string; audience: string }) => d)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("announcements").insert({
      title: data.title, body: data.body, audience: data.audience,
      published: true, author_id: context.userId,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveAttendance = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { date: string; entries: { studentId: string; status: string; classId?: string }[] }) => d)
  .handler(async ({ data, context }) => {
    const rows = data.entries.map((e) => ({
      student_id: e.studentId, class_id: e.classId ?? null, date: data.date,
      status: e.status as "present" | "absent" | "late" | "excused",
      recorded_by: context.userId,
    }));
    const { error } = await context.supabase.from("attendance").upsert(rows, { onConflict: "student_id,date" });
    if (error) throw new Error(error.message);
    return { ok: true, count: rows.length };
  });

export const saveResult = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { studentId: string; subjectId: string; term: string; year: string; score: number }) => d)
  .handler(async ({ data, context }) => {
    const grade = data.score >= 75 ? "A" : data.score >= 65 ? "B" : data.score >= 55 ? "C" : data.score >= 45 ? "D" : "F";
    const { error } = await context.supabase.from("results").upsert(
      [{ student_id: data.studentId, subject_id: data.subjectId, term: data.term, academic_year: data.year, score: data.score, grade, recorded_by: context.userId }],
      { onConflict: "student_id,subject_id,term,academic_year" },
    );
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const recordFeePayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { feeId: string; amount: number }) => d)
  .handler(async ({ data, context }) => {
    const { data: row, error: e1 } = await context.supabase.from("fees").select("*").eq("id", data.feeId).single();
    if (e1 || !row) throw new Error(e1?.message ?? "Fee not found");
    const newPaid = Number(row.amount_paid) + data.amount;
    const status = newPaid >= Number(row.amount_due) ? "paid" : newPaid > 0 ? "partial" : "unpaid";
    const { error } = await context.supabase.from("fees")
      .update({ amount_paid: newPaid, status, recorded_by: context.userId })
      .eq("id", data.feeId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
