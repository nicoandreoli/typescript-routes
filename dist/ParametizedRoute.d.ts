import { AnyRoute } from "./AnyRoute";
import { ExtractPathParamsFromString, ParametizedPath } from "./type-utils";
export declare class ParametizedRoute<TPath extends string, TRoute extends AnyRoute, TFullPath extends string = `${TRoute["types"]["FullPath"]}${TPath}`, TParams extends string = ExtractPathParamsFromString<TFullPath>, TSearchSchema = never> {
    private basePath;
    private baseRoute;
    private validateSearchFn?;
    constructor(route: TRoute, path: TRoute extends ParametizedRoute<any, any, any, any, any> ? TPath : ParametizedPath<TPath>, validateSearchFn?: (arg: Record<string, unknown>) => TSearchSchema);
    path(): TFullPath;
    route(params: Record<TParams, string>, options?: {
        search?: Partial<TSearchSchema>;
    }): string;
    parseSearchString(searchString: string): TSearchSchema;
    parseSearchObject(searchObject: Partial<TSearchSchema>): string;
    types: {
        Params: TParams;
        FullPath: TFullPath;
        SearchSchema: TSearchSchema;
    };
}
