# Typescript routes

Agnostic, minimal library designed for generating routes in any JS/TS framework:

- Path params automatically infered by `:` prefix
- Search schema can be defined both in `BaseRoute` and `ParametizedRoute`
- Agnostic, agnostic, agnostic

Checkout the example using React + React Router in `examples/*`. You can defintely achieve a 100% type safe routing app app without migrating to `@tanstack/router`.

## Basic usage

First, define your routes in a file:

```
const rootRoute = new RootRoute()

const indexRoute = new BaseRoute(rootRoute, "/")
const usersRoute = new BaseRoute(rootRoute, "/users")

const usersDetailRoute = new ParametizedRoute(usersRoute, "/:userId", {
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

Get the routes by calling .route() method. BaseRoute will require no args but ParametizedRoute will require Record<Params, string>, with type inference regarding your params starting with `:` prefix:

```
indexRoute.route()
// "/"

usersRoute.route()
// "/users"

userDetailRoute.route({ userId: '123' }, { search: { query: 'testing', page: 100 }})
// "/users/123?query=testing&page=100"
```
