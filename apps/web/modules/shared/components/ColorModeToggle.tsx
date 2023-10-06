"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  Icon,
} from "@ui/components";
import { useTheme } from "next-themes";
import { useState } from "react";

export function ColorModeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [value, setValue] = useState<string>(theme ?? "system");

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {resolvedTheme === "light" ? (
            <Icon.lightMode className="h-4 w-4" />
          ) : (
            <Icon.darkMode className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            setTheme(value);
            setValue(value);
          }}
        >
          {colorModeOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              <option.icon className="mr-2 h-4 w-4 opacity-50" /> {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
