import { BaseRoute, ParametizedRoute, RootRoute } from "../../src";

const rootRoute = new RootRoute();

const indexRoute = new BaseRoute(rootRoute, "/");

const usersRoute = new BaseRoute(indexRoute, "/users");

const userDetailRoute = new ParametizedRoute(usersRoute, "/:userId", {
  searchSchema: (input: Record<string, unknown>) => ({
    query: input?.query as string,
    pageIndex: Number(input?.pageIndex) || 0,
  }),
});

// AppRouter.tsx
//--------------
// <Route path={usersDetailRoute.path()} exact>
//     <UserDetailPage />
// </Route>

// UserDetailPage.tsx
//-------------------
// import { useParams, useSearchParams } from "react-router-dom";
// import { usersDetailRoute } from "./routes";

// const UserDetailPage = () => {
//   const { userId } = useParams<typeof userDetailRoute['TParams']>();
//   const searchParams = useSearchParams<typeof userDetailRoute['TSearchSchemaReturn'][();
