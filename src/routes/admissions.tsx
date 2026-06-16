import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — BrightFuture Academy" },
      { name: "description", content: "Admissions process, requirements, tuition information and how to apply to BrightFuture Academy." },
      { property: "og:title", content: "Admissions — BrightFuture Academy" },
      { property: "og:description", content: "Apply to BrightFuture for 2026/27. Process, requirements and tuition." },
      { property: "og:url", content: "/admissions" },
      { property: "og:image", content: images.studentSmiling },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: AdmissionsPage,
});

const steps = [
  ["Enquire", "Submit an enquiry form or call our admissions office."],
  ["Visit", "Book a personalised tour and meet our admissions team."],
  ["Apply", "Submit the application form with your child's records."],
  ["Assessment", "Age-appropriate assessment and a friendly conversation."],
  ["Decision", "Admissions decisions are sent within 10 working days."],
  ["Enrol", "Confirm your place and join our welcome programme."],
];

const tuition = [
  { stage: "Primary (Pry 1–6)", termly: "₦450,000" },
  { stage: "Junior Secondary (JSS1–3)", termly: "₦650,000" },
  { stage: "Senior Secondary (SS1–3)", termly: "₦780,000" },
  { stage: "College (A-levels)", termly: "₦950,000" },
];

function AdmissionsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Admissions"
        title="A simple, transparent admissions process."
        description="We accept applications for entry into all year groups, subject to availability. Limited places remain for 2026/27."
        image={images.studentSmiling}
      />

      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <h2 className="text-3xl font-bold">The process</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map(([title, body], i) => (
              <li key={title} className="rounded-2xl border bg-card p-6">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-display font-bold">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Requirements</h2>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              {[
                "Completed application form",
                "Copy of birth certificate",
                "Most recent school report (where applicable)",
                "Two passport photographs",
                "Application fee (non-refundable)",
              ].map((r) => (
                <li key={r} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Tuition</h2>
            <Card className="mt-6">
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="px-5 py-3 font-medium">Stage</th>
                      <th className="px-5 py-3 font-medium">Per term</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tuition.map((t) => (
                      <tr key={t.stage} className="border-b last:border-0">
                        <td className="px-5 py-3">{t.stage}</td>
                        <td className="px-5 py-3 font-semibold">{t.termly}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <p className="mt-3 text-xs text-muted-foreground">Tuition covers teaching, books and most activities. A separate meals/transport fee applies.</p>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">Ready to apply?</h2>
            <p className="mt-2 text-primary-foreground/85">Start your application or get in touch with our admissions team.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90"><Link to="/contact">Begin application</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><Link to="/contact">Book a tour</Link></Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
