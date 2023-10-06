import { redirect } from "next-intl/server";

export default async function SettingsPage({
  params: { teamSlug },
}: {
  params: { teamSlug: string };
}) {
  redirect(`/${teamSlug}/settings/team/general`);
}
