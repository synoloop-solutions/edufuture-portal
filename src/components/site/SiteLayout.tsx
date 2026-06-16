import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-primary text-primary-foreground"
      aria-labelledby="page-hero-title"
    >
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 to-primary/60" aria-hidden="true" />
        </>
      )}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        {eyebrow && (
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 id="page-hero-title" className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/85">{description}</p>
        )}
      </div>
    </section>
  );
}
