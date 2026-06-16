import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { Fragment } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — BrightFuture Academy" },
      { name: "description", content: "School management dashboard for BrightFuture Academy." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const crumbs = buildCrumbs(pathname);

  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full bg-muted/30">
        <DashboardSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                {crumbs.map((c, i) => (
                  <Fragment key={c.to}>
                    <BreadcrumbItem>
                      {i === crumbs.length - 1 ? (
                        <BreadcrumbPage>{c.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={c.to}>{c.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {i < crumbs.length - 1 && <BreadcrumbSeparator />}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function buildCrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const out: { label: string; to: string }[] = [];
  let acc = "";
  for (const p of parts) {
    acc += `/${p}`;
    out.push({ label: prettyLabel(p), to: acc });
  }
  if (out.length === 0) out.push({ label: "Dashboard", to: "/dashboard" });
  return out;
}

function prettyLabel(seg: string) {
  if (seg === "dashboard") return "Dashboard";
  if (/^st-\d+$/.test(seg) || /^t-\d+$/.test(seg)) return seg.toUpperCase();
  return seg[0].toUpperCase() + seg.slice(1);
}
