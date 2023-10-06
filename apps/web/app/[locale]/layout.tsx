import { importLocale } from "@i18n";
import { ClientProviders } from "@shared/components";
import { Toaster } from "@ui/components";
import { Metadata } from "next";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: {
    absolute: "supastarter.nextjs - Application",
    default: "supastarter.nextjs- Application",
    template: "%s | supastarter.nextjs - Application",
  },
};

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }
  const messages = await importLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${sansFont.variable} bg-background font-sans`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>{children}</ClientProviders>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
