import { SubscriptionOverview, UpgradePlan } from "@saas/settings/components";
import { createApiCaller } from "api";
import { getTranslator, redirect } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale);

  return {
    title: t("settings.billing.title"),
  };
}

export default async function BillingSettingsPage({
  params: { teamSlug },
}: {
  params: { teamSlug: string };
}) {
  const apiCaller = await createApiCaller();
  const plans = await apiCaller.billing.plans();
  const user = await apiCaller.auth.user();
  const team = user?.teamMemberships?.find(
    (membership) => membership.team.slug === teamSlug,
  )?.team;

  if (!team) redirect("/auth/login");

  const teamSubscription = await apiCaller.team.subscription({
    teamId: team.id,
  });

  return (
    <div>
      <SubscriptionOverview
        plans={plans}
        currentSubscription={teamSubscription}
        className="mb-4"
      />
      <UpgradePlan
        plans={plans}
        activePlanId={teamSubscription?.plan_id}
        teamId={team.id}
      />
    </div>
  );
}
