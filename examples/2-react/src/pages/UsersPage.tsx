import { Link } from "react-router-dom";
import { usersDetailRoute } from "../routes";

export const UsersPage = () => {
  return (
    <div>
      Users
      <br />
      <Link
        to={usersDetailRoute.route(
          { userId: "123" },
          {
            search: {
              query: "abc",
              page: 1,
            },
          }
        )}
      >
        User Detail(/users/123?query=test&page=1)
      </Link>
    </div>
  );
};
