import { createAdminApiCaller } from "api/modules/trpc";
import { createHmac, timingSafeEqual } from "crypto";
import { Subscription, SubscriptionStatus, db } from "database";
import { headers } from "next/headers";

async function updateUserSubscription(
  subscription: Subscription,
): Promise<void | Subscription> {
  if (!subscription.team_id) throw new Error("team_id must be provided");

  const existingSubscription = await db.subscription.findFirst({
    where: {
      team_id: subscription.team_id,
    },
  });

  try {
    if (existingSubscription)
      return await db.subscription.update({
        data: subscription,
        where: {
          id: existingSubscription.id,
        },
      });

    await db.subscription.create({
      data: subscription,
    });
  } catch (e) {
    console.error(e);
    throw new Error("Could not upsert subscription");
  }
}

export async function POST(req: Request) {
  try {
    const text = await req.text();
    const hmac = createHmac(
      "sha256",
      process.env.LEMONSQUEEZY_WEBHOOK_SECRET as string,
    );
    const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
    const signature = Buffer.from(
      headers().get("x-signature") as string,
      "utf8",
    );

    if (!timingSafeEqual(digest, signature))
      return new Response("Invalid signature.", {
        status: 400,
      });

    const payload = JSON.parse(text);

    const {
      meta: { event_name: eventName, custom_data: customData },
      data,
    } = payload;

    const statusMap: Record<string, SubscriptionStatus> = {
      active: "ACTIVE",
      past_due: "PAST_DUE",
      unpaid: "UNPAID",
      cancelled: "CANCELED",
      expired: "EXPIRED",
      on_trial: "TRIALING",
      paused: "PAUSED",
    };

    const apiCaller = await createAdminApiCaller();

    switch (eventName) {
      case "subscription_created":
      case "subscription_updated":
      case "subscription_cancelled":
      case "subscription_expired":
      case "subscription_resumed":
        await apiCaller.billing.syncSubscription({
          id: String(data.id),
          team_id: customData?.team_id,
          customer_id: String(data.attributes.customer_id),
          plan_id: String(data.attributes.product_id),
          variant_id: String(data.attributes.variant_id),
          status: statusMap[data.attributes.status],
          next_payment_date: new Date(
            data.attributes.trial_ends_at ?? data.attributes.renews_at,
          ),
        });
        break;
    }
  } catch (error: unknown) {
    return new Response(
      `Webhook error: ${error instanceof Error ? error.message : ""}`,
      {
        status: 400,
      },
    );
  }

  return new Response(null, {
    status: 204,
  });
}
