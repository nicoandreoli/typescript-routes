import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { indexRoute, usersDetailRoute, usersRoute } from "./routes";
import { UsersPage, UserDetailPage } from "./pages";

const router = createBrowserRouter([
  {
    path: indexRoute.path(),
    element: <div>Home</div>,
  },
  {
    path: usersRoute.path(),
    children: [
      {
        path: usersRoute.path(),
        element: <UsersPage />,
      },
      {
        path: usersDetailRoute.path(),
        element: <UserDetailPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <a href={indexRoute.route()}>Home</a>
        <a href={usersRoute.route()}>Users</a>
      </div>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
