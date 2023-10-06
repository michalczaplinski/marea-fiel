import { createAdminApiCaller } from "api/modules/trpc";
import { createHmac, timingSafeEqual } from "crypto";
import { SubscriptionStatus } from "database";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const text = await req.text();
    const hmac = createHmac(
      "sha256",
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
    const signatureHeader = headers().get("stripe-signature") as string;
    const signatureParts = signatureHeader
      .split(",")
      .map((part) => part.split("="));
    const signatureKey =
      signatureParts.find((part) => part[0] === "v1")?.[1] ?? "";
    const signatureTimestamp =
      signatureParts.find((part) => part[0] === "t")?.[1] ?? "";
    const digest = Buffer.from(
      hmac.update(`${signatureTimestamp}.${text}`).digest("hex"),
      "utf8",
    );
    const signature = Buffer.from(signatureKey, "utf8");

    if (!timingSafeEqual(digest, signature))
      return new Response("Invalid signature.", {
        status: 400,
      });

    const payload = JSON.parse(text);
    const type = payload?.type as string;

    if (
      ![
        "customer.subscription.created",
        "customer.subscription.updated",
        "customer.subscription.deleted",
      ].includes(type)
    ) {
      return new Response("Invalid event type.", {
        status: 400,
      });
    }

    const statusMap: Record<string, SubscriptionStatus> = {
      active: "ACTIVE",
      past_due: "PAST_DUE",
      unpaid: "UNPAID",
      canceled: "CANCELED",
      incomplete: "INCOMPLETE",
      incomplete_expired: "EXPIRED",
      trialing: "TRIALING",
      paused: "PAUSED",
    };

    const apiCaller = await createAdminApiCaller();

    const data = payload?.data.object;
    if (!data) throw new Error("Invalid payload.");

    await apiCaller.billing.syncSubscription({
      id: String(data.id),
      team_id: data.metadata?.team_id,
      customer_id: String(data.customer),
      plan_id: String(data.plan.product),
      variant_id: String(data.plan.id),
      status: statusMap[data.status],
      next_payment_date: new Date(
        (data.trial_end ?? data.current_period_end ?? 0) * 1000,
      ),
    });
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
