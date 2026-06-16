import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { images } from "@/data/images";
import { site } from "@/data/site";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — BrightFuture Academy" },
      { name: "description", content: "Our commitment to accessible digital content for all visitors." },
      { property: "og:url", content: "/accessibility" },
    ],
    links: [{ rel: "canonical", href: "/accessibility" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Accessibility Statement" image={images.library} />
      <article className="bg-background py-12">
        <div className="mx-auto w-full max-w-3xl px-4 lg:px-8 space-y-4 text-foreground/85">
          <p>We aim to meet WCAG 2.1 AA standards across the {site.name} website.</p>
          <h2 className="mt-6 text-xl font-semibold">What we do</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Semantic HTML and accessible form controls.</li>
            <li>Keyboard navigation and visible focus indicators.</li>
            <li>Sufficient colour contrast across all themes.</li>
            <li>Descriptive alternative text for meaningful images.</li>
          </ul>
          <h2 className="mt-6 text-xl font-semibold">Report an issue</h2>
          <p>If you encounter an accessibility issue, please email {site.email} and we will respond promptly.</p>
        </div>
      </article>
    </SiteLayout>
  ),
});
