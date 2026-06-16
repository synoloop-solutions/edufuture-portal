import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon } from "lucide-react";
import { useDashboard } from "@/lib/dashboard-hooks";

export const Route = createFileRoute("/_authenticated/dashboard/search")({
  component: SearchPage,
});

function SearchPage() {
  const { students, teachers, classes, subjects, announcements } = useDashboard();
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();

  const results = useMemo(() => {
    if (!term) return { students: [], teachers: [], classes: [], subjects: [], announcements: [] };
    const match = (s: string) => s.toLowerCase().includes(term);
    return {
      students: students.filter((s) => match(`${s.firstName} ${s.lastName}`)).slice(0, 10),
      teachers: teachers.filter((t) => match(`${t.firstName} ${t.lastName} ${t.department}`)).slice(0, 10),
      classes: classes.filter((c) => match(`${c.name} ${c.level}`)),
      subjects: subjects.filter((s) => match(`${s.name} ${s.code}`)),
      announcements: announcements.filter((a) => match(`${a.title} ${a.body}`)).slice(0, 5),
    };
  }, [term, students, teachers, classes, subjects, announcements]);

  const total = Object.values(results).reduce((a, b) => a + b.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard search</h1>
        <p className="text-sm text-muted-foreground">Search across students, teachers, classes, subjects, and announcements.</p>
      </div>

      <div className="relative max-w-2xl">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type to search…"
          className="pl-9 h-11"
          maxLength={120}
        />
      </div>

      {!term ? (
        <p className="text-sm text-muted-foreground">Start typing to see results.</p>
      ) : total === 0 ? (
        <p className="text-sm text-muted-foreground">No results for "{q}".</p>
      ) : (
        <div className="grid gap-4">
          {results.students.length > 0 && (
            <ResultSection title="Students" count={results.students.length}>
              {results.students.map((s) => (
                <Link key={s.id} to="/dashboard/students/$id" params={{ id: s.id }} className="block rounded-md border bg-card p-3 hover:bg-muted">
                  <p className="font-medium">{s.firstName} {s.lastName}</p>
                  <p className="text-xs text-muted-foreground">{s.gender}</p>
                </Link>
              ))}
            </ResultSection>
          )}
          {results.teachers.length > 0 && (
            <ResultSection title="Teachers" count={results.teachers.length}>
              {results.teachers.map((t) => (
                <Link key={t.id} to="/dashboard/teachers/$id" params={{ id: t.id }} className="block rounded-md border bg-card p-3 hover:bg-muted">
                  <p className="font-medium">{t.firstName} {t.lastName}</p>
                  <p className="text-xs text-muted-foreground">{t.department}</p>
                </Link>
              ))}
            </ResultSection>
          )}
          {results.classes.length > 0 && (
            <ResultSection title="Classes" count={results.classes.length}>
              {results.classes.map((c) => (
                <div key={c.id} className="rounded-md border bg-card p-3">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.level} • {c.studentCount} students</p>
                </div>
              ))}
            </ResultSection>
          )}
          {results.subjects.length > 0 && (
            <ResultSection title="Subjects" count={results.subjects.length}>
              {results.subjects.map((s) => (
                <div key={s.id} className="rounded-md border bg-card p-3">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground"><Badge variant="outline">{s.code}</Badge></p>
                </div>
              ))}
            </ResultSection>
          )}
          {results.announcements.length > 0 && (
            <ResultSection title="Announcements" count={results.announcements.length}>
              {results.announcements.map((a) => (
                <div key={a.id} className="rounded-md border bg-card p-3">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.body.slice(0, 140)}…</p>
                </div>
              ))}
            </ResultSection>
          )}
        </div>
      )}
    </div>
  );
}

function ResultSection({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="font-semibold">{title}</h2>
          <Badge variant="outline">{count}</Badge>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">{children}</div>
      </CardContent>
    </Card>
  );
}
