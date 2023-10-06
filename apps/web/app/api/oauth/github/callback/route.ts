import { auth, githubAuth, OAuthRequestError } from "auth";
import { db } from "database";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const authRequest = auth.handleRequest({ request, cookies });
  const session = await authRequest.validate();
  if (session) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }
  const cookieStore = cookies();
  const storedState = cookieStore.get("github_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!storedState || !state || storedState !== state || !code)
    return new Response(null, {
      status: 400,
    });

  try {
    const { getExistingUser, githubUser, createUser, createKey } =
      await githubAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();

      if (existingUser) return existingUser;

      // check if user exists with same email
      if (githubUser.email) {
        const existingDatabaseUserWithEmail = await db.user.findFirst({
          where: {
            email: githubUser.email,
          },
        });

        if (existingDatabaseUserWithEmail) {
          await createKey(existingDatabaseUserWithEmail.id);
          return await auth.updateUserAttributes(
            existingDatabaseUserWithEmail.id,
            {
              github_username: githubUser.login,
            },
          );
        }
      }

      const user = await createUser({
        attributes: {
          email: githubUser.email!,
          name: githubUser.name ?? githubUser.login,
          github_username: githubUser.login,
          avatar_url: githubUser.avatar_url,
          email_verified: githubUser.email !== null,
          role: "USER",
        },
      });
      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    authRequest.setSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/team/redirect",
      },
    });
  } catch (e) {
    console.error(e);

    if (e instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
