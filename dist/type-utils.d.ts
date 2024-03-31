export type BasePath<T extends string> = T extends `${string}:${string}` ? never : T;
export type ParametizedPath<T extends string> = T extends `${string}:${string}` ? T : never;
export type ExtractPathParamsFromString<T extends string> = T extends `${string}:${infer Param}/${infer Rest}` ? Param | ExtractPathParamsFromString<Rest> : T extends `${string}:${infer Param}` ? Param : never;
