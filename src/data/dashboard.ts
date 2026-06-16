// Deterministic mock dataset generation for the dashboard.
import { portrait } from "./images";

export type Class = { id: string; name: string; level: "Primary" | "Junior" | "Senior"; teacherId: string; studentCount: number };
export type Subject = { id: string; name: string; code: string; classes: string[]; teacherIds: string[] };
export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  classId: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  parentName: string;
  parentPhone: string;
  address: string;
  photo: string;
  attendancePercentage: number;
  feeStatus: "Paid" | "Partially Paid" | "Outstanding";
  createdAt: string;
};
export type TeacherRecord = {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  qualification: string;
  subjects: string[];
  yearsOfExperience: number;
  phone: string;
  email: string;
  photo: string;
};
export type Announcement = { id: string; title: string; body: string; audience: "All" | "Staff" | "Students" | "Parents"; createdAt: string };
export type AttendanceRecord = { id: string; studentId: string; classId: string; date: string; status: "Present" | "Absent" | "Late" | "Excused" };
export type ResultRecord = { id: string; studentId: string; subjectId: string; term: "1st" | "2nd" | "3rd"; session: string; score: number; grade: string };
export type FeeRecord = { id: string; studentId: string; amount: number; status: "Paid" | "Partially Paid" | "Outstanding"; term: "1st" | "2nd" | "3rd"; session: string; paymentDate: string | null };

// ---- generators ----
const FIRST_M = ["Adewale","Tunde","Chidi","Emeka","David","Samuel","Peter","Joshua","Daniel","John","Michael","James","Ibrahim","Yusuf","Femi","Sola","Ayo","Kunle","Bola","Seun","Tobi","Wale","Kola","Niyi","Lekan"];
const FIRST_F = ["Amaka","Fatima","Aisha","Grace","Chioma","Adaeze","Ngozi","Funke","Bisi","Bose","Tola","Ada","Folake","Bukola","Halima","Hauwa","Zainab","Yetunde","Lola","Joy","Mary","Esther","Ruth","Sade","Tope"];
const LAST = ["Okeke","Adewale","Bello","Chen","Okafor","Uche","Mohammed","Johnson","Nwosu","Eze","Ibrahim","Adeyemi","Olawale","Akinola","Adeleke","Abiola","Oluwaseun","Adekunle","Babatunde","Iwobi","Onyeka","Anyanwu","Lawal","Sani","Bakare"];
const STREETS = ["Allen Avenue","Awolowo Road","Ikorodu Road","Adeniyi Jones","Bourdillon Road","Eric Manuel","Falomo","Glover Road","Herbert Macaulay","Marina","Opebi","Ozumba Mbadiwe","Ribadu Road","Sanusi Fafunwa","Toyin"];

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
function pick<T>(r: () => number, arr: T[]): T { return arr[Math.floor(r() * arr.length)]; }

export const classes: Class[] = [
  { id: "c-jss1", name: "JSS 1", level: "Junior", teacherId: "t-001", studentCount: 0 },
  { id: "c-jss2", name: "JSS 2", level: "Junior", teacherId: "t-002", studentCount: 0 },
  { id: "c-jss3", name: "JSS 3", level: "Junior", teacherId: "t-003", studentCount: 0 },
  { id: "c-ss1", name: "SS 1", level: "Senior", teacherId: "t-004", studentCount: 0 },
  { id: "c-ss2", name: "SS 2", level: "Senior", teacherId: "t-005", studentCount: 0 },
  { id: "c-ss3", name: "SS 3", level: "Senior", teacherId: "t-006", studentCount: 0 },
];

