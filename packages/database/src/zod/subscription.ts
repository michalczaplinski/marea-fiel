import * as z from "zod"
import { SubscriptionStatus } from "@prisma/client"
import { CompleteTeam, RelatedTeamModel } from "./index"

export const SubscriptionModel = z.object({
  id: z.string(),
  team_id: z.string(),
  customer_id: z.string(),
  status: z.nativeEnum(SubscriptionStatus),
  plan_id: z.string(),
  variant_id: z.string(),
  next_payment_date: z.date().nullish(),
})

export interface CompleteSubscription extends z.infer<typeof SubscriptionModel> {
  team: CompleteTeam
}

/**
 * RelatedSubscriptionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSubscriptionModel: z.ZodSchema<CompleteSubscription> = z.lazy(() => SubscriptionModel.extend({
  team: RelatedTeamModel,
}))
