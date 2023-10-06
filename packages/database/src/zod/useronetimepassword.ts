import * as z from "zod"
import { UserOneTimePasswordType } from "@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const UserOneTimePasswordModel = z.object({
  id: z.string(),
  user_id: z.string(),
  code: z.string(),
  type: z.nativeEnum(UserOneTimePasswordType),
  identifier: z.string(),
  expires: z.date(),
})

export interface CompleteUserOneTimePassword extends z.infer<typeof UserOneTimePasswordModel> {
  user: CompleteUser
}

/**
 * RelatedUserOneTimePasswordModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserOneTimePasswordModel: z.ZodSchema<CompleteUserOneTimePassword> = z.lazy(() => UserOneTimePasswordModel.extend({
  user: RelatedUserModel,
}))
