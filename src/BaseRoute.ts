import { RootRoute } from "./RootRoute";
import { BasePath } from "./type-utils";

export class BaseRoute<
  TPath extends string,
  TRoute extends RootRoute | BaseRoute<any, any, any, any>,
  TFullPath extends string = `${TRoute["types"]["FullPath"]}${TPath}`,
  TSearchSchema = never
> {
  private basePath: TPath;
  private baseRoute: TRoute;
  private validateSearchFn?: (arg: Record<string, unknown>) => TSearchSchema;

  constructor(
    route: TRoute,
    path: BasePath<TPath>,
    validateSearchFn?: (arg: Record<string, unknown>) => TSearchSchema
  ) {
    this.basePath = path;
    this.baseRoute = route;

    if (validateSearchFn) this.validateSearchFn = validateSearchFn;
  }

  path(): TFullPath {
    return `${this.baseRoute.path()}${this.basePath}` as any;
  }

  route(options?: { search?: Partial<TSearchSchema> }): string {
    const { search } = options || {};

    let route = this.baseRoute.path() + this.basePath;

    if (search) route += `?${this.parseSearchObject(search)}`;

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
    FullPath: TFullPath;
    SearchSchema: TSearchSchema;
  };
}
