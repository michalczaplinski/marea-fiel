import * as z from "zod"
import { TeamMemberRole } from "@prisma/client"
import { CompleteTeam, RelatedTeamModel, CompleteUser, RelatedUserModel } from "./index"

export const TeamMembershipModel = z.object({
  id: z.string(),
  team_id: z.string(),
  user_id: z.string(),
  role: z.nativeEnum(TeamMemberRole),
  is_creator: z.boolean(),
})

export interface CompleteTeamMembership extends z.infer<typeof TeamMembershipModel> {
  team: CompleteTeam
  user: CompleteUser
}

/**
 * RelatedTeamMembershipModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTeamMembershipModel: z.ZodSchema<CompleteTeamMembership> = z.lazy(() => TeamMembershipModel.extend({
  team: RelatedTeamModel,
  user: RelatedUserModel,
}))
