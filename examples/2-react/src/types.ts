import * as ROUTES from "./routes";

const POSSIBLE_PATHS = Object.values(ROUTES);

export type RoutePath = Exclude<
  (typeof POSSIBLE_PATHS)[number]["types"]["FullPath"],
  ""
>;

// You could type your own Link component, or useNavigate hook:

// 1. "/"
// 2. "/users"
// 3. "/users/:userId"
