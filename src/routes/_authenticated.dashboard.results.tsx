import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { classes, subjects, students, results, subjectName } from "@/data/dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/results")({
  component: ResultsPage,
});

function ResultsPage() {
  const [cls, setCls] = useState(classes[0].id);
  const [sub, setSub] = useState(subjects[0].id);

  const classStudents = useMemo(() => students.filter((s) => s.classId === cls), [cls]);
  const lookup = useMemo(() => {
    const map = new Map<string, number>();
    results.filter(r => r.subjectId === sub).forEach(r => map.set(r.studentId, r.score));
    return map;
  }, [sub]);
  const [scores, setScores] = useState<Record<string, number>>({});

  const gradeFor = (score: number) =>
    score >= 75 ? "A" : score >= 65 ? "B" : score >= 55 ? "C" : score >= 45 ? "D" : score >= 40 ? "E" : "F";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Results</h1>
        <p className="text-sm text-muted-foreground">Enter, edit and publish term results.</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Enter results</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground">Class</label>
              <Select value={cls} onValueChange={setCls}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>{classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground">Subject</label>
              <Select value={sub} onValueChange={setSub}>
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>{subjects.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Button className="ml-auto" onClick={() => toast.success("Results saved", { description: `${Object.keys(scores).length} updated.` })}>
              Save results
            </Button>
            <Button variant="outline" onClick={() => toast.success("Results published")}>Publish</Button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Score</TableHead><TableHead>Grade</TableHead></TableRow></TableHeader>
              <TableBody>
                {classStudents.map((s) => {
                  const existing = lookup.get(s.id);
                  const v = scores[s.id] ?? existing ?? "";
                  const score = typeof v === "number" ? v : v === "" ? null : Number(v);
                  return (
                    <TableRow key={s.id}>
                      <TableCell>{s.firstName} {s.lastName}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={v}
                          onChange={(e) => {
                            const num = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                            setScores((p) => ({ ...p, [s.id]: num }));
                          }}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>{score !== null ? <Badge variant="outline">{gradeFor(score)}</Badge> : "—"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Recent published results — {subjectName(sub)}</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Mean score across the class: <b>{Math.round(([...lookup.values()].reduce((a, b) => a + b, 0) / Math.max(1, lookup.size)))}%</b></p>
        </CardContent>
      </Card>
    </div>
  );
}
