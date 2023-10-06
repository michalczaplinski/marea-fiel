"use client";

import { Badge, BadgeProps } from "@ui/components";
import { ApiOutput } from "api";
import { SubscriptionStatus } from "database";
import { useTranslations } from "next-intl";

type SubscriptionPlan = ApiOutput["billing"]["plans"][number];

export function SubscriptionStatusBadge({
  status,
  className,
}: {
  status: SubscriptionStatus;
  className?: string;
}) {
  const t = useTranslations();

  const badgeLabels: Record<SubscriptionStatus, string> = {
    ACTIVE: t("settings.billing.subscription.status.active"),
    CANCELED: t("settings.billing.subscription.status.canceled"),
    EXPIRED: t("settings.billing.subscription.status.expired"),
    INCOMPLETE: t("settings.billing.subscription.status.incomplete"),
    PAST_DUE: t("settings.billing.subscription.status.past_due"),
    PAUSED: t("settings.billing.subscription.status.paused"),
    TRIALING: t("settings.billing.subscription.status.trialing"),
    UNPAID: t("settings.billing.subscription.status.unpaid"),
  };

  const badgeColors: Record<SubscriptionStatus, BadgeProps["status"]> = {
    ACTIVE: "success",
    CANCELED: "error",
    EXPIRED: "error",
    INCOMPLETE: "warning",
    PAST_DUE: "warning",
    PAUSED: "warning",
    TRIALING: "info",
    UNPAID: "error",
  };

  return <Badge status={badgeColors[status]}>{badgeLabels[status]}</Badge>;
}
