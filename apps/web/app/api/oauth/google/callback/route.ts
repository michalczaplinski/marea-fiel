import { auth, googleAuth, OAuthRequestError } from "auth";
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
  const storedState = cookieStore.get("google_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!storedState || !state || storedState !== state || !code)
    return new Response(null, {
      status: 400,
    });

  try {
    const { getExistingUser, googleUser, createUser, createKey } =
      await googleAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();

      if (existingUser) return existingUser;

      // check if user exists with same email
      if (googleUser.email_verified) {
        const existingDatabaseUserWithEmail = await db.user.findFirst({
          where: {
            email: googleUser.email,
          },
        });

        if (existingDatabaseUserWithEmail) {
          await createKey(existingDatabaseUserWithEmail.id);
          return auth.transformDatabaseUser(existingDatabaseUserWithEmail);
        }
      }

      const user = await createUser({
        attributes: {
          email: googleUser.email!,
          email_verified: !!googleUser.email_verified,
          name: googleUser.name,
          avatar_url: googleUser.picture,
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
