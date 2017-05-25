import { ArgsQuery } from "../args/query";
import { Package } from "../package/Package";
export interface TaskContext {
    taskName: string;    
    args: ArgsQuery;
    packageSelection: Package[];    
}
