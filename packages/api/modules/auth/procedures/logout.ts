import { TRPCError } from "@trpc/server";
import { auth } from "auth";
import { protectedProcedure } from "../../trpc";

export const logout = protectedProcedure.mutation(
  async ({ ctx: { sessionId, responseHeaders } }) => {
    try {
      if (!sessionId) return;
      await auth.invalidateSession(sessionId);
      const sessionCookie = auth.createSessionCookie(null);
      responseHeaders?.append("Set-Cookie", sessionCookie.serialize());
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred.",
      });
    }
  },
);
