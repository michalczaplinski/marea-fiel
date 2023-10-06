import { TRPCError } from "@trpc/server";
import { TeamModel, db } from "database";
import slugify from "slugify";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const create = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      slug: z.optional(z.string()),
    }),
  )
  .output(TeamModel)
  .mutation(async ({ input: { name, slug }, ctx: { user } }) => {
    const sanitizedSlug = slugify(slug || name, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      replacement: "-",
      trim: true,
    });

    if (!sanitizedSlug)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid slug",
      });

    const team = await db.team.create({
      data: {
        name,
        slug: sanitizedSlug,
        memberships: {
          create: {
            user_id: user!.userId,
            role: "OWNER",
            is_creator: true,
          },
        },
      },
    });

    return team;
  });
