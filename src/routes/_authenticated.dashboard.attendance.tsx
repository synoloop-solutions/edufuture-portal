import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDashboard, useHasRole } from "@/lib/dashboard-hooks";
import { useServerFn } from "@tanstack/react-start";
import { saveAttendance } from "@/lib/dashboard-data.functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/attendance")({
  component: AttendancePage,
});

const STATUSES = ["Present", "Absent", "Late", "Excused"] as const;
type Status = typeof STATUSES[number];
const toDb = (s: Status) => s.toLowerCase();

function AttendancePage() {
  const { classes, students } = useDashboard();
  const canMark = useHasRole("admin", "principal", "teacher");
  const [cls, setCls] = useState(classes[0]?.id ?? "");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const classStudents = useMemo(() => students.filter((s) => s.classId === cls), [cls, students]);
  const [records, setRecords] = useState<Record<string, Status>>({});
  const setStatus = (id: string, s: Status) => setRecords((r) => ({ ...r, [id]: s }));

  const saveFn = useServerFn(saveAttendance);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      saveFn({
        data: {
          date,
          entries: Object.entries(records).map(([studentId, status]) => ({
            studentId, status: toDb(status), classId: cls,
          })),
        },
      }),
    onSuccess: (r) => {
      toast.success(`Saved ${r.count} attendance records`);
      queryClient.invalidateQueries({ queryKey: ["dashboard", "snapshot"] });
      setRecords({});
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (classes.length === 0) {
    return <p className="text-sm text-muted-foreground">No classes available.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Attendance</h1>
        <p className="text-sm text-muted-foreground">Mark attendance by class and date.</p>
      </div>

      {!canMark && (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          You have read-only access to attendance.
        </p>
      )}

      <Card>
        <CardHeader><CardTitle className="text-base">Mark attendance</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label htmlFor="cls" className="block text-xs font-medium text-muted-foreground">Class</label>
              <Select value={cls} onValueChange={setCls}>
                <SelectTrigger id="cls" className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>{classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="date" className="block text-xs font-medium text-muted-foreground">Date</label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-44" />
            </div>
            <Button
              className="ml-auto"
              disabled={!canMark || Object.keys(records).length === 0 || mutation.isPending}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending ? "Saving…" : "Save attendance"}
            </Button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {classStudents.length === 0 ? (
                  <TableRow><TableCell colSpan={2} className="py-10 text-center text-muted-foreground">No students in this class.</TableCell></TableRow>
                ) : classStudents.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={s.photo} alt="" className="h-8 w-8 rounded-full object-cover" />
                        <span>{s.firstName} {s.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {STATUSES.map((st) => (
                          <button
                            key={st}
                            type="button"
                            disabled={!canMark}
                            onClick={() => setStatus(s.id, st)}
                            className={`rounded-md px-3 py-1 text-xs font-medium border disabled:opacity-50 ${records[s.id] === st ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"}`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Today's class summary</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-4">
          {STATUSES.map((st) => {
            const count = Object.values(records).filter((v) => v === st).length;
            return (
              <div key={st} className="rounded-lg border bg-muted/30 p-4">
                <Badge variant="outline" className="mb-2">{st}</Badge>
                <p className="font-display text-2xl font-bold">{count}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
