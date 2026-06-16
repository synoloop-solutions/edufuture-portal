
# BrightFuture Academy — Build Plan

A production-quality public school website plus a role-based School Management Dashboard for a fictional institution, built on TanStack Start, Tailwind v4, shadcn/ui, Framer Motion, and **Lovable Cloud** (Postgres + Auth + Storage + RLS) instead of Firebase. Brand: Deep Blue / White / Gold / Soft Gray, Inter + Space Grotesk.

## Sequencing — 4 reviewable phases

### Phase 1 — Public website (UI + content + SEO)
File-route per page with own `head()` (title, description, og:*, JSON-LD where relevant):
- `/`, `/about`, `/admissions`, `/academics`
- `/departments`, `/departments/$slug`
- `/staff`, `/staff/$slug`
- `/gallery`, `/news`, `/news/$slug`, `/events`, `/events/$slug`
- `/contact`, `/search`
- `/privacy`, `/terms`, `/cookie-policy`, `/accessibility`
- `/sitemap.xml` server route, `public/robots.txt`

Shared shell: sticky header + mobile drawer; footer with newsletter and cookie-settings reopen link. Homepage sections: hero, principal welcome, stats, academic excellence, admissions CTA, departments, upcoming events, latest news, gallery preview, testimonials, contact CTA, newsletter.

Mock data in `src/data/*.ts`. Real Unsplash/Pexels image URLs centralized in `src/data/images.ts`.

Cookie management: banner (Accept all / Reject non-essential / Customize) + preferences modal (Necessary / Analytics / Marketing / Preferences), persisted in `localStorage`, reopened from footer.

SEO/a11y/perf: semantic HTML, single `<main>`, focus-visible, keyboard nav, lazy/responsive images with width+height, JSON-LD (EducationalOrganization sitewide; Article on news; Event on events; BreadcrumbList on deep routes).

### Phase 2 — Dashboard UI (mock data, no auth yet)
Collapsible shadcn sidebar shell under `src/routes/dashboard/*`:
- `/dashboard` (KPI widgets + Recharts trends)
- `students`, `students/$id`
- `teachers`, `teachers/$id`
- `attendance`, `results`, `fees`, `classes`, `subjects`
- `reports`, `announcements`, `settings`

Each module: search, filter, pagination, CRUD dialogs. Detail pages render their own content (never redirect to listing) and load on direct URL + refresh.

### Phase 3 — Lovable Cloud backend + Auth
Enable Lovable Cloud. Add `/auth` (login + register), `/auth/forgot-password`, `/auth/reset-password`. Email/password, password reset, persistent session, single `onAuthStateChange` in `__root.tsx`. Move dashboard under integration-managed `src/routes/_authenticated/dashboard/*`.

Tables (all `public`, explicit `GRANT`s + RLS): `profiles`, `app_role` enum, `user_roles`, `has_role()` security-definer fn, `students`, `teachers`, `classes`, `subjects`, `attendance`, `results`, `fees`, `announcements`, `events`, `news`, `gallery`.

Storage buckets: `student-photos`, `teacher-photos`, `gallery`, `news`, `events`, `documents`, `report-cards` with upload/preview/delete.

Server functions (`*.functions.ts`) for all CRUD via `requireSupabaseAuth`. Public website reads via public server fns (admin-elevated, safe-column projection). Seed migration: 100 students, 25 teachers, 6 classes, 15+ subjects, 12 news, 10 events.

### Phase 4 — RBAC, analytics, polish
Roles `super_admin`, `administrator`, `teacher`, `bursar`, `student`, `parent` enforced via RLS using `has_role(auth.uid(), ...)` + UI gating. Permission matrix exactly as spec (Teacher no fees; Bursar fees only; Student/Parent read-only own/child).

Analytics widgets from DB aggregates (attendance rate, fees collected/outstanding, enrollment trends). Report-card PDF (`@react-pdf/renderer`). Public + dashboard search (Postgres ilike).

## Phase exit gates (MUST pass before marking a phase complete)

### Routing audit
- Every dynamic route loads its own detail page (no redirect back to listing).
- Direct URL access works for every route.
- Hard refresh works on every detail page.
- Browser back/forward navigation works.
- Every CTA, card, and nav item links to its intended destination.
- No placeholder routes, no dead links, no `TODO` content shipped.

### Layout / runtime audit
- No overlapping elements, no hidden content, no horizontal scroll, no z-index regressions.
- Zero console errors, zero runtime errors during a full click-through.
- Mobile layout verified at **320, 375, 768, 1024, 1440 px** via `browser--view_preview` + `set_viewport_size`.
- Loading skeletons, empty states, and error pages present on every data view.

I'll run these gates with the browser tool at the end of each phase and report results before moving on.

## Technical notes

- Backend: **Lovable Cloud** replaces requested Firebase (same capabilities, native RLS, no external account/keys). Data model maps 1:1 to Firestore if you later migrate.
- Tailwind v4 tokens in `@theme` inside `src/styles.css`; shadcn tokens via `@theme inline`. No `tailwind.config.js`.
- Routing: flat `*.tsx` files in `src/routes/`; `$slug` for dynamic; `_authenticated/` for gated dashboard; per-route `head()`.
- Server work: `createServerFn` for app logic; server routes only for `/sitemap.xml` and webhooks. No Supabase Edge Functions.
- Images: real Unsplash/Pexels URLs only, centralized.

## What I need from you

Nothing — approve and I'll start Phase 1.
