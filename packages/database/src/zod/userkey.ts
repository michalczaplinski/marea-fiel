import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const UserKeyModel = z.object({
  id: z.string(),
  hashed_password: z.string().nullish(),
  user_id: z.string(),
})

export interface CompleteUserKey extends z.infer<typeof UserKeyModel> {
  user: CompleteUser
}

/**
 * RelatedUserKeyModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserKeyModel: z.ZodSchema<CompleteUserKey> = z.lazy(() => UserKeyModel.extend({
  user: RelatedUserModel,
}))
