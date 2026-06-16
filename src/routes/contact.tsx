import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { site } from "@/data/site";
import { images } from "@/data/images";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BrightFuture Academy" },
      { name: "description", content: "Get in touch with BrightFuture Academy. Phone, email and visit information." },
      { property: "og:title", content: "Contact BrightFuture Academy" },
      { property: "og:description", content: "Phone, email and visit information." },
      { property: "og:url", content: "/contact" },
      { property: "og:image", content: images.heroCampus },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(200),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10, "Please write a short message").max(1500),
});

function ContactPage() {
  const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema>, string>>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse(Object.fromEntries(fd));
    if (!result.success) {
      const errs: typeof errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof z.infer<typeof schema>;
        errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    toast.success("Message sent", { description: "We'll get back to you within one working day." });
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you."
        description="Reach out about admissions, partnerships or anything else — we typically respond within one working day."
        image={images.heroCampus}
      />
      <section className="bg-background py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <form onSubmit={onSubmit} noValidate className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
                {errors.name && <p id="name-err" className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={200} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
                {errors.email && <p id="email-err" className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" name="phone" type="tel" maxLength={40} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" rows={6} required maxLength={1500} aria-invalid={!!errors.message} aria-describedby={errors.message ? "msg-err" : undefined} />
                {errors.message && <p id="msg-err" className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
            </div>
            <Button type="submit" className="mt-6">Send message</Button>
          </form>
          <aside>
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-primary" /> {site.address}</li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> <a href={`tel:${site.phone}`} className="hover:text-primary">{site.phone}</a></li>
              <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a></li>
            </ul>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Office hours</h3>
            <p className="mt-2 text-sm text-foreground/80">Mon – Fri: 08:00 – 17:00<br />Sat: 09:00 – 13:00</p>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
