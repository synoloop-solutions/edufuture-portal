import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teachers } from "@/data/dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/teachers/")({
  component: TeachersPage,
});

function TeachersPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");

  const departments = useMemo(() => ["all", ...Array.from(new Set(teachers.map(t => t.department)))], []);
  const filtered = useMemo(() => teachers.filter((t) => {
    const term = q.trim().toLowerCase();
    if (dept !== "all" && t.department !== dept) return false;
    if (term && !`${t.firstName} ${t.lastName} ${t.id}`.toLowerCase().includes(term)) return false;
    return true;
  }), [q, dept]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Teachers</h1>
          <p className="text-sm text-muted-foreground">{teachers.length} teaching staff</p>
        </div>
        <Button onClick={() => toast.info("Add teacher", { description: "Hook up to backend in Phase 3." })}>
          <Plus className="mr-1 h-4 w-4" /> Add teacher
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or ID" className="pl-8" maxLength={80} />
          </div>
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="w-56"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              {departments.map((d) => <SelectItem key={d} value={d}>{d === "all" ? "All departments" : d}</SelectItem>)}
            </SelectContent>
          </Select>
          <span className="ml-auto text-sm text-muted-foreground">{filtered.length} results</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No teachers match your filters.</TableCell></TableRow>
              ) : filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={t.photo} alt="" className="h-9 w-9 rounded-full object-cover" loading="lazy" />
                      <Link to="/dashboard/teachers/$id" params={{ id: t.id }} className="font-medium hover:underline">
                        {t.firstName} {t.lastName}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell><Badge variant="outline">{t.department}</Badge></TableCell>
                  <TableCell>{t.qualification}</TableCell>
                  <TableCell>{t.yearsOfExperience} yrs</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link to="/dashboard/teachers/$id" params={{ id: t.id }}><Eye className="mr-1 h-4 w-4" /> View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
