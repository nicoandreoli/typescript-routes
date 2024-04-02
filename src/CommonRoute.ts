import { AnyRoute } from "./AnyRoute";

export class CommonRoute<
  TPath extends string,
  TRoute extends AnyRoute,
  TFullPath extends string = `${TRoute["types"]["FullPath"]}${TPath}`,
  TSearchSchema extends (
    args: Record<string, unknown>
  ) => Record<string, unknown> = never,
  TSearchSchemaReturn = ReturnType<TSearchSchema>
> {
  protected basePath: TPath;
  protected baseRoute: TRoute;
  protected searchSchema?: TSearchSchema;

  constructor(
    route: TRoute,
    path: TPath,
    options?: { searchSchema?: TSearchSchema }
  ) {
    const { searchSchema } = options || {};

    this.basePath = path;
    this.baseRoute = route;
    this.searchSchema = searchSchema;
  }

  path(): TFullPath {
    return `${this.baseRoute.path()}${this.basePath}` as any;
  }

  parseSearchString(searchString: string): TSearchSchemaReturn {
    if (!this.searchSchema) return {} as any;

    const params = new URLSearchParams(searchString);

    return this.searchSchema(Object.fromEntries(params.entries())) as any;
  }

  parseSearchObject(searchObject: Partial<TSearchSchemaReturn>): string {
    const searchParams = new URLSearchParams(searchObject as any);

    return searchParams.toString();
  }
}
