# Typescript routes

Agnostic, minimal library designed for generating routes in any JS/TS framework.

The routes define are 100% typesafe and automatically infer path params.

## Example of usage

```
const rootRoute = new RootRoute()

const indexRoute = new BaseRoute(rootRoute, "/")
const usersRoute = new BaseRoute(rootRoute, "/users")

const userDetailRoute = new ParametizedRoute(usersRoute, "/:user_id")
```


This basic example correspond to this tree:
```
---rootRoute
    ---indexRoute
    ---usersRoute
        ---userDetailRoute
```


All these methods are 100% typescript safe:

```
indexRoute.route()
usersRoute.route()

userDetailRoute.route({ userId: 'test-id' })
```