import { auth } from "auth";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const changePassword = protectedProcedure
  .input(
    z.object({
      password: z.string().min(8).max(255),
    }),
  )
  .mutation(async ({ ctx: { user }, input: { password } }) => {
    await auth.updateKeyPassword("email", user!.email, password);
  });
