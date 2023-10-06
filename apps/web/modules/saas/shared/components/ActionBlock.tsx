"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/components";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";

export function ActionBlock({
  children,
  title,
  onSubmit,
  isSubmitting,
  isSubmitDisabled,
  className,
}: PropsWithChildren<{
  onSubmit?: () => void;
  title: string;
  isSubmitting?: boolean;
  isSubmitDisabled?: boolean;
  submitLabel?: string;
  className?: string;
}>) {
  const t = useTranslations();

  return (
    <Card className={className}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent>
          {children}

          {typeof onSubmit !== "undefined" && (
            <div className=" mt-6 flex justify-end border-t pt-3">
              <Button
                type="submit"
                disabled={isSubmitDisabled}
                loading={isSubmitting}
              >
                {t("settings.save")}
              </Button>
            </div>
          )}
        </CardContent>
      </form>
    </Card>
  );
}
