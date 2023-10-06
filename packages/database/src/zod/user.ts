import * as z from "zod"
import { UserRole } from "@prisma/client"
import { CompleteUserSession, RelatedUserSessionModel, CompleteUserKey, RelatedUserKeyModel, CompleteTeamMembership, RelatedTeamMembershipModel, CompleteUserVerificationToken, RelatedUserVerificationTokenModel, CompleteUserOneTimePassword, RelatedUserOneTimePasswordModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  role: z.nativeEnum(UserRole),
  name: z.string().nullish(),
  avatar_url: z.string().nullish(),
  github_username: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  sessions: CompleteUserSession[]
  keys: CompleteUserKey[]
  memberships: CompleteTeamMembership[]
  verification_tokens: CompleteUserVerificationToken[]
  one_time_passwords: CompleteUserOneTimePassword[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  sessions: RelatedUserSessionModel.array(),
  keys: RelatedUserKeyModel.array(),
  memberships: RelatedTeamMembershipModel.array(),
  verification_tokens: RelatedUserVerificationTokenModel.array(),
  one_time_passwords: RelatedUserOneTimePasswordModel.array(),
}))
