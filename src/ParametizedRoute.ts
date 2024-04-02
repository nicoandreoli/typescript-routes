import { AnyRoute } from "./AnyRoute";
import { CommonRoute } from "./CommonRoute";
import { ExtractPathParamsFromString, ParametizedPath } from "./type-utils";

export class ParametizedRoute<
  TPath extends string,
  TRoute extends AnyRoute,
  TFullPath extends string = `${TRoute["types"]["FullPath"]}${TPath}`,
  TParams extends string = ExtractPathParamsFromString<TFullPath>,
  TSearchSchema extends (
    args: Record<string, unknown>
  ) => Record<string, unknown> = never,
  TSearchSchemaReturn = ReturnType<TSearchSchema>
> extends CommonRoute<
  TPath,
  TRoute,
  TFullPath,
  TSearchSchema,
  TSearchSchemaReturn
> {
  constructor(
    route: TRoute,
    path: TRoute extends ParametizedRoute<any, any, any, any, any>
      ? TPath
      : ParametizedPath<TPath>,
    options?: {
      searchSchema?: TSearchSchema;
    }
  ) {
    super(route, path, options);
  }

  route(
    params: Record<TParams, string>,
    options?: { search?: Partial<TSearchSchemaReturn> }
  ): string {
    const { search } = options || {};

    let route = this.baseRoute.path() + this.basePath;

    if (search) route += `?${this.parseSearchObject(search)}`;

    if (!params) return route;

    Object.keys(params).forEach((key) => {
      route = route.replace(`:${key}`, (params as any)?.[key as any]);
    });

    return route;
  }

  types!: {
    Params: TParams;
    FullPath: TFullPath;
    SearchSchema: TSearchSchema;
    SearchSchemaReturn: TSearchSchemaReturn;
  };
}
