import { ArgsQuery } from "../args/query";
import { Package } from "../package/Package";
export interface TaskContext {
    enabled: boolean;
    isSelectedForPackage: (p: Package) => boolean;
    args: ArgsQuery;
    packageSelection: Package[];
    isDependency: (p:Package) =>  boolean;
}
