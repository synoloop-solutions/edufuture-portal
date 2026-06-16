import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Link } from "@tanstack/react-router";
import {
  defaultPrefs,
  getPrefs,
  hasDecided,
  setPrefs,
  subscribeOpenPreferences,
  type CookiePrefs,
} from "./cookie-store";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setLocal] = useState<CookiePrefs>(defaultPrefs);

  useEffect(() => {
    setMounted(true);
    setLocal(getPrefs());
    setShowBanner(!hasDecided());
    return subscribeOpenPreferences(() => {
      setLocal(getPrefs());
      setShowModal(true);
    });
  }, []);

  if (!mounted) return null;

  const acceptAll = () => {
    const p: CookiePrefs = { necessary: true, analytics: true, marketing: true, preferences: true };
    setPrefs(p);
    setLocal(p);
    setShowBanner(false);
    setShowModal(false);
  };
  const rejectNonEssential = () => {
    setPrefs(defaultPrefs);
    setLocal(defaultPrefs);
    setShowBanner(false);
    setShowModal(false);
  };
  const savePrefs = () => {
    setPrefs(prefs);
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {showBanner && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 px-4 py-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/85"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-foreground/80">
              We use cookies to make this site work and to improve your experience. See our{" "}
              <Link to="/cookie-policy" className="underline">Cookie Policy</Link>.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowModal(true)}>
                Customize
              </Button>
              <Button variant="outline" size="sm" onClick={rejectNonEssential}>
                Reject non-essential
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground" onClick={acceptAll}>
                Accept all
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Cookie preferences</DialogTitle>
            <DialogDescription>
              Choose which categories of cookies you allow. Necessary cookies are always on.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {(
              [
                { key: "necessary", label: "Necessary", desc: "Required for the site to work. Always on." },
                { key: "analytics", label: "Analytics", desc: "Helps us understand usage to improve the site." },
                { key: "marketing", label: "Marketing", desc: "Personalised content and admissions outreach." },
                { key: "preferences", label: "Preferences", desc: "Remembers UI choices like theme." },
              ] as const
            ).map(({ key, label, desc }) => (
              <div key={key} className="flex items-start justify-between gap-4 rounded-md border p-3">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={prefs[key]}
                  disabled={key === "necessary"}
                  onCheckedChange={(v) => setLocal((p) => ({ ...p, [key]: !!v }))}
                  aria-label={`Toggle ${label} cookies`}
                />
              </div>
            ))}
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={rejectNonEssential}>Reject non-essential</Button>
            <Button variant="outline" onClick={acceptAll}>Accept all</Button>
            <Button onClick={savePrefs} className="bg-primary text-primary-foreground">Save preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
