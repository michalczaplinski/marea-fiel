"use client";

import { apiClient } from "@shared/lib";
import { Button, Icon } from "@ui/components";
import { useToast } from "@ui/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function PauseSubscriptionButton({ id }: { id: string }) {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();
  const pauseSubscriptionMutation =
    apiClient.billing.pauseSubscription.useMutation({
      onSuccess: () => {
        toast({
          variant: "success",
          title: t(
            "settings.billing.pauseSubscription.notifications.success.title",
          ),
        });
        router.refresh();
      },
      onError: () => {
        toast({
          variant: "error",
          title: t(
            "settings.billing.pauseSubscription.notifications.error.title",
          ),
        });
      },
    });

  const pauseSubscription = async () => {
    try {
      await pauseSubscriptionMutation.mutateAsync({ id });
    } catch {}
  };

  return (
    <Button
      variant="outline"
      onClick={() => pauseSubscription()}
      loading={pauseSubscriptionMutation.isLoading}
    >
      <Icon.pause className="mr-2 h-4 w-4" />
      {t("settings.billing.pauseSubscription.label")}
    </Button>
  );
}
