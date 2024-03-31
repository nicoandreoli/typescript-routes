"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametizedRoute = void 0;
class ParametizedRoute {
    constructor(route, path, validateSearchFn) {
        this.basePath = path;
        this.baseRoute = route;
        if (validateSearchFn)
            this.validateSearchFn = validateSearchFn;
    }
    path() {
        return `${this.baseRoute.path()}${this.basePath}`;
    }
    route(params, options) {
        const { search } = options || {};
        let route = this.baseRoute.path() + this.basePath;
        if (search)
            route += `?${this.parseSearchObject(search)}`;
        if (!params)
            return route;
        Object.keys(params).forEach((key) => {
            const snakeCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            route = route.replace(`:${snakeCaseKey}`, params === null || params === void 0 ? void 0 : params[key]);
        });
        return route;
    }
    parseSearchString(searchString) {
        const params = new URLSearchParams(searchString);
        return this.validateSearchFn(Object.fromEntries(params.entries()));
    }
    parseSearchObject(searchObject) {
        const searchParams = new URLSearchParams();
        Object.entries(searchObject).forEach(([key, value]) => {
            searchParams.append(key, value);
        });
        return searchParams.toString();
    }
}
exports.ParametizedRoute = ParametizedRoute;
