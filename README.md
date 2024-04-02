# Typescript routes

Agnostic, minimal library designed for generating routes in any JS/TS framework.

Checkout the example using React + React Router in `examples/2-react`. You can achieve a 100% type safe routing app app without migrating to `@tanstack/router`.

## Basic usage

Define your routes in a file:

```
const rootRoute = new RootRoute()

const indexRoute = new BaseRoute(rootRoute, "/")
const usersRoute = new BaseRoute(rootRoute, "/users")

export const usersDetailRoute = new ParametizedRoute(usersRoute, "/:userId", {
  searchSchema: (input: Record<string, unknown>) => ({
    query: input?.query as string,
    page: Number(input?.page) || 0,
  }),
});
```

This example corresponds to the following route tree:

```
---rootRoute
    ---indexRoute
    ---usersRoute
        ---userDetailRoute
```

Call the routes by accessing .route() method, a BaseRoute will require no args but a ParametizedRoute will require a Record<Params, string>:

```
indexRoute.route()
// "/"

usersRoute.route()
// "/users"

userDetailRoute.route({ userId: '123' }, { search: { query: 'testing', page: 100 }})
// "/users/123?query=testing&page=100"
```
