import { TRPCError } from "@trpc/server";
import { auth, validateVerificationToken } from "auth";
import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const verifyToken = publicProcedure
  .input(
    z.object({
      token: z.string(),
    }),
  )
  .mutation(async ({ input: { token }, ctx: { responseHeaders } }) => {
    try {
      const userId = await validateVerificationToken({
        token,
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
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid token",
      });
    }
  });
