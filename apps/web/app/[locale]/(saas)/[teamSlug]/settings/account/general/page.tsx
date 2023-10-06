import { ChangeNameForm, ChangePasswordForm } from "@saas/settings/components";
import { createApiCaller } from "api";
import { getTranslator, redirect } from "next-intl/server";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale);

  return {
    title: t("settings.account.title"),
  };
}

export default async function AccountSettingsPage() {
  const apiCaller = await createApiCaller();
  const user = await apiCaller.auth.user();

  if (!user) redirect("/auth/login");

  return (
    <div className="grid gap-6">
      <ChangeNameForm initialValue={user.name ?? ""} />
      <ChangePasswordForm />
    </div>
  );
}
