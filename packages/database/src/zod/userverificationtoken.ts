import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const UserVerificationTokenModel = z.object({
  id: z.string(),
  user_id: z.string(),
  token: z.string(),
  expires: z.date(),
})

export interface CompleteUserVerificationToken extends z.infer<typeof UserVerificationTokenModel> {
  user: CompleteUser
}

/**
 * RelatedUserVerificationTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserVerificationTokenModel: z.ZodSchema<CompleteUserVerificationToken> = z.lazy(() => UserVerificationTokenModel.extend({
  user: RelatedUserModel,
}))
