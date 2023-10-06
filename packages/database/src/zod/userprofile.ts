import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const UserProfileModel = z.object({
  userId: z.string(),
  avatar_url: z.string().nullish(),
})

export interface CompleteUserProfile extends z.infer<typeof UserProfileModel> {
  user: CompleteUser
}

/**
 * RelatedUserProfileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserProfileModel: z.ZodSchema<CompleteUserProfile> = z.lazy(() => UserProfileModel.extend({
  user: RelatedUserModel,
}))
