# Typescript routes

Agnostic, minimal library designed for generating routes in any JS/TS framework.

Checkout examples using Vanilla or React + React Router in `examples/*`

## Example of usage

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

This example corresponds to this route tree:

```
---rootRoute
    ---indexRoute
    ---usersRoute
        ---userDetailRoute
```


All of these methods are 100% type safe:

```
indexRoute.route()
// "/"

usersRoute.route()
// "/users"

userDetailRoute.route({ userId: '123' }, { search: { query: 'testing', page: 100 }})
// "/users/123?query=testing&page=100"
```
