import { prisma } from "@lucia-auth/adapter-prisma";
import { github, google } from "@lucia-auth/oauth/providers";
import { db } from "database";
import { User, lucia } from "lucia";
import { nextjs } from "lucia/middleware";
import { getBaseUrl } from "utils";

export const auth = lucia({
  adapter: prisma(db, {
    user: "user",
    session: "userSession",
    key: "userKey",
  }),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return {
      id: data.id,
      email: data.email,
      name: data.name ?? data.email,
      role: data.role,
      avatar_url: data.avatar_url,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID as string,
  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
});

export const googleAuth = google(auth, {
  redirectUri: new URL("/api/oauth/google/callback", getBaseUrl()).toString(),
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  scope: ["email"],
});

export type Auth = typeof auth;
export type SessionUser = User;
export { OAuthRequestError } from "@lucia-auth/oauth";
export { LuciaError } from "lucia";
