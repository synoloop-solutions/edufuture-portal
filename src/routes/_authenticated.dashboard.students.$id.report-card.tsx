import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/lib/dashboard-hooks";
import { useMemo } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { ClientOnly } from "@/components/ClientOnly";

export const Route = createFileRoute("/_authenticated/dashboard/students/$id/report-card")({
  component: ReportCardPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl text-center py-20">
      <h1 className="text-2xl font-bold">Student not found</h1>
      <Button asChild className="mt-6"><Link to="/dashboard/students">Back to students</Link></Button>
    </div>
  ),
});

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 11, fontFamily: "Helvetica" },
  header: { borderBottom: "2 solid #0B3D91", paddingBottom: 12, marginBottom: 16 },
  schoolName: { fontSize: 18, fontWeight: 700, color: "#0B3D91" },
  subtitle: { fontSize: 10, color: "#555", marginTop: 2 },
  h2: { fontSize: 13, fontWeight: 700, marginTop: 14, marginBottom: 6, color: "#0B3D91" },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { width: 110, color: "#666" },
  table: { borderTop: "1 solid #ccc", borderLeft: "1 solid #ccc", marginTop: 6 },
  tr: { flexDirection: "row", borderBottom: "1 solid #ccc" },
  th: { padding: 6, fontWeight: 700, backgroundColor: "#f3f4f6", borderRight: "1 solid #ccc", flex: 1 },
  td: { padding: 6, borderRight: "1 solid #ccc", flex: 1 },
  footer: { position: "absolute", left: 36, right: 36, bottom: 24, fontSize: 9, color: "#666", textAlign: "center" },
});

function ReportCardDoc({ student, classLabel, results, subjectName, attendancePct }: {
  student: { firstName: string; lastName: string; gender: string; dateOfBirth: string };
  classLabel: string;
  results: { subjectId: string; score: number; grade: string }[];
  subjectName: (id: string) => string;
  attendancePct: number;
}) {
  const avg = results.length ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length) : 0;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.schoolName}>BrightFuture Academy</Text>
          <Text style={styles.subtitle}>Student Report Card — Term 1, 2025/2026</Text>
        </View>

        <Text style={styles.h2}>Student details</Text>
        <View style={styles.row}><Text style={styles.label}>Name</Text><Text>{student.firstName} {student.lastName}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Class</Text><Text>{classLabel}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Gender</Text><Text>{student.gender}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Date of birth</Text><Text>{student.dateOfBirth}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Attendance</Text><Text>{attendancePct}%</Text></View>

        <Text style={styles.h2}>Academic results</Text>
        <View style={styles.table}>
          <View style={styles.tr}>
            <Text style={styles.th}>Subject</Text>
            <Text style={styles.th}>Score</Text>
            <Text style={styles.th}>Grade</Text>
          </View>
          {results.map((r, i) => (
            <View key={i} style={styles.tr}>
              <Text style={styles.td}>{subjectName(r.subjectId)}</Text>
              <Text style={styles.td}>{r.score}</Text>
              <Text style={styles.td}>{r.grade}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.h2}>Overall average: {avg}%</Text>
        <Text style={{ marginTop: 6, color: "#444" }}>
          {avg >= 75 ? "Excellent. Keep up the outstanding work." :
            avg >= 60 ? "Good performance with room to grow." :
            avg >= 45 ? "Satisfactory. Increased focus is encouraged." :
            "Significant improvement required. Please discuss with form tutor."}
        </Text>

        <Text style={styles.footer}>BrightFuture Academy • Issued on {new Date().toLocaleDateString()}</Text>
      </Page>
    </Document>
  );
}

function ReportCardPage() {
  const { id } = Route.useParams();
  const data = useDashboard();
  const student = data.students.find((s) => s.id === id);
  if (!student) throw notFound();
  const classLabel = data.classes.find((c) => c.id === student.classId)?.name ?? "—";
  const subjectName = (sid: string) => data.subjects.find((x) => x.id === sid)?.name ?? "—";
  const results = useMemo(() => data.results.filter((r) => r.studentId === student.id), [data.results, student.id]);

  const doc = (
    <ReportCardDoc
      student={student}
      classLabel={classLabel}
      results={results}
      subjectName={subjectName}
      attendancePct={student.attendancePercentage}
    />
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard/students/$id" params={{ id: student.id }}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to student
          </Link>
        </Button>
        <ClientOnly>
          <PDFDownloadLink document={doc} fileName={`report-${student.firstName}-${student.lastName}.pdf`}>
            {({ loading }) => (
              <Button size="sm" disabled={loading}>
                <Download className="mr-1 h-4 w-4" />
                {loading ? "Preparing…" : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </ClientOnly>
      </div>
      <div className="h-[80vh] overflow-hidden rounded-lg border bg-muted">
        <ClientOnly fallback={<div className="grid h-full place-items-center text-sm text-muted-foreground">Loading PDF preview…</div>}>
          <PDFViewer width="100%" height="100%" showToolbar={false}>{doc}</PDFViewer>
        </ClientOnly>
      </div>
    </div>
  );
}
