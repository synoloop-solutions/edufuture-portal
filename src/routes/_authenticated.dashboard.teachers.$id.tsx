import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDashboard } from "@/lib/dashboard-hooks";

export const Route = createFileRoute("/_authenticated/dashboard/teachers/$id")({
  component: TeacherDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl text-center py-20">
      <h1 className="text-2xl font-bold">Teacher not found</h1>
      <Button asChild className="mt-6"><Link to="/dashboard/teachers">Back to teachers</Link></Button>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-xl text-center py-20">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <Button asChild className="mt-6"><Link to="/dashboard/teachers">Back to teachers</Link></Button>
    </div>
  ),
});

function TeacherDetail() {
  const { id } = Route.useParams();
  const data = useDashboard();
  const t = data.teachers.find((x) => x.id === id);
  if (!t) throw notFound();
  const teaches = data.subjects.filter((s) => t.subjects.includes(s.code));
  const teachingClasses = data.classes.filter((c) => c.teacherId === t.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/dashboard/teachers"><ArrowLeft className="mr-1 h-4 w-4" /> Back to teachers</Link>
      </Button>

      <Card>
        <CardContent className="flex flex-col items-start gap-6 p-6 md:flex-row md:items-center">
          <img src={t.photo} alt="" className="h-24 w-24 rounded-xl object-cover" />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold">{t.firstName} {t.lastName}</h1>
            <p className="text-sm text-muted-foreground">{t.department}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline">{t.qualification}</Badge>
              <Badge variant="outline">{t.yearsOfExperience} years</Badge>
              {t.subjects.slice(0, 3).map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {t.email && <a href={`mailto:${t.email}`} className="flex items-center gap-2 text-primary hover:underline"><Mail className="h-4 w-4" /> {t.email}</a>}
            {t.phone && <p className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> {t.phone}</p>}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="subjects">
        <TabsList>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects">
          <Card><CardHeader><CardTitle className="text-base">Subjects taught</CardTitle></CardHeader>
            <CardContent>
              {teaches.length === 0 ? <p className="text-sm text-muted-foreground">No assigned subjects yet.</p> :
                <Table>
                  <TableHeader><TableRow><TableHead>Subject</TableHead><TableHead>Code</TableHead><TableHead>Classes</TableHead></TableRow></TableHeader>
                  <TableBody>{teaches.map((s) => (
                    <TableRow key={s.id}><TableCell>{s.name}</TableCell><TableCell className="font-mono">{s.code}</TableCell><TableCell>{s.classes.length}</TableCell></TableRow>
                  ))}</TableBody>
                </Table>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes">
          <Card><CardHeader><CardTitle className="text-base">Homeroom classes</CardTitle></CardHeader>
            <CardContent>
              {teachingClasses.length === 0 ? <p className="text-sm text-muted-foreground">Not currently a form tutor.</p> :
                <ul className="space-y-2">
                  {teachingClasses.map((c) => (
                    <li key={c.id} className="rounded-lg border bg-muted/30 p-3">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.studentCount} students</p>
                    </li>
                  ))}
                </ul>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card><CardHeader><CardTitle className="text-base">Performance summary</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Avg class score", value: "73%" },
                { label: "Pass rate", value: "94%" },
                { label: "Attendance to class", value: "97%" },
              ].map((m) => (
                <div key={m.label} className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{m.label}</p>
                  <p className="mt-2 font-display text-2xl font-bold">{m.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
