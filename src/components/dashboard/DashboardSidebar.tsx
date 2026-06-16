import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, GraduationCap, CalendarCheck, ClipboardList,
  Wallet, BookOpen, Layers, FileBarChart, Megaphone, Settings, LogOut, Search,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { site } from "@/data/site";

const items = [
  { title: "Overview", to: "/dashboard", icon: LayoutDashboard, exact: true },
  { title: "Students", to: "/dashboard/students", icon: Users },
  { title: "Teachers", to: "/dashboard/teachers", icon: GraduationCap },
  { title: "Attendance", to: "/dashboard/attendance", icon: CalendarCheck },
  { title: "Results", to: "/dashboard/results", icon: ClipboardList },
  { title: "Fees", to: "/dashboard/fees", icon: Wallet },
  { title: "Classes", to: "/dashboard/classes", icon: Layers },
  { title: "Subjects", to: "/dashboard/subjects", icon: BookOpen },
  { title: "Reports", to: "/dashboard/reports", icon: FileBarChart },
  { title: "Announcements", to: "/dashboard/announcements", icon: Megaphone },
  { title: "Settings", to: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-2 text-sidebar-foreground">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gold text-gold-foreground">
            <GraduationCap className="h-4 w-4" />
          </span>
          {!collapsed && (
            <span className="font-display text-sm font-semibold truncate">{site.short} Admin</span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to, item.exact)} tooltip={item.title}>
                    <Link to={item.to} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Site search">
              <Link to="/search"><Search className="h-4 w-4" /><span>Search site</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to site">
              <Link to="/"><LogOut className="h-4 w-4" /><span>Back to site</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
