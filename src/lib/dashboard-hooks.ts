import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getDashboardSnapshot, getMyAccess } from "@/lib/dashboard-data.functions";

export const dashboardSnapshotQuery = queryOptions({
  queryKey: ["dashboard", "snapshot"],
  queryFn: () => getDashboardSnapshot(),
  staleTime: 30_000,
});

export const myAccessQuery = queryOptions({
  queryKey: ["me", "access"],
  queryFn: () => getMyAccess(),
  staleTime: 60_000,
});

export function useDashboard() {
  return useSuspenseQuery(dashboardSnapshotQuery).data;
}
export function useMyAccess() {
  return useSuspenseQuery(myAccessQuery).data;
}
export function useMyRoles() {
  return useMyAccess().roles;
}
export function useHasRole(...roles: string[]) {
  const mine = useMyRoles();
  return roles.some((r) => mine.includes(r));
}

export const ROLE_LABELS: Record<string, string> = {
  admin: "Administrator",
  principal: "Principal",
  teacher: "Teacher",
  bursar: "Bursar",
  student: "Student",
  parent: "Parent",
};
