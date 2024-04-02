import { BaseRoute, ParametizedRoute, RootRoute } from "../../src";

const rootRoute = new RootRoute();

const indexRoute = new BaseRoute(rootRoute, "/");

const usersRoute = new BaseRoute(indexRoute, "/users");

const usersDetailRoute = new ParametizedRoute(usersRoute, "/:userId", {
  searchSchema: (input: Record<string, unknown>) => ({
    query: input?.query as string,
    pageIndex: Number(input?.pageIndex) || 0,
  }),
});

console.log(usersDetailRoute.route({ userId: "123" }));
// Output: /users/123

console.log(
  usersDetailRoute.route(
    { userId: "123" },
    { search: { query: "test", pageIndex: 1 } }
  )
);
// Output: /users/123?query=test&pageIndex=1

console.log(usersDetailRoute.path());
// Output: /users/:userId
