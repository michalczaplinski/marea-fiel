import { OtpForm } from "@saas/auth/components";
import { getTranslator } from "next-intl/server";

export async function generateMetadata({ params: { locale, view } }) {
  const t = await getTranslator(locale);

  return {
    title: t("auth.verifyOtp.title"),
  };
}

export default function OtpPage() {
  return <OtpForm />;
}
