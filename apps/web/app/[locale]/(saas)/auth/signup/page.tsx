import { SignupForm } from "@saas/auth/components";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale, view } }) {
  const t = await getTranslator(locale);

  return {
    title: t("auth.signup.title"),
  };
}

export default function SignupPage() {
  return <SignupForm />;
}
