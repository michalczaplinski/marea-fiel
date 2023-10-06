import { createTRPCReact } from "@trpc/react-query";
import { ApiRouter } from "api";

export const apiClient = createTRPCReact<ApiRouter>({});
