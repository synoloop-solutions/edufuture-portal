import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, Home as HomeIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDashboard } from "@/lib/dashboard-hooks";

export const Route = createFileRoute("/_authenticated/dashboard/students/$id")({
  component: StudentDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl text-center py-20">
      <h1 className="text-2xl font-bold">Student not found</h1>
      <Button asChild className="mt-6"><Link to="/dashboard/students">Back to students</Link></Button>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-xl text-center py-20">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <Button asChild className="mt-6"><Link to="/dashboard/students">Back to students</Link></Button>
    </div>
  ),
});

function StudentDetail() {
  const { id } = Route.useParams();
  const data = useDashboard();
  const s = data.students.find((x) => x.id === id);
  if (!s) throw notFound();
  const classLabel = data.classes.find((c) => c.id === s.classId)?.name ?? "—";
  const subjectName = (sid: string) => data.subjects.find((x) => x.id === sid)?.name ?? "—";
  const att = data.attendance.filter((a) => a.studentId === s.id).slice(0, 10);
  const res = data.results.filter((r) => r.studentId === s.id);
  const fee = data.fees.filter((f) => f.studentId === s.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard/students"><ArrowLeft className="mr-1 h-4 w-4" /> Back to students</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link to="/dashboard/students/$id/report-card" params={{ id: s.id }}>
            <FileText className="mr-1 h-4 w-4" /> Report card
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-col items-start gap-6 p-6 md:flex-row md:items-center">
          <img src={s.photo} alt="" className="h-24 w-24 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold">{s.firstName} {s.lastName}</h1>
            <p className="text-sm text-muted-foreground">{classLabel}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline">{s.gender}</Badge>
              <Badge variant="outline">DOB {s.dateOfBirth}</Badge>
              <Badge variant={s.feeStatus === "Paid" ? "secondary" : s.feeStatus === "Outstanding" ? "destructive" : "outline"}>
                Fees: {s.feeStatus}
              </Badge>
              <Badge variant="outline">Attendance {s.attendancePercentage}%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="parent">Parent</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card><CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
            <CardContent className="grid gap-3 text-sm md:grid-cols-2">
              <Info label="Class" value={classLabel} />
              <Info label="Gender" value={s.gender} />
              <Info label="Date of birth" value={s.dateOfBirth} />
              <Info label="Enrolled" value={s.createdAt} />
              <Info label="Address" value={s.address} icon={<HomeIcon className="h-4 w-4" />} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card><CardHeader><CardTitle className="text-base">Attendance history (last 10 days)</CardTitle></CardHeader>
            <CardContent>
              {att.length === 0 ? <p className="text-sm text-muted-foreground">No attendance records yet.</p> : (
                <Table>
                  <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {att.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell>{a.date}</TableCell>
                        <TableCell><Badge variant={a.status === "Present" ? "secondary" : a.status === "Absent" ? "destructive" : "outline"}>{a.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card><CardHeader><CardTitle className="text-base">Results — 1st term, 2025/2026</CardTitle></CardHeader>
            <CardContent>
              {res.length === 0 ? <p className="text-sm text-muted-foreground">No results recorded.</p> : (
                <Table>
                  <TableHeader><TableRow><TableHead>Subject</TableHead><TableHead>Score</TableHead><TableHead>Grade</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {res.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{subjectName(r.subjectId)}</TableCell>
                        <TableCell>{r.score}</TableCell>
                        <TableCell><Badge variant="outline">{r.grade}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees">
          <Card><CardHeader><CardTitle className="text-base">Fee records</CardTitle></CardHeader>
            <CardContent>
              {fee.length === 0 ? <p className="text-sm text-muted-foreground">No fee records.</p> : (
                <Table>
                  <TableHeader><TableRow><TableHead>Term</TableHead><TableHead>Session</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Paid on</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {fee.map((f) => (
                      <TableRow key={f.id}>
                        <TableCell>{f.term}</TableCell>
                        <TableCell>{f.session}</TableCell>
                        <TableCell>₦{f.amount.toLocaleString()}</TableCell>
                        <TableCell><Badge variant={f.status === "Paid" ? "secondary" : f.status === "Outstanding" ? "destructive" : "outline"}>{f.status}</Badge></TableCell>
                        <TableCell>{f.paymentDate ?? "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parent">
          <Card><CardHeader><CardTitle className="text-base">Parent / guardian</CardTitle></CardHeader>
            <CardContent className="grid gap-3 text-sm md:grid-cols-2">
              <Info label="Parent name" value={s.parentName} />
              <Info label="Phone" value={s.parentPhone} icon={<Phone className="h-4 w-4" />} />
              <Info label="Email" value={`parent.${s.firstName.toLowerCase()}@example.com`} icon={<Mail className="h-4 w-4" />} />
              <Info label="Address" value={s.address} icon={<HomeIcon className="h-4 w-4" />} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Info({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 flex items-center gap-2 font-medium">{icon}{value}</p>
    </div>
  );
}
