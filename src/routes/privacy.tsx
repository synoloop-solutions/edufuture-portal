import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { openCookiePreferences } from "@/components/site/cookie-store";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { site } from "@/data/site";

function LegalShell({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <SiteLayout>
      <PageHero eyebrow={eyebrow} title={title} image={images.library} />
      <article className="bg-background py-12">
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-8">
          <div className="space-y-4 text-foreground/85">{children}</div>
        </div>
      </article>
    </SiteLayout>
  );
}

export const privacyRoute = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — BrightFuture Academy" },
      { name: "description", content: "How BrightFuture Academy collects, uses and protects personal data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalShell eyebrow="Legal" title="Privacy Policy">
      <p>Last updated: 1 September {new Date().getFullYear()}.</p>
      <p>{site.name} ("we", "us") respects your privacy. This policy explains what information we collect, how we use it and your rights.</p>
      <h2 className="mt-6 text-xl font-semibold">Information we collect</h2>
      <p>We collect information you provide via admissions forms, enquiry forms and account registration, including names, contact details and academic records.</p>
      <h2 className="mt-6 text-xl font-semibold">How we use information</h2>
      <p>We use your information to process admissions, communicate with families, and provide our educational services.</p>
      <h2 className="mt-6 text-xl font-semibold">Cookies</h2>
      <p>See our <Link className="underline" to="/cookie-policy">Cookie Policy</Link> for details, or <button type="button" onClick={openCookiePreferences} className="underline">change your preferences</button>.</p>
      <h2 className="mt-6 text-xl font-semibold">Contact</h2>
      <p>For data requests, write to {site.email}.</p>
    </LegalShell>
  ),
});
export const Route = privacyRoute;
