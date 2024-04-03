import { BaseRoute, ParametizedRoute, RootRoute } from "typescript-routes";

export const rootRoute = new RootRoute();

export const indexRoute = new BaseRoute(rootRoute, "/");

export const usersRoute = new BaseRoute(rootRoute, "/users");

export const usersDetailRoute = new ParametizedRoute(usersRoute, "/:userId", {
  searchSchema: (input: Record<string, unknown>) => ({
    query: input?.query as string,
    page: Number(input?.page) || 0,
  }),
});
