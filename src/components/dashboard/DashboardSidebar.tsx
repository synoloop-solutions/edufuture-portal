import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, GraduationCap, CalendarCheck, ClipboardList,
  Wallet, BookOpen, Layers, FileBarChart, Megaphone, Settings, LogOut, Search, Home,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { site } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMyRoles } from "@/lib/dashboard-hooks";

type NavItem = { title: string; to: string; icon: typeof LayoutDashboard; exact?: boolean; roles?: string[] };

const items: NavItem[] = [
  { title: "Overview", to: "/dashboard", icon: LayoutDashboard, exact: true },
  { title: "Students", to: "/dashboard/students", icon: Users },
  { title: "Teachers", to: "/dashboard/teachers", icon: GraduationCap, roles: ["admin", "principal", "teacher", "bursar"] },
  { title: "Attendance", to: "/dashboard/attendance", icon: CalendarCheck, roles: ["admin", "principal", "teacher", "student", "parent"] },
  { title: "Results", to: "/dashboard/results", icon: ClipboardList, roles: ["admin", "principal", "teacher", "student", "parent"] },
  { title: "Fees", to: "/dashboard/fees", icon: Wallet, roles: ["admin", "principal", "bursar", "parent"] },
  { title: "Classes", to: "/dashboard/classes", icon: Layers },
  { title: "Subjects", to: "/dashboard/subjects", icon: BookOpen },
  { title: "Reports", to: "/dashboard/reports", icon: FileBarChart, roles: ["admin", "principal", "bursar"] },
  { title: "Announcements", to: "/dashboard/announcements", icon: Megaphone },
  { title: "Settings", to: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const roles = useMyRoles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const canSee = (item: NavItem) => {
    if (!item.roles) return true;
    if (roles.includes("admin") || roles.includes("principal")) return true;
    return item.roles.some((r) => roles.includes(r));
  };

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth", replace: true });
  }

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
              {items.filter(canSee).map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to, item.exact)} tooltip={item.title}>
                    <Link to={item.to} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/search"} tooltip="Search">
                  <Link to="/dashboard/search" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to site">
              <Link to="/"><Home className="h-4 w-4" /><span>Back to site</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Sign out" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" /><span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
