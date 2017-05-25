import { Package } from "../package/Package";

export interface ContextQuery {
    isSelectedForPackage(pkg?: Package): boolean;
    isDependency(pkg?: Package): boolean;
    taskEnabledsDesc(pkg?: Package): string;
    isEnabled(pkg?: Package): boolean;
    ignoreDependencies(pkg?: Package): boolean;
}