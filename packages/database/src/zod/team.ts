import * as z from "zod"
import { CompleteTeamMembership, RelatedTeamMembershipModel, CompleteSubscription, RelatedSubscriptionModel, CompleteTeamInvitation, RelatedTeamInvitationModel } from "./index"

export const TeamModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
})

export interface CompleteTeam extends z.infer<typeof TeamModel> {
  memberships: CompleteTeamMembership[]
  subscription?: CompleteSubscription | null
  invitations: CompleteTeamInvitation[]
}

/**
 * RelatedTeamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTeamModel: z.ZodSchema<CompleteTeam> = z.lazy(() => TeamModel.extend({
  memberships: RelatedTeamMembershipModel.array(),
  subscription: RelatedSubscriptionModel.nullish(),
  invitations: RelatedTeamInvitationModel.array(),
}))
