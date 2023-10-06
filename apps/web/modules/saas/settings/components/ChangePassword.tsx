"use client";

import { ActionBlock } from "@saas/shared/components";
import { apiClient } from "@shared/lib";
import { PasswordInput } from "@ui/components";
import { useToast } from "@ui/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ChangePasswordForm() {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const [password, setPassword] = useState("");

  const changePasswordMutation = apiClient.auth.changePassword.useMutation({
    onSuccess: () => {
      toast({
        title: t("settings.notifications.passwordUpdated"),
      });
      router.refresh();
    },
  });

  return (
    <ActionBlock
      title={t("settings.account.changePassword.title")}
      onSubmit={() => changePasswordMutation.mutate({ password })}
      isSubmitting={changePasswordMutation.isLoading}
      isSubmitDisabled={!password || password.length < 8}
    >
      <PasswordInput
        className="max-w-sm"
        value={password}
        onChange={(value) => setPassword(value)}
      />
    </ActionBlock>
  );
}
