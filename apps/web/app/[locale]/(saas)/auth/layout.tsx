import { appConfig } from "@config";
import { UserContextProvider } from "@saas/auth/lib";
import { ColorModeToggle, LocaleSwitch, Logo } from "@shared/components";
import { Card } from "@ui/components";
import { useLocale } from "next-intl";
import Link from "next-intl/link";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren<{}>) {
  const locale = useLocale();

  return (
    <UserContextProvider initialUser={null}>
      <div className="bg-muted text-foreground flex min-h-screen place-items-center">
        <div className="container">
          <div className="mx-auto grid w-full max-w-md gap-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="block">
                <Logo />
              </Link>

              <div className="flex items-center justify-end gap-2">
                <LocaleSwitch
                  locales={appConfig.i18n.locales}
                  currentLocale={locale}
                />
                <ColorModeToggle />
              </div>
            </div>

            <Card className="p-8">{children}</Card>
          </div>
        </div>
      </div>
    </UserContextProvider>
  );
}
