import { StatsTile } from "@saas/dashboard/components";
import { PageHeader } from "@saas/shared/components";
import { Card } from "@ui/components";
import { createApiCaller } from "api";
import { getTranslator } from "next-intl/server";

export default async function Dashboard({ params: { locale } }) {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();
  const t = await getTranslator(locale);

  return (
    <div className="container max-w-6xl py-8">
      <PageHeader
        title={t("dashboard.welcome", { name: user?.name })}
        subtitle={t("dashboard.subtitle")}
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <StatsTile
          title="New clients"
          value={344}
          valueFormat="number"
          trend={0.12}
        />
        <StatsTile
          title="Revenue"
          value={5243}
          valueFormat="currency"
          trend={0.6}
        />
        <StatsTile
          title="Churn"
          value={0.03}
          valueFormat="percentage"
          trend={-0.3}
        />
      </div>

      <Card className="mt-8">
        <div className="text-muted-foreground flex h-64 items-center justify-center p-8">
          Place your content here...
        </div>
      </Card>
    </div>
  );
}
