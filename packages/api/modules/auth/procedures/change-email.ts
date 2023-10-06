import { auth, generateVerificationToken } from "auth";
import { sendEmail } from "mail";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const changeEmail = protectedProcedure
  .input(
    z.object({
      email: z
        .string()
        .email()
        .min(1)
        .max(255)
        .transform((v) => v.toLowerCase()),
      callbackUrl: z.string(),
    }),
  )
  .mutation(
    async ({
      ctx: { user, responseHeaders },
      input: { email, callbackUrl },
    }) => {
      if (!user) return;

      const updatedUser = await auth.updateUserAttributes(user.id, {
        email,
        email_verified: false,
      });

      await auth.invalidateAllUserSessions(user.id);
      const sessionCookie = auth.createSessionCookie(null);
      responseHeaders?.append("Set-Cookie", sessionCookie.serialize());

      const token = await generateVerificationToken({
        userId: user.userId,
      });

      const url = new URL(callbackUrl);
      url.searchParams.set("token", token);

      sendEmail({
        to: email,
        templateId: "emailChange",
        context: {
          name: updatedUser.name ?? updatedUser.email,
          url: url.toString(),
        },
      });
    },
  );
