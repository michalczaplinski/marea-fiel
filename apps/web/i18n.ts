import { getRequestConfig } from "next-intl/server";

export const importLocale = async (locale: string) => {
  return (await import(`./locales/${locale}.json`)).default;
};

export default getRequestConfig(async ({ locale }) => ({
  messages: await importLocale(locale),
})) as any;
