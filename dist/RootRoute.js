"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRoute = void 0;
const ROOT_ROUTE = "";
class RootRoute {
    constructor() {
        this.basePath = ROOT_ROUTE;
    }
    path() {
        return this.basePath;
    }
}
exports.RootRoute = RootRoute;
