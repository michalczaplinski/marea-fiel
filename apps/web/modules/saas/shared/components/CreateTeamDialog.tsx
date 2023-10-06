"use client";

import { createTeamDialogOpen } from "@saas/dashboard/state";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@ui/components";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { CreateTeamForm } from "./CreateTeamForm";

export function CreateTeamDialog() {
  const t = useTranslations();
  const [open, setOpen] = useAtom(createTeamDialogOpen);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const { teamSlug } = params;

  const switchTeam = (slug: string) => {
    Cookies.set("createTeam.team-slug", slug, { path: "/", expires: 30 });
    router.replace(pathname.replace(teamSlug as string, slug));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("createTeam.title")}</DialogTitle>
        </DialogHeader>

        <CreateTeamForm
          isInitialTeam={false}
          onSuccess={async (team) => {
            switchTeam(team.slug);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
