import { BaseRoute, ParametizedRoute, RootRoute } from "../src";
import { describe, expect, it, test } from "vitest";

describe("Basic route tree", () => {
  const rootRoute = new RootRoute();
  const usersRoute = new BaseRoute(rootRoute, "/users");
  const userDetailRoute = new ParametizedRoute(usersRoute, "/:userId", {
    searchSchema: (input: Record<string, unknown>) => ({
      page: Number(input?.page) || 1,
      query: input?.query || "",
    }),
  });

  it("Root route", () => {
    expect(rootRoute.path()).toBe("");
  });
  it("User route", () => {
    expect(usersRoute.path()).toBe("/users");
    expect(usersRoute.route()).toBe("/users");
  });
  it("User detail route", () => {
    expect(userDetailRoute.path()).toBe("/users/:userId");
    expect(userDetailRoute.route({ userId: "123" })).toBe("/users/123");
    expect(
      userDetailRoute.route(
        { userId: "123" },
        { search: { page: 2, query: "abc" } }
      )
    ).toBe("/users/123?page=2&query=abc");
  });
});
