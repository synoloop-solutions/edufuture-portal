import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { site } from "@/data/site";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState(site.email);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account, school and preferences.</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">School profile</CardTitle><CardDescription>Public information for your school.</CardDescription></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div><Label htmlFor="sname">School name</Label><Input id="sname" defaultValue={site.name} maxLength={120} /></div>
          <div><Label htmlFor="semail">Contact email</Label><Input id="semail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} /></div>
          <div className="sm:col-span-2"><Label htmlFor="saddr">Address</Label><Input id="saddr" defaultValue={site.address} maxLength={200} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Dark mode</p><p className="text-sm text-muted-foreground">Use dark UI in the dashboard.</p></div>
            <Switch checked={dark} onCheckedChange={(v) => { setDark(v); document.documentElement.classList.toggle("dark", v); }} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div><p className="font-medium">Email notifications</p><p className="text-sm text-muted-foreground">Receive announcement copies by email.</p></div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div>
        <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
      </div>
    </div>
  );
}
