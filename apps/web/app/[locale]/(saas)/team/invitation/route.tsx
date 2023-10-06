import { createApiCaller } from "api";
import { redirect } from "next-intl/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) return redirect("/");

  const apiCaller = await createApiCaller();

  const invitation = await apiCaller.team.invitationById({
    id: code,
  });

  if (!invitation) return redirect("/");

  const user = await apiCaller.auth.user();

  if (!user)
    return redirect(
      `/auth/login?invitationCode=${invitation.id}&email=${invitation.email}`,
    );

  try {
    const team = await apiCaller.team.acceptInvitation({
      id: code,
    });

    if (!team) return redirect("/");

    return redirect(`/${team.slug}/dashboard`);
  } catch (e) {
    console.error(e);
    return redirect("/");
  }
}
