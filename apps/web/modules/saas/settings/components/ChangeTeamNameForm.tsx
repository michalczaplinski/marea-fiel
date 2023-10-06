"use client";

import { useUser } from "@saas/auth/hooks";
import { ActionBlock } from "@saas/shared/components";
import { apiClient } from "@shared/lib";
import { Input } from "@ui/components";
import { useToast } from "@ui/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ChangeTeamNameForm({
  initialValue,
  teamId,
}: {
  initialValue: string;
  teamId: string;
}) {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const { teamRole } = useUser();
  const [name, setName] = useState(initialValue);

  const updateTeamMutation = apiClient.team.update.useMutation({
    onSuccess: ({ slug }) => {
      toast({
        title: t("settings.notifications.teamNameUpdated"),
      });
      router.replace(`/${slug}/settings/team`);
    },
    onError: () => {
      toast({
        title: t("settings.notifications.teamNameNotUpdated"),
      });
    },
  });

  return (
    <ActionBlock
      title={t("settings.team.changeName.title")}
      onSubmit={() => updateTeamMutation.mutate({ name, id: teamId })}
      isSubmitting={updateTeamMutation.isLoading}
      isSubmitDisabled={!name || name === initialValue}
    >
      <Input
        className="max-w-sm"
        value={name}
        disabled={teamRole !== "OWNER"}
        onChange={(e) => setName(e.target.value)}
      />
    </ActionBlock>
  );
}
