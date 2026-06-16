import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { news } from "@/data/news";
import { events } from "@/data/events";
import { staff } from "@/data/staff";
import { departments } from "@/data/departments";

const BASE_URL = ""; // TODO: replace with project URL once a custom domain is set.

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/", "/about", "/admissions", "/academics",
          "/departments", "/staff", "/gallery", "/news", "/events",
          "/contact", "/search",
          "/privacy", "/terms", "/cookie-policy", "/accessibility",
        ];
        const dynamic = [
          ...departments.map((d) => `/departments/${d.slug}`),
          ...staff.map((s) => `/staff/${s.slug}`),
          ...news.map((n) => `/news/${n.slug}`),
          ...events.map((e) => `/events/${e.slug}`),
        ];
        const urls = [...staticPaths, ...dynamic]
          .map((p) => `  <url><loc>${BASE_URL}${p}</loc></url>`)
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
