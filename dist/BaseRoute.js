"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoute = void 0;
class BaseRoute {
    constructor(route, path, validateSearchFn) {
        this.basePath = path;
        this.baseRoute = route;
        if (validateSearchFn)
            this.validateSearchFn = validateSearchFn;
    }
    path() {
        return `${this.baseRoute.path()}${this.basePath}`;
    }
    route(options) {
        const { search } = options || {};
        let route = this.baseRoute.path() + this.basePath;
        if (search)
            route += `?${this.parseSearchObject(search)}`;
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
exports.BaseRoute = BaseRoute;
