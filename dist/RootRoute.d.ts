declare const ROOT_ROUTE: "";
export declare class RootRoute<TFullPath = typeof ROOT_ROUTE> {
    private basePath;
    path(): TFullPath;
    types: {
        FullPath: TFullPath;
    };
}
export {};
