import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDashboard, useHasRole } from "@/lib/dashboard-hooks";
import { useServerFn } from "@tanstack/react-start";
import { recordFeePayment } from "@/lib/dashboard-data.functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/fees")({
  component: FeesPage,
});

function FeesPage() {
  const { fees, students } = useDashboard();
  const canPost = useHasRole("admin", "principal", "bursar");
  const studentMap = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const feesCollected = fees.reduce((a, f) => a + (f.status === "Paid" ? f.amount : 0), 0);
  const feesOutstanding = fees.reduce((a, f) => a + (f.status !== "Paid" ? f.amount : 0), 0);

  const rows = useMemo(() => fees.filter((f) => {
    const s = studentMap.get(f.studentId);
    if (!s) return false;
    if (status !== "all" && f.status !== status) return false;
    const term = q.trim().toLowerCase();
    if (term && !`${s.firstName} ${s.lastName}`.toLowerCase().includes(term)) return false;
    return true;
  }), [q, status, fees, studentMap]);

  const recordFn = useServerFn(recordFeePayment);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (vars: { feeId: string; amount: number }) => recordFn({ data: vars }),
    onSuccess: () => {
      toast.success("Payment recorded");
      queryClient.invalidateQueries({ queryKey: ["dashboard", "snapshot"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Fees</h1>
        <p className="text-sm text-muted-foreground">Record payments and track outstanding balances.</p>
      </div>

      {!canPost && (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          You have read-only access to fees.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Collected</p>
          <p className="mt-2 font-display text-2xl font-bold text-emerald-600">₦{(feesCollected / 1_000_000).toFixed(1)}M</p>
        </CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Outstanding</p>
          <p className="mt-2 font-display text-2xl font-bold text-destructive">₦{(feesOutstanding / 1_000_000).toFixed(1)}M</p>
        </CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wider text-muted-foreground">Collection rate</p>
          <p className="mt-2 font-display text-2xl font-bold">
            {feesCollected + feesOutstanding > 0
              ? Math.round((feesCollected / (feesCollected + feesOutstanding)) * 100)
              : 0}%
          </p>
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
            <span className="ml-auto text-sm text-muted-foreground">{rows.length} records</span>
          </div>
          <div className="mt-4 overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>Student</TableHead><TableHead>Term</TableHead><TableHead>Amount</TableHead>
                <TableHead>Status</TableHead><TableHead>Paid on</TableHead><TableHead className="text-right">Action</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {rows.slice(0, 30).map((f) => {
                  const s = studentMap.get(f.studentId)!;
                  return (
                    <TableRow key={f.id}>
                      <TableCell><span className="font-medium">{s.firstName} {s.lastName}</span></TableCell>
                      <TableCell>{f.term} • {f.session}</TableCell>
                      <TableCell>₦{f.amount.toLocaleString()}</TableCell>
                      <TableCell><Badge variant={f.status === "Paid" ? "secondary" : f.status === "Outstanding" ? "destructive" : "outline"}>{f.status}</Badge></TableCell>
                      <TableCell>{f.paymentDate ?? "—"}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={!canPost || f.status === "Paid" || mutation.isPending}
                          onClick={() => {
                            const remaining = f.amount; // simplistic
                            const amt = Number(prompt(`Amount paid (max ₦${remaining.toLocaleString()})`, "50000")) || 0;
                            if (amt > 0) mutation.mutate({ feeId: f.id, amount: amt });
                          }}
                        >
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
