import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDashboard, useHasRole } from "@/lib/dashboard-hooks";
import { useServerFn } from "@tanstack/react-start";
import { saveResult } from "@/lib/dashboard-data.functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/results")({
  component: ResultsPage,
});

function ResultsPage() {
  const { classes, subjects, students, results } = useDashboard();
  const canEnter = useHasRole("admin", "principal", "teacher");
  const [cls, setCls] = useState(classes[0]?.id ?? "");
  const [sub, setSub] = useState(subjects[0]?.id ?? "");
  const [scores, setScores] = useState<Record<string, number>>({});

  const classStudents = useMemo(() => students.filter((s) => s.classId === cls), [cls, students]);
  const lookup = useMemo(() => {
    const map = new Map<string, number>();
    results.filter((r) => r.subjectId === sub).forEach((r) => map.set(r.studentId, r.score));
    return map;
  }, [sub, results]);

  const gradeFor = (score: number) =>
    score >= 75 ? "A" : score >= 65 ? "B" : score >= 55 ? "C" : score >= 45 ? "D" : score >= 40 ? "E" : "F";

  const saveFn = useServerFn(saveResult);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const entries = Object.entries(scores);
      for (const [studentId, score] of entries) {
        await saveFn({ data: { studentId, subjectId: sub, term: "Term 1", year: "2025/2026", score } });
      }
      return entries.length;
    },
    onSuccess: (n) => {
      toast.success(`Saved ${n} results`);
      queryClient.invalidateQueries({ queryKey: ["dashboard", "snapshot"] });
      setScores({});
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (classes.length === 0 || subjects.length === 0) {
    return <p className="text-sm text-muted-foreground">Classes and subjects must exist before entering results.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Results</h1>
        <p className="text-sm text-muted-foreground">Enter, edit and publish term results.</p>
      </div>

      {!canEnter && (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          You have read-only access to results.
        </p>
      )}

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
            <Button
              className="ml-auto"
              disabled={!canEnter || Object.keys(scores).length === 0 || mutation.isPending}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending ? "Saving…" : "Save results"}
            </Button>
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
                          disabled={!canEnter}
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
        <CardHeader><CardTitle className="text-base">Class mean — {subjects.find((s) => s.id === sub)?.name}</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Mean score: <b>{Math.round([...lookup.values()].reduce((a, b) => a + b, 0) / Math.max(1, lookup.size))}%</b> across {lookup.size} recorded students.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
