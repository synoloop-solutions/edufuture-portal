import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Award, Users, Heart, BookOpen, Trophy } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { images } from "@/data/images";
import { site, stats } from "@/data/site";
import { departments } from "@/data/departments";
import { news } from "@/data/news";
import { events } from "@/data/events";
import { gallery } from "@/data/gallery";
import { testimonials } from "@/data/testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BrightFuture Academy — Nurturing tomorrow's leaders" },
      {
        name: "description",
        content:
          "BrightFuture Academy is a leading primary, secondary and college institution offering academic excellence, character formation and modern facilities.",
      },
      { property: "og:title", content: "BrightFuture Academy" },
      { property: "og:description", content: site.description },
      { property: "og:url", content: "/" },
      { property: "og:image", content: images.heroCampus },
      { name: "twitter:image", content: images.heroCampus },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={images.heroCampus}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/60" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Welcome to {site.name}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              Nurturing tomorrow's leaders, today.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
              A {new Date().getFullYear() - site.founded}-year tradition of academic
              excellence, character formation and innovation — from primary through to college.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
                <Link to="/admissions">
                  Start application <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/about">Tour the school</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden lg:block"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-primary-foreground/10">
              <img src={images.heroStudents} alt="Students at BrightFuture Academy" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b bg-card">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-display text-3xl font-bold text-primary md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRINCIPAL WELCOME */}
      <section className="bg-background py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:px-8">
          <div className="relative">
            <img
              src={images.principal}
              alt="Dr. Amara Okeke, Principal"
              loading="lazy"
              width={600}
              height={750}
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-5 -right-5 hidden rounded-xl bg-gold px-5 py-3 text-gold-foreground shadow-lg md:block">
              <p className="font-display text-sm font-semibold">Dr. Amara Okeke</p>
              <p className="text-xs">Principal</p>
            </div>
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">From the Principal</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">A school where every student is known.</h2>
            <p className="mt-5 text-muted-foreground">
              At BrightFuture Academy, education is more than passing exams. We build curious, kind and
              capable young people who go on to lead in their universities, careers and communities.
            </p>
            <p className="mt-3 text-muted-foreground">
              Our teachers know every student by name. Our pastoral team knows every family. And our
              alumni network spans 30 countries, opening doors long after graduation.
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link to="/about">Read more about us <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why BrightFuture</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">A modern education, rooted in timeless values.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: Award, title: "Academic excellence", body: "Consistent top-tier exam results and a 98% university placement rate." },
              { Icon: Heart, title: "Pastoral care", body: "Dedicated form tutors and counsellors ensure every student is supported." },
              { Icon: BookOpen, title: "Modern facilities", body: "New science labs, expanded library, robotics studio and sports complex." },
              { Icon: Trophy, title: "Sports & arts", body: "Award-winning teams in football, swimming, debate, drama and music." },
              { Icon: Users, title: "Small classes", body: "Average class size of 22 keeps every voice heard and every question answered." },
              { Icon: GraduationCap, title: "University ready", body: "Dedicated counselling for UK, US, Canadian and African university tracks." },
            ].map(({ Icon, title, body }) => (
              <Card key={title} className="border-border/60 transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">Departments</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Five departments, one ambition.</h2>
            </div>
            <Button asChild variant="ghost">
              <Link to="/departments">All departments <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.slice(0, 3).map((d) => (
              <Link
                key={d.slug}
                to="/departments/$slug"
                params={{ slug: d.slug }}
                className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{d.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{d.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Admissions open for 2026/27.</h2>
            <p className="mt-3 text-primary-foreground/85">
              Apply online today. Limited places in JSS1 and SS1. Our admissions team will guide you through every step.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to="/admissions">Apply now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">Book a tour</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* EVENTS + NEWS */}
      <section className="bg-background py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold md:text-3xl">Upcoming events</h2>
              <Link to="/events" className="text-sm font-medium text-primary hover:underline">View all</Link>
            </div>
            <ul className="mt-6 space-y-4">
              {events.slice(0, 4).map((e) => (
                <li key={e.slug}>
                  <Link
                    to="/events/$slug"
                    params={{ slug: e.slug }}
                    className="flex gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="grid w-16 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <div className="text-center">
                        <p className="text-xs font-medium uppercase">
                          {new Date(e.date).toLocaleString("en", { month: "short" })}
                        </p>
                        <p className="font-display text-xl font-bold">{new Date(e.date).getDate()}</p>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{e.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{e.venue} • {e.time}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold md:text-3xl">Latest news</h2>
              <Link to="/news" className="text-sm font-medium text-primary hover:underline">View all</Link>
            </div>
            <ul className="mt-6 space-y-4">
              {news.slice(0, 3).map((n) => (
                <li key={n.slug}>
                  <Link
                    to="/news/$slug"
                    params={{ slug: n.slug }}
                    className="flex gap-4 rounded-xl border bg-card p-3 transition-colors hover:bg-muted/50"
                  >
                    <img
                      src={n.image}
                      alt=""
                      loading="lazy"
                      className="h-20 w-28 shrink-0 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-primary">{n.category}</p>
                      <p className="mt-1 line-clamp-2 font-semibold">{n.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(n.date).toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">Gallery</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Life at BrightFuture.</h2>
            </div>
            <Button asChild variant="ghost"><Link to="/gallery">View gallery <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-3 lg:grid-cols-4">
            {gallery.slice(0, 8).map((g) => (
              <div key={g.id} className="group relative aspect-square overflow-hidden rounded-xl">
                <img src={g.src} alt={g.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">Voices</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">What our community says.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border/60">
                <CardContent className="p-6">
                  <p className="text-foreground/80">"{t.quote}"</p>
                  <div className="mt-4 border-t pt-4">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-card py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold md:text-3xl">Have a question? We'd love to help.</h2>
            <p className="mt-2 text-muted-foreground">
              Speak with our admissions team or book a personalised campus tour at a time that suits you.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg"><Link to="/contact">Contact us</Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/admissions">Admissions</Link></Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
