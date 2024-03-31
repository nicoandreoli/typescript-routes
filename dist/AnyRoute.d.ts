import { BaseRoute } from "./BaseRoute";
import { ParametizedRoute } from "./ParametizedRoute";
import { RootRoute } from "./RootRoute";
export type AnyRoute = RootRoute | BaseRoute<any, any, any, any> | ParametizedRoute<any, any, any, any, any>;
