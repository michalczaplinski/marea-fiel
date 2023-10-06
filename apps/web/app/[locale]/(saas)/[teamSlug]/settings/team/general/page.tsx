import { ChangeTeamNameForm } from "@saas/settings/components";
import { createApiCaller } from "api";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale);

  return {
    title: t("settings.team.title"),
  };
}

export default async function TeamSettingsPage({
  params: { teamSlug, locale },
}: {
  params: { teamSlug: string; locale: string };
}) {
  const apiCaller = await createApiCaller();
  const team = await apiCaller.team.bySlug({
    slug: teamSlug,
  });

  return (
    <div className="grid grid-cols-1 gap-6">
      <ChangeTeamNameForm initialValue={team.name} teamId={team.id} />
    </div>
  );
}
