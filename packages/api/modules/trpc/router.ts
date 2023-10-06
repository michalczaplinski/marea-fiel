import type {} from "@prisma/client";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import * as authProcedures from "../auth/procedures";
import * as billingProcedures from "../billing/procedures";
import * as newsletterProcedures from "../newsletter/procedures";
import * as teamProcedures from "../team/procedures";
import { router } from "../trpc";

export const apiRouter = router({
  auth: router(authProcedures),
  billing: router(billingProcedures),
  team: router(teamProcedures),
  newsletter: router(newsletterProcedures),
});

export type ApiRouter = typeof apiRouter;
export type ApiInput = inferRouterInputs<ApiRouter>;
export type ApiOutput = inferRouterOutputs<ApiRouter>;
