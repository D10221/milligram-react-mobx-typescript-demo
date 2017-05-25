import { Package } from "../package/Package";
export interface TaskContext {
    taskName: string;
    packageSelection: Package[];
    packages: Package[];
    tasks: string[];
    filterList: string[];
}
