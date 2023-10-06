import { TRPCError } from "@trpc/server";
import { Subscription, SubscriptionModel, db } from "database";
import { publicProcedure } from "../../trpc";

export const syncSubscription = publicProcedure
  .input(SubscriptionModel)
  .mutation(async ({ input: subscription, ctx: { isAdmin } }) => {
    // this procedure can only be called by the admin caller from a webhook
    if (!isAdmin)
      throw new TRPCError({
        code: "FORBIDDEN",
      });

    let existingSubscription: Subscription | null = null;

    if (subscription?.id) {
      existingSubscription = await db.subscription.findFirst({
        where: {
          id: subscription.id,
        },
      });
    }

    try {
      if (!existingSubscription)
        await db.subscription.create({
          data: subscription,
        });
      else
        await db.subscription.update({
          where: {
            id: existingSubscription.id,
          },
          data: subscription,
        });
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  });
