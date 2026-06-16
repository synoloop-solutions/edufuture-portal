import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fees, findStudent, dashboardStats } from "@/data/dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/fees")({
  component: FeesPage,
});

function FeesPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => fees.filter((f) => {
    const s = findStudent(f.studentId);
    if (!s) return false;
    if (status !== "all" && f.status !== status) return false;
    const term = q.trim().toLowerCase();
    if (term && !`${s.firstName} ${s.lastName} ${s.id}`.toLowerCase().includes(term)) return false;
    return true;
  }), [q, status]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Fees</h1>
        <p className="text-sm text-muted-foreground">Record payments and track outstanding balances.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Collected</p>
          <p className="mt-2 font-display text-2xl font-bold text-emerald-600">₦{(dashboardStats.feesCollected / 1_000_000).toFixed(1)}M</p>
        </CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Outstanding</p>
          <p className="mt-2 font-display text-2xl font-bold text-destructive">₦{(dashboardStats.feesOutstanding / 1_000_000).toFixed(1)}M</p>
        </CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Collection rate</p>
          <p className="mt-2 font-display text-2xl font-bold">{Math.round((dashboardStats.feesCollected / (dashboardStats.feesCollected + dashboardStats.feesOutstanding)) * 100)}%</p>
        </CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Fee records</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student" className="max-w-sm" maxLength={80} />
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                <SelectItem value="Outstanding">Outstanding</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>Student</TableHead><TableHead>Term</TableHead><TableHead>Amount</TableHead>
                <TableHead>Status</TableHead><TableHead>Paid on</TableHead><TableHead className="text-right">Action</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {rows.slice(0, 30).map((f) => {
                  const s = findStudent(f.studentId)!;
                  return (
                    <TableRow key={f.id}>
                      <TableCell><span className="font-medium">{s.firstName} {s.lastName}</span><span className="ml-2 text-xs text-muted-foreground">{s.id}</span></TableCell>
                      <TableCell>{f.term} • {f.session}</TableCell>
                      <TableCell>₦{f.amount.toLocaleString()}</TableCell>
                      <TableCell><Badge variant={f.status === "Paid" ? "secondary" : f.status === "Outstanding" ? "destructive" : "outline"}>{f.status}</Badge></TableCell>
                      <TableCell>{f.paymentDate ?? "—"}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => toast.success("Payment recorded", { description: `${s.firstName} ${s.lastName}` })}>
                          Record payment
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