export const subjects: Subject[] = [
  { id: "s-math", name: "Mathematics", code: "MTH", classes: classes.map(c => c.id), teacherIds: ["t-008"] },
  { id: "s-eng", name: "English Language", code: "ENG", classes: classes.map(c => c.id), teacherIds: ["t-003"] },
  { id: "s-phy", name: "Physics", code: "PHY", classes: ["c-ss1","c-ss2","c-ss3"], teacherIds: ["t-002"] },
  { id: "s-chem", name: "Chemistry", code: "CHM", classes: ["c-ss1","c-ss2","c-ss3"], teacherIds: ["t-007"] },
  { id: "s-bio", name: "Biology", code: "BIO", classes: ["c-ss1","c-ss2","c-ss3"], teacherIds: ["t-007"] },
  { id: "s-lit", name: "Literature in English", code: "LIT", classes: ["c-ss1","c-ss2","c-ss3"], teacherIds: ["t-003"] },
  { id: "s-hist", name: "History", code: "HST", classes: ["c-jss1","c-jss2","c-jss3"], teacherIds: ["t-003"] },
  { id: "s-geo", name: "Geography", code: "GEO", classes: classes.map(c => c.id), teacherIds: ["t-005"] },
  { id: "s-econ", name: "Economics", code: "ECN", classes: ["c-ss1","c-ss2","c-ss3"], teacherIds: ["t-005"] },
  { id: "s-acc", name: "Accounting", code: "ACC", classes: ["c-ss1","c-ss2","c-ss3"], teacherIds: ["t-005"] },
  { id: "s-cs", name: "Computer Science", code: "CSC", classes: classes.map(c => c.id), teacherIds: ["t-004"] },
  { id: "s-fre", name: "French", code: "FRE", classes: classes.map(c => c.id), teacherIds: ["t-003"] },
  { id: "s-pe", name: "Physical Education", code: "PED", classes: classes.map(c => c.id), teacherIds: ["t-006"] },
  { id: "s-art", name: "Visual Arts", code: "ART", classes: classes.map(c => c.id), teacherIds: ["t-003"] },
  { id: "s-mus", name: "Music", code: "MUS", classes: classes.map(c => c.id), teacherIds: ["t-003"] },
  { id: "s-fmth", name: "Further Mathematics", code: "FMT", classes: ["c-ss2","c-ss3"], teacherIds: ["t-008"] },
];

const photoSeeds = [
  "1503454537195-1dcabb73ffb9","1531123897727-8f129e1688ce","1502685104226-ee32379fefbe","1517841905240-472988babdf9",
  "1554151228-14d9def656e4","1500648767791-00dcc994a43e","1494790108377-be9c29b29330","1438761681033-6461ffad8d80",
  "1531427186611-ecfd6d936c79","1488161628813-04466f872be2","1492562080023-ab3db95bfbce","1507003211169-0a1dd7228f2d",
];

export const teachers: TeacherRecord[] = Array.from({ length: 25 }, (_, i) => {
  const r = rand(1000 + i);
  const female = r() > 0.5;
  const fn = pick(r, female ? FIRST_F : FIRST_M);
  const ln = pick(r, LAST);
  const depts = ["Science","Arts & Humanities","Commercial","ICT & Computing","Sports & Athletics","Administration"];
  return {
    id: `t-${String(i + 1).padStart(3, "0")}`,
    firstName: fn,
    lastName: ln,
    department: pick(r, depts),
    qualification: pick(r, ["B.Ed", "B.Sc + PGCE", "M.Sc Education", "M.A Education", "PhD Education"]),
    subjects: [pick(r, subjects).name, pick(r, subjects).name],
    yearsOfExperience: 3 + Math.floor(r() * 22),
    phone: `+234 80${Math.floor(r() * 10)} ${Math.floor(r() * 9000 + 1000)} ${Math.floor(r() * 9000 + 1000)}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@brightfutureacademy.edu`,
    photo: portrait(photoSeeds[i % photoSeeds.length]),
  };
});

export const students: Student[] = Array.from({ length: 100 }, (_, i) => {
  const r = rand(2000 + i);
  const female = r() > 0.5;
  const fn = pick(r, female ? FIRST_F : FIRST_M);
  const ln = pick(r, LAST);
  const cls = pick(r, classes);
  const year = 2007 + Math.floor(r() * 11);
  const month = 1 + Math.floor(r() * 12);
  const day = 1 + Math.floor(r() * 28);
  const attendance = 70 + Math.floor(r() * 30);
  const fee = pick(r, ["Paid","Paid","Paid","Partially Paid","Outstanding"] as const);
  return {
    id: `st-${String(i + 1).padStart(3, "0")}`,
    firstName: fn,
    lastName: ln,
    classId: cls.id,
    gender: female ? "Female" : "Male",
    dateOfBirth: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    parentName: `${pick(r, ["Mr.","Mrs.","Dr."])} ${pick(r, LAST)}`,
    parentPhone: `+234 80${Math.floor(r() * 10)} ${Math.floor(r() * 9000 + 1000)} ${Math.floor(r() * 9000 + 1000)}`,
    address: `${1 + Math.floor(r() * 99)} ${pick(r, STREETS)}, Lagos`,
    photo: portrait(photoSeeds[i % photoSeeds.length]),
    attendancePercentage: attendance,
    feeStatus: fee,
    createdAt: `2024-09-${String(1 + (i % 28)).padStart(2, "0")}`,
  };
});

