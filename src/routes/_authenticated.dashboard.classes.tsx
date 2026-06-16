import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { classes, teachers, findTeacher } from "@/data/dashboard";

export const Route = createFileRoute("/_authenticated/dashboard/classes")({
  component: ClassesPage,
});

function ClassesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Classes</h1>
        <p className="text-sm text-muted-foreground">{classes.length} active classes</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Class</TableHead><TableHead>Level</TableHead><TableHead>Form tutor</TableHead><TableHead>Students</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((c) => {
                const t = findTeacher(c.teacherId);
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell><Badge variant="outline">{c.level}</Badge></TableCell>
                    <TableCell>{t ? `${t.firstName} ${t.lastName}` : "—"}</TableCell>
                    <TableCell>{c.studentCount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
