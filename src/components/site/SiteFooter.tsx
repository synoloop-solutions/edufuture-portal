import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { site } from "@/data/site";
import { openCookiePreferences } from "@/components/site/cookie-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function SiteFooter() {
  return (
    <footer className="border-t bg-sidebar text-sidebar-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-gold text-gold-foreground">
                <GraduationCap className="h-5 w-5" />
              </span>
              {site.name}
            </Link>
            <p className="mt-4 text-sm text-sidebar-foreground/70">{site.description}</p>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook", href: site.social.facebook },
                { Icon: Instagram, label: "Instagram", href: site.social.instagram },
                { Icon: Twitter, label: "Twitter", href: site.social.twitter },
                { Icon: Youtube, label: "YouTube", href: site.social.youtube },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-md bg-sidebar-accent text-sidebar-accent-foreground hover:bg-gold hover:text-gold-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/about", "About us"],
                ["/admissions", "Admissions"],
                ["/academics", "Academics"],
                ["/departments", "Departments"],
                ["/staff", "Staff directory"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sidebar-foreground/70 hover:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/news", "News"],
                ["/events", "Events"],
                ["/gallery", "Gallery"],
                ["/contact", "Contact"],
                ["/dashboard", "Staff portal"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sidebar-foreground/70 hover:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider">Stay in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-sidebar-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${site.phone}`} className="hover:text-gold">{site.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
              </li>
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                if (email) {
                  toast.success("Subscribed", { description: `${email} has been added to our newsletter.` });
                  form.reset();
                }
              }}
              className="mt-5 flex gap-2"
            >
              <label htmlFor="newsletter-email" className="sr-only">Email</label>
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                required
                maxLength={120}
                placeholder="Email address"
                className="bg-sidebar-accent text-sidebar-foreground placeholder:text-sidebar-foreground/50"
              />
              <Button type="submit" className="bg-gold text-gold-foreground hover:bg-gold/90">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-sidebar-border pt-6 text-xs text-sidebar-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li><Link to="/privacy" className="hover:text-gold">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-gold">Terms</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-gold">Cookie policy</Link></li>
            <li><Link to="/accessibility" className="hover:text-gold">Accessibility</Link></li>
            <li>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="hover:text-gold"
              >
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