// Recompute class counts.
for (const c of classes) {
  c.studentCount = students.filter((s) => s.classId === c.id).length;
}

export const announcements: Announcement[] = [
  { id: "a-1", title: "Mid-term break", body: "Mid-term break runs from 24–28 Oct. Classes resume Monday 31 Oct.", audience: "All", createdAt: "2025-10-10" },
  { id: "a-2", title: "Parent-teacher conference", body: "PTC for JSS classes this Saturday from 9am.", audience: "Parents", createdAt: "2025-10-05" },
  { id: "a-3", title: "Inter-house sports day registration", body: "Sign up at the sports office by Friday.", audience: "Students", createdAt: "2025-09-28" },
  { id: "a-4", title: "Staff briefing", body: "All-staff briefing in the main hall, Monday 7:30am.", audience: "Staff", createdAt: "2025-09-22" },
];

// Attendance — small synthetic recent window per student
export const attendance: AttendanceRecord[] = (() => {
  const out: AttendanceRecord[] = [];
  const days = 10;
  students.forEach((s, i) => {
    const r = rand(3000 + i);
    for (let d = 0; d < days; d++) {
      const date = new Date();
      date.setDate(date.getDate() - d);
      const v = r();
      const status: AttendanceRecord["status"] =
        v < 0.85 ? "Present" : v < 0.92 ? "Late" : v < 0.97 ? "Excused" : "Absent";
      out.push({ id: `${s.id}-${d}`, studentId: s.id, classId: s.classId, date: date.toISOString().slice(0, 10), status });
    }
  });
  return out;
})();

const gradeFor = (score: number) =>
  score >= 75 ? "A" : score >= 65 ? "B" : score >= 55 ? "C" : score >= 45 ? "D" : score >= 40 ? "E" : "F";

export const results: ResultRecord[] = (() => {
  const out: ResultRecord[] = [];
  students.forEach((s, i) => {
    const r = rand(4000 + i);
    const studentSubjects = subjects.filter((sub) => sub.classes.includes(s.classId)).slice(0, 8);
    studentSubjects.forEach((sub) => {
      const score = 40 + Math.floor(r() * 55);
      out.push({
        id: `${s.id}-${sub.id}`,
        studentId: s.id,
        subjectId: sub.id,
        term: "1st",
        session: "2025/2026",
        score,
        grade: gradeFor(score),
      });
    });
  });
  return out;
})();

export const fees: FeeRecord[] = students.map((s) => ({
  id: `f-${s.id}`,
  studentId: s.id,
  amount: 650_000,
  status: s.feeStatus,
  term: "1st",
  session: "2025/2026",
  paymentDate: s.feeStatus === "Paid" ? "2025-09-15" : s.feeStatus === "Partially Paid" ? "2025-09-20" : null,
}));

// Helpers
export const findStudent = (id: string) => students.find((s) => s.id === id);
export const findTeacher = (id: string) => teachers.find((t) => t.id === id);
export const className = (id: string) => classes.find((c) => c.id === id)?.name ?? "—";
export const subjectName = (id: string) => subjects.find((s) => s.id === id)?.name ?? "—";

// Dashboard aggregates
export const dashboardStats = {
  totalStudents: students.length,
  totalTeachers: teachers.length,
  attendanceRate: Math.round(
    (attendance.filter((a) => a.status === "Present").length / attendance.length) * 100,
  ),
  feesCollected: fees.filter((f) => f.status === "Paid").reduce((a, f) => a + f.amount, 0),
  feesOutstanding: fees.filter((f) => f.status !== "Paid").reduce((a, f) => a + f.amount, 0),
};
