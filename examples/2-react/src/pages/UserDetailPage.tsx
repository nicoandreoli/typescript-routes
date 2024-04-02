import { usersDetailRoute } from "../routes";
import { useRoute } from "../useRoute";

export const UserDetailPage = () => {
  const { params, search } = useRoute(usersDetailRoute);

  console.log(params, search);

  return (
    <div>
      User {params.userId}: {search.page}, {search.query}
    </div>
  );
};
