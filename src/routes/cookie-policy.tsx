import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { openCookiePreferences } from "@/components/site/cookie-store";
import { images } from "@/data/images";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — BrightFuture Academy" },
      { name: "description", content: "How we use cookies and how you can control them." },
      { property: "og:url", content: "/cookie-policy" },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Cookie Policy" image={images.library} />
      <article className="bg-background py-12">
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-8 space-y-4 text-foreground/85">
          <p>We use cookies to make the site work and, with your consent, to understand how it is used.</p>
          <h2 className="mt-6 text-xl font-semibold">Categories</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><b>Necessary</b> – required for the site to function.</li>
            <li><b>Analytics</b> – help us improve the site.</li>
            <li><b>Marketing</b> – personalised admissions content.</li>
            <li><b>Preferences</b> – remembers UI choices.</li>
          </ul>
          <div className="pt-4">
            <Button onClick={openCookiePreferences}>Change cookie preferences</Button>
          </div>
        </div>
      </article>
    </SiteLayout>
  ),
});
