import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { announcements as seed, type Announcement } from "@/data/dashboard";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/announcements")({
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const [list, setList] = useState<Announcement[]>(seed);
  const [audience, setAudience] = useState<Announcement["audience"]>("All");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = (fd.get("title") as string).trim();
    const body = (fd.get("body") as string).trim();
    if (!title || !body) return;
    setList((prev) => [
      { id: `a-${Date.now()}`, title, body, audience, createdAt: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
    (e.currentTarget as HTMLFormElement).reset();
    toast.success("Announcement posted");
  };

  const remove = (id: string) => {
    setList((p) => p.filter((a) => a.id !== id));
    toast.success("Announcement deleted");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Announcements</h1>
        <p className="text-sm text-muted-foreground">Create and manage school-wide announcements.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={onSubmit} className="grid gap-3">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required maxLength={120} />
            </div>
            <div>
              <Label htmlFor="body">Message</Label>
              <Textarea id="body" name="body" rows={4} required maxLength={800} />
            </div>
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <Label>Audience</Label>
                <Select value={audience} onValueChange={(v) => setAudience(v as Announcement["audience"])}>
                  <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(["All", "Staff", "Students", "Parents"] as const).map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="ml-auto"><Plus className="mr-1 h-4 w-4" /> Post</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <ul className="space-y-3">
        {list.map((a) => (
          <li key={a.id}>
            <Card>
              <CardContent className="flex flex-wrap items-start justify-between gap-3 p-5">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{a.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{a.audience}</Badge>
                  <span className="text-xs text-muted-foreground">{a.createdAt}</span>
                  <Button size="icon" variant="ghost" onClick={() => remove(a.id)} aria-label={`Delete ${a.title}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
