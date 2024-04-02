import { CommonRoute } from "./CommonRoute";
import { RootRoute } from "./RootRoute";
import { BasePath } from "./type-utils";

export class BaseRoute<
  TPath extends string,
  TRoute extends RootRoute | BaseRoute<any, any, any, any>,
  TFullPath extends string = `${TRoute["types"]["FullPath"]}${TPath}`,
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
    path: BasePath<TPath>,
    options?: { searchSchema?: TSearchSchema }
  ) {
    super(route, path, options);
  }

  route(options?: { search?: Partial<TSearchSchemaReturn> }): string {
    const { search } = options || {};

    let route = this.baseRoute.path() + this.basePath;

    if (search) route += `?${this.parseSearchObject(search)}`;

    return route;
  }

  types!: {
    FullPath: TFullPath;
    SearchSchema: TSearchSchema;
    SearchSchemaReturn: TSearchSchemaReturn;
  };
}
