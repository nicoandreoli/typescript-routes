/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRoute, ParametizedRoute } from "typescript-routes";

import {
  useParams as useReactRouterParams,
  useSearchParams as useReactRouterSearchParams,
} from "react-router-dom";

export const useRoute = <
  TRoute extends
    | BaseRoute<any, any, any, any, any>
    | ParametizedRoute<any, any, any, any, any, any>
>(
  route: TRoute
) => {
  const params =
    useReactRouterParams<
      TRoute extends ParametizedRoute<any, any, any, any, any, any>
        ? TRoute["types"]["Params"]
        : never
    >();

  const [search] = useReactRouterSearchParams();

  return {
    params,
    search: route.parseSearchString(
      search.toString()
    ) as TRoute["types"]["SearchSchemaReturn"],
  };
};
