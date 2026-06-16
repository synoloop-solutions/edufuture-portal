import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { gallery, galleryCategories } from "@/data/gallery";
import { images } from "@/data/images";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — BrightFuture Academy" },
      { name: "description", content: "A visual tour of life at BrightFuture Academy: campus, academics, sports, arts and community." },
      { property: "og:title", content: "Gallery" },
      { property: "og:description", content: "Life at BrightFuture Academy in pictures." },
      { property: "og:url", content: "/gallery" },
      { property: "og:image", content: images.campusAerial },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState("All");
  const items = active === "All" ? gallery : gallery.filter((g) => g.category === active);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Gallery"
        title="Life at BrightFuture in pictures."
        image={images.campusAerial}
      />
      <section className="bg-background py-12">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === c
                    ? "bg-primary text-primary-foreground"
                    : "border bg-card text-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((g) => (
              <figure key={g.id} className="group overflow-hidden rounded-xl">
                <img src={g.src} alt={g.caption} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <figcaption className="mt-2 text-xs text-muted-foreground">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
