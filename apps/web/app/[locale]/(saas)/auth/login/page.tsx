import { LoginForm } from "@saas/auth/components";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale, view } }) {
  const t = await getTranslator(locale);

  return {
    title: t("auth.login.title"),
  };
}

export default function LoginPage() {
  return <LoginForm />;
}
