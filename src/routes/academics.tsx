import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { departments } from "@/data/departments";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — BrightFuture Academy" },
      { name: "description", content: "Programmes, curriculum and academic achievements at BrightFuture Academy." },
      { property: "og:title", content: "Academics — BrightFuture Academy" },
      { property: "og:description", content: "Curriculum, programmes and achievements." },
      { property: "og:url", content: "/academics" },
      { property: "og:image", content: images.library },
    ],
    links: [{ rel: "canonical", href: "/academics" }],
  }),
  component: AcademicsPage,
});

function AcademicsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Academics"
        title="Rigorous, joyful learning from primary through to college."
        description="Our academic programme blends the Nigerian curriculum with international best practice."
        image={images.library}
      />

      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold">Programmes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { stage: "Primary (Pry 1–6)", body: "Foundations in literacy, numeracy, science and arts in a nurturing environment." },
              { stage: "Junior Secondary (JSS1–3)", body: "Broad curriculum across 12 subjects with strong tutorial support." },
              { stage: "Senior Secondary (SS1–3)", body: "Science, Arts and Commercial tracks aligned to WAEC and NECO." },
              { stage: "A-levels / College", body: "University-preparation pathway with Cambridge International A-levels." },
              { stage: "Enrichment", body: "Clubs, electives and Saturday programmes for deeper exploration." },
              { stage: "University counselling", body: "Personalised guidance for UK, US, Canadian and African universities." },
            ].map((p) => (
              <Card key={p.stage}>
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold">{p.stage}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold">Departments</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <Link key={d.slug} to="/departments/$slug" params={{ slug: d.slug }} className="group rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md">
                <p className="text-2xl">{d.icon}</p>
                <h3 className="mt-3 font-display text-lg font-semibold">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold">Recent achievements</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "Gold at the 2025 National STEM Olympiad",
              "Three-time West African Schools Debate Champions",
              "98% university placement rate (2024 cohort)",
              "Top 5% nationally in WAEC mathematics",
              "Regional football champions, 2024 and 2025",
              "Cambridge ICT centre of excellence",
            ].map((a) => (
              <li key={a} className="rounded-lg border bg-card p-4 text-sm">{a}</li>
            ))}
          </ul>
          <div className="mt-8">
            <Button asChild><Link to="/admissions">Start your application</Link></Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
