import { AnyRoute } from "./AnyRoute";
import { ExtractPathParamsFromString, ParametizedPath } from "./type-utils";

export class ParametizedRoute<
  TPath extends string,
  TRoute extends AnyRoute,
  TFullPath extends string = `${TRoute["types"]["FullPath"]}${TPath}`,
  TParams extends string = ExtractPathParamsFromString<TFullPath>,
  TSearchSchema = never
> {
  private basePath: TPath;
  private baseRoute: TRoute;
  private validateSearchFn?: (arg: Record<string, unknown>) => TSearchSchema;

  constructor(
    route: TRoute,
    path: TRoute extends ParametizedRoute<any, any, any, any, any>
      ? TPath
      : ParametizedPath<TPath>,
    validateSearchFn?: (arg: Record<string, unknown>) => TSearchSchema
  ) {
    this.basePath = path;
    this.baseRoute = route;

    if (validateSearchFn) this.validateSearchFn = validateSearchFn;
  }

  path(): TFullPath {
    return `${this.baseRoute.path()}${this.basePath}` as any;
  }

  route(
    params: Record<TParams, string>,
    options?: { search?: Partial<TSearchSchema> }
  ): string {
    const { search } = options || {};

    let route = this.baseRoute.path() + this.basePath;

    if (search) route += `?${this.parseSearchObject(search)}`;

    if (!params) return route;

    Object.keys(params).forEach((key) => {
      const snakeCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

      route = route.replace(`:${snakeCaseKey}`, (params as any)?.[key as any]);
    });

    return route;
  }

  parseSearchString(searchString: string): TSearchSchema {
    const params = new URLSearchParams(searchString);

    return this.validateSearchFn!(Object.fromEntries(params.entries()));
  }

  parseSearchObject(searchObject: Partial<TSearchSchema>): string {
    const searchParams = new URLSearchParams();

    Object.entries(searchObject).forEach(([key, value]) => {
      searchParams.append(key, value as string);
    });

    return searchParams.toString();
  }

  types!: {
    Params: TParams;
    FullPath: TFullPath;
    SearchSchema: TSearchSchema;
  };
}
