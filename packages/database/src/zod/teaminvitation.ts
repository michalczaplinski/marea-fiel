import * as z from "zod"
import { TeamMemberRole } from "@prisma/client"
import { CompleteTeam, RelatedTeamModel } from "./index"

export const TeamInvitationModel = z.object({
  id: z.string(),
  team_id: z.string(),
  email: z.string(),
  role: z.nativeEnum(TeamMemberRole),
  createdAt: z.date(),
  expiresAt: z.date(),
})

export interface CompleteTeamInvitation extends z.infer<typeof TeamInvitationModel> {
  team: CompleteTeam
}

/**
 * RelatedTeamInvitationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTeamInvitationModel: z.ZodSchema<CompleteTeamInvitation> = z.lazy(() => TeamInvitationModel.extend({
  team: RelatedTeamModel,
}))
