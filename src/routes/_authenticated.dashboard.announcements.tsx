import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDashboard, useHasRole } from "@/lib/dashboard-hooks";
import { useServerFn } from "@tanstack/react-start";
import { createAnnouncement } from "@/lib/dashboard-data.functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/announcements")({
  component: AnnouncementsPage,
});

type Audience = "All" | "Staff" | "Students" | "Parents";

function AnnouncementsPage() {
  const { announcements } = useDashboard();
  const canPost = useHasRole("admin", "principal");
  const [audience, setAudience] = useState<Audience>("All");

  const fn = useServerFn(createAnnouncement);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { title: string; body: string; audience: string }) => fn({ data }),
    onSuccess: () => {
      toast.success("Announcement posted");
      queryClient.invalidateQueries({ queryKey: ["dashboard", "snapshot"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = (fd.get("title") as string).trim();
    const body = (fd.get("body") as string).trim();
    if (!title || !body) return;
    mutation.mutate({ title, body, audience: audience.toLowerCase() });
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Announcements</h1>
        <p className="text-sm text-muted-foreground">Create and manage school-wide announcements.</p>
      </div>

      {!canPost && (
        <p className="rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          Only admins and the principal can post announcements.
        </p>
      )}

      {canPost && (
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
                  <Select value={audience} onValueChange={(v) => setAudience(v as Audience)}>
                    <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(["All", "Staff", "Students", "Parents"] as const).map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="ml-auto" disabled={mutation.isPending}>
                  <Plus className="mr-1 h-4 w-4" /> {mutation.isPending ? "Posting…" : "Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <ul className="space-y-3">
        {announcements.length === 0 ? (
          <p className="text-sm text-muted-foreground">No announcements yet.</p>
        ) : announcements.map((a) => (
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
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
