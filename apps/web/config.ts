export const appConfig = {
  i18n: {
    locales: ["en", "de", "es"],
    defaultLocale: "en",
    localeLabels: {
      en: "English",
      es: "Español",
      de: "Deutsch",
      fr: "asdf",
    },
    localeCurrencies: {
      /* This only works with Stripe for now. For LemonSqueezy, we need to set the currency in the LemonSqueezy dashboard and there can only be one. */
      en: "USD",
      de: "USD",
      es: "USD",
    },
  },
  auth: {
    oAuthProviders: ["google", "github"],
  },
  marketing: {
    menu: [
      {
        translationKey: "pricing",
        href: "/pricing",
      },
      {
        translationKey: "blog",
        href: "/Blog",
      },
    ],
  },
  teams: {
    avatarColors: ["#425693", "#9170b4", "#7e91c9", "#6e90ba"],
  },
};
