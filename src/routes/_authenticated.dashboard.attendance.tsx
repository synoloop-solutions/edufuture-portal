import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { classes, students } from "@/data/dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/attendance")({
  component: AttendancePage,
});

const STATUSES = ["Present", "Absent", "Late", "Excused"] as const;
type Status = typeof STATUSES[number];

function AttendancePage() {
  const [cls, setCls] = useState(classes[0].id);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const classStudents = useMemo(() => students.filter((s) => s.classId === cls), [cls]);
  const [records, setRecords] = useState<Record<string, Status>>({});

  const setStatus = (id: string, s: Status) => setRecords((r) => ({ ...r, [id]: s }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Attendance</h1>
        <p className="text-sm text-muted-foreground">Mark attendance by class and date.</p>
      </div>

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
            <Button className="ml-auto" onClick={() => toast.success("Attendance saved", { description: `${Object.keys(records).length} marked.` })}>
              Save attendance
            </Button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {classStudents.map((s) => (
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
                            onClick={() => setStatus(s.id, st)}
                            className={`rounded-md px-3 py-1 text-xs font-medium border ${records[s.id] === st ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"}`}
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
