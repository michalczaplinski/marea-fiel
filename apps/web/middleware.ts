import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { appConfig } from "./config";

const intlMiddleware = createMiddleware(appConfig.i18n);

export default async function middleware(req: NextRequest) {
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
