import { SessionUser } from "auth";
import { TeamMembership } from "database";

export function defineAbilitiesFor({
  user,
  teamMemberships,
}: {
  user: SessionUser | null;
  teamMemberships: TeamMembership[] | null;
}) {
  const isAdmin = user?.role === "ADMIN";

  const getTeamRole = (teamId: string) =>
    teamMemberships?.find((m) => m.team_id === teamId)?.role ?? null;

  const isTeamMember = (teamId: string) => !!getTeamRole(teamId);
  const isTeamOwner = (teamId: string) => getTeamRole(teamId) === "OWNER";

  return {
    isAdmin,
    isTeamMember,
    isTeamOwner,
  };
}
