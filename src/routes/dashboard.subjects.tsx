import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { subjects, findTeacher } from "@/data/dashboard";

export const Route = createFileRoute("/dashboard/subjects")({
  component: SubjectsPage,
});

function SubjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subjects</h1>
        <p className="text-sm text-muted-foreground">{subjects.length} subjects taught school-wide</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Subject</TableHead><TableHead>Code</TableHead><TableHead>Classes</TableHead><TableHead>Teachers</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="font-mono"><Badge variant="outline">{s.code}</Badge></TableCell>
                  <TableCell>{s.classes.length}</TableCell>
                  <TableCell>{s.teacherIds.map((id) => findTeacher(id)).filter(Boolean).map((t) => `${t!.firstName} ${t!.lastName}`).join(", ") || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
