import { UserContextProvider } from "@saas/auth/lib";
import { NavBar } from "@saas/shared/components";
import { createApiCaller } from "api";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Layout({
  children,
  params: { teamSlug },
}: PropsWithChildren<{ params: { teamSlug: string } }>) {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();

  if (!user) return redirect("/auth/login");

  const { teamMemberships } = user;

  const currentTeamMembership = teamMemberships?.find(
    (membership) => membership.team.slug === teamSlug,
  );

  return (
    <UserContextProvider
      initialUser={user}
      teamRole={currentTeamMembership?.role}
    >
      <div className="bg-muted min-h-screen">
        <NavBar
          user={user}
          teams={teamMemberships?.map((membership) => membership.team) ?? []}
        />
        <main className="bg-muted">{children}</main>
      </div>
    </UserContextProvider>
  );
}
