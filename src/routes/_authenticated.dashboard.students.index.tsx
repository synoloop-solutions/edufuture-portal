import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students, classes, className } from "@/data/dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/students/")({
  component: StudentsPage,
});

const PAGE_SIZE = 10;

function StudentsPage() {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return students.filter((s) => {
      if (cls !== "all" && s.classId !== cls) return false;
      if (term && !`${s.firstName} ${s.lastName} ${s.id}`.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [q, cls]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-sm text-muted-foreground">{students.length} students enrolled</p>
        </div>
        <Button onClick={() => toast.info("Add student", { description: "Hook up to backend in Phase 3." })}>
          <Plus className="mr-1 h-4 w-4" /> Add student
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search by name or ID" className="pl-8" maxLength={80} />
          </div>
          <Select value={cls} onValueChange={(v) => { setCls(v); setPage(1); }}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Class" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All classes</SelectItem>
              {classes.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <span className="ml-auto text-sm text-muted-foreground">{filtered.length} results</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {current.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="py-10 text-center text-muted-foreground">No students match your filters.</TableCell></TableRow>
              ) : current.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={s.photo} alt="" className="h-9 w-9 rounded-full object-cover" loading="lazy" />
                      <Link to="/dashboard/students/$id" params={{ id: s.id }} className="font-medium hover:underline">
                        {s.firstName} {s.lastName}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{s.id}</TableCell>
                  <TableCell>{className(s.classId)}</TableCell>
                  <TableCell>{s.gender}</TableCell>
                  <TableCell>{s.attendancePercentage}%</TableCell>
                  <TableCell>
                    <Badge variant={s.feeStatus === "Paid" ? "secondary" : s.feeStatus === "Outstanding" ? "destructive" : "outline"}>
                      {s.feeStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link to="/dashboard/students/$id" params={{ id: s.id }}><Eye className="mr-1 h-4 w-4" /> View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-1">
            <Button size="sm" variant="outline" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>Prev</Button>
            <span className="px-3 text-sm">Page {page} of {totalPages}</span>
            <Button size="sm" variant="outline" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next</Button>
          </div>
        )}
      </Card>
    </div>
  );
}
