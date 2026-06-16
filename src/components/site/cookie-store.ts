// Tiny module-level event bus + localStorage helpers for cookie preferences.

export type CookiePrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const STORAGE_KEY = "bfa.cookiePrefs.v1";
const DECISION_KEY = "bfa.cookieDecision.v1";

export const defaultPrefs: CookiePrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

export function getPrefs(): CookiePrefs {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw) as Partial<CookiePrefs>;
    return { ...defaultPrefs, ...parsed, necessary: true };
  } catch {
    return defaultPrefs;
  }
}

export function setPrefs(p: CookiePrefs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...p, necessary: true }));
  localStorage.setItem(DECISION_KEY, "1");
}

export function hasDecided(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(DECISION_KEY) === "1";
}

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribeOpenPreferences(cb: Listener): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function openCookiePreferences() {
  listeners.forEach((l) => l());
}
