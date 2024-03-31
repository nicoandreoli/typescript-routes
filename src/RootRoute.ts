const ROOT_ROUTE = "" as const;

export class RootRoute<TFullPath = typeof ROOT_ROUTE> {
  private basePath = ROOT_ROUTE;

  path(): TFullPath {
    return this.basePath as any;
  }

  types!: {
    FullPath: TFullPath;
  };
}
