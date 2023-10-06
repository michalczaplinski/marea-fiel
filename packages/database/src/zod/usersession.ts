import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const UserSessionModel = z.object({
  id: z.string(),
  user_id: z.string(),
  active_expires: z.bigint(),
  idle_expires: z.bigint(),
})

export interface CompleteUserSession extends z.infer<typeof UserSessionModel> {
  user: CompleteUser
}

/**
 * RelatedUserSessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserSessionModel: z.ZodSchema<CompleteUserSession> = z.lazy(() => UserSessionModel.extend({
  user: RelatedUserModel,
}))
