import { createFileRoute } from "@tanstack/react-router";
import { Users, GraduationCap, CalendarCheck, Wallet, TrendingUp, AlertCircle } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dashboardStats, announcements } from "@/data/dashboard";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: DashboardHome,
});

const attendanceTrend = [
  { week: "W1", rate: 91 }, { week: "W2", rate: 93 }, { week: "W3", rate: 90 },
  { week: "W4", rate: 92 }, { week: "W5", rate: 94 }, { week: "W6", rate: 95 },
  { week: "W7", rate: 93 }, { week: "W8", rate: 96 },
];
const revenueTrend = [
  { month: "Apr", revenue: 24 }, { month: "May", revenue: 28 }, { month: "Jun", revenue: 22 },
  { month: "Jul", revenue: 30 }, { month: "Aug", revenue: 35 }, { month: "Sep", revenue: 48 },
  { month: "Oct", revenue: 42 },
];
const enrollment = [
  { year: "2021", count: 980 }, { year: "2022", count: 1050 }, { year: "2023", count: 1120 },
  { year: "2024", count: 1190 }, { year: "2025", count: 1250 },
];

function DashboardHome() {
  const kpis = [
    { label: "Total students", value: dashboardStats.totalStudents.toLocaleString(), icon: Users, accent: "text-primary bg-primary/10" },
    { label: "Total teachers", value: dashboardStats.totalTeachers.toLocaleString(), icon: GraduationCap, accent: "text-chart-3 bg-chart-3/10" },
    { label: "Attendance rate", value: `${dashboardStats.attendanceRate}%`, icon: CalendarCheck, accent: "text-chart-4 bg-chart-4/10" },
    { label: "Fees collected", value: `₦${(dashboardStats.feesCollected / 1_000_000).toFixed(1)}M`, icon: Wallet, accent: "text-gold bg-gold/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Welcome back 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's what's happening across the school today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</p>
                  <p className="mt-2 font-display text-2xl font-bold">{k.value}</p>
                </div>
                <div className={`grid h-11 w-11 place-items-center rounded-lg ${k.accent}`}>
                  <k.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attendance trend</CardTitle>
            <CardDescription>Weekly attendance rate (last 8 weeks)</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend}>
                <defs>
                  <linearGradient id="att" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis domain={[80, 100]} stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }} />
                <Area type="monotone" dataKey="rate" stroke="var(--color-primary)" fill="url(#att)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fee collection</CardTitle>
            <CardDescription>Monthly revenue, ₦ millions</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }} />
                <Bar dataKey="revenue" fill="var(--color-gold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Enrollment trend</CardTitle>
            <CardDescription>Total students by year</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollment}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }} />
                <Area type="monotone" dataKey="count" stroke="var(--color-chart-3)" fill="var(--color-chart-3)" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Outstanding fees</CardTitle>
            <CardDescription>To be collected this term</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl font-bold text-destructive">
              ₦{(dashboardStats.feesOutstanding / 1_000_000).toFixed(1)}M
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              {Math.round((dashboardStats.feesOutstanding / (dashboardStats.feesOutstanding + dashboardStats.feesCollected)) * 100)}% of total billing
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                Collections up 8% MoM
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent announcements</CardTitle>
          <CardDescription>Across the school</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {announcements.map((a) => (
              <li key={a.id} className="flex flex-wrap items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-medium">{a.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{a.audience}</Badge>
                  <span className="text-xs text-muted-foreground">{a.createdAt}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
