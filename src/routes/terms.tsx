import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { images } from "@/data/images";
import { site } from "@/data/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — BrightFuture Academy" },
      { name: "description", content: "Terms governing use of the BrightFuture Academy website." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Terms of Use" image={images.library} />
      <article className="bg-background py-12">
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-8 space-y-4 text-foreground/85">
          <p>Last updated: 1 September {new Date().getFullYear()}.</p>
          <p>By accessing this website you agree to these terms. The {site.name} website is provided for information about our school and services.</p>
          <h2 className="mt-6 text-xl font-semibold">Acceptable use</h2>
          <p>You agree not to misuse this site or attempt to disrupt its operation. Content is the property of {site.name} unless otherwise stated.</p>
          <h2 className="mt-6 text-xl font-semibold">No warranty</h2>
          <p>Information is provided "as is". We make reasonable efforts to keep it accurate and up to date but cannot guarantee this.</p>
          <h2 className="mt-6 text-xl font-semibold">Contact</h2>
          <p>Questions about these terms: {site.email}.</p>
        </div>
      </article>
    </SiteLayout>
  ),
});
