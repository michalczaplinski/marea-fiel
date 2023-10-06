"use client";

import { appConfig } from "@config";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import { useUser } from "@saas/auth/hooks";
import { UserAvatar } from "@shared/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Icon,
} from "@ui/components";
import { useLocale } from "next-intl";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
import { useTheme } from "next-themes";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const { locales, localeLabels } = appConfig.i18n;

export function UserMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const { user, logout } = useUser();
  const [locale, setLocale] = useState<string>(currentLocale);
  const { setTheme: setCurrentTheme, theme: currentTheme } = useTheme();
  const [theme, setTheme] = useState<string>(currentTheme ?? "system");

  const teamSlug = params.teamSlug as string;

  const colorModeOptions = [
    {
      value: "system",
      label: "System",
      icon: Icon.system,
    },
    {
      value: "light",
      label: "Light",
      icon: Icon.lightMode,
    },
    {
      value: "dark",
      label: "Dark",
      icon: Icon.darkMode,
    },
  ];

  if (!user) return null;

  const { name, email, avatar_url } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus-visible:ring-primary rounded-full outline-none focus-visible:ring-2">
          <UserAvatar name={name ?? ""} avatarUrl={avatar_url} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {name}
          <span className="block text-xs font-normal opacity-70">{email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Color mode selection */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon.lightMode className="mr-2 h-4 w-4" /> Color mode
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => {
                  setTheme(value);
                  setCurrentTheme(value);
                }}
              >
                {colorModeOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                  >
                    <option.icon className="mr-2 h-4 w-4 opacity-50" />{" "}
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Language selection */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon.language className="mr-2 h-4 w-4" /> Language
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={locale}
                onValueChange={(value) => {
                  setLocale(value);
                  router.replace(
                    `/${value}/${pathname}?${searchParams.toString()}`,
                  );
                }}
              >
                {locales.map((locale) => {
                  return (
                    <DropdownMenuRadioItem key={locale} value={locale}>
                      {locale in localeLabels
                        ? localeLabels[locale as keyof typeof localeLabels]
                        : locale}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/${teamSlug}/settings/account/general`}>
            <Icon.settings className="mr-2 h-4 w-4" /> Account settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Icon.docs className="mr-2 h-4 w-4" /> Documentation
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={logout}>
          <Icon.logout className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
