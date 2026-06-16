import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/reports")({
  component: ReportsPage,
});

const reports = [
  { title: "Attendance report", body: "School-wide attendance by class and date range.", file: "attendance-report.pdf" },
  { title: "Academic report", body: "Subject performance, class averages and pass rates.", file: "academic-report.pdf" },
  { title: "Fees report", body: "Revenue collected and outstanding by class and term.", file: "fees-report.pdf" },
  { title: "Enrollment report", body: "New enrollments, transfers and leavers.", file: "enrollment-report.pdf" },
];

function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-sm text-muted-foreground">Generate and download school reports.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.title}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base">{r.title}</CardTitle>
                  <CardDescription>{r.body}</CardDescription>
                </div>
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <Button onClick={() => toast.success("Report generated", { description: r.file })}>
                <Download className="mr-1 h-4 w-4" /> Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
