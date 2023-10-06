import { TRPCError } from "@trpc/server";
import { auth, validateOneTimePassword } from "auth";
import { UserOneTimePasswordType } from "database";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const verifyOtp = publicProcedure
  .input(
    z.object({
      type: z.nativeEnum(UserOneTimePasswordType),
      identifier: z.string(),
      code: z.string(),
    }),
  )
  .mutation(
    async ({ input: { type, identifier, code }, ctx: { responseHeaders } }) => {
      try {
        const userId = await validateOneTimePassword({
          type,
          identifier,
          code,
        });

        const session = await auth.createSession({
          userId: userId,
          attributes: {},
        });

        // auth.handleRequest(req);
        const sessionCookie = auth.createSessionCookie(session);
        responseHeaders?.append("Set-Cookie", sessionCookie.serialize());

        return session;
      } catch (e) {
        console.error(e);

        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid one-time password",
        });
      }
    },
  );
