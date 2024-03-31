import { RootRoute } from "./RootRoute";
import { BasePath } from "./type-utils";
export declare class BaseRoute<TPath extends string, TRoute extends RootRoute | BaseRoute<any, any, any, any>, TFullPath extends string = `${TRoute["types"]["FullPath"]}${TPath}`, TSearchSchema = never> {
    private basePath;
    private baseRoute;
    private validateSearchFn?;
    constructor(route: TRoute, path: BasePath<TPath>, validateSearchFn?: (arg: Record<string, unknown>) => TSearchSchema);
    path(): TFullPath;
    route(options?: {
        search?: Partial<TSearchSchema>;
    }): string;
    parseSearchString(searchString: string): TSearchSchema;
    parseSearchObject(searchObject: Partial<TSearchSchema>): string;
    types: {
        FullPath: TFullPath;
        SearchSchema: TSearchSchema;
    };
}
