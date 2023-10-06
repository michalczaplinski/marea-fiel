import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { apiRouter, createContext } from "./modules/trpc";

export const trpcApiRouteHandler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api",
    req,
    router: apiRouter,
    createContext,
  });
