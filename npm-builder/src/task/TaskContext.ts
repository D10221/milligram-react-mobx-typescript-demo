import { ArgsQuery } from "../args/query";
import { Package } from "../package/Package";
export interface TaskContext {
    taskName: string;
    enabled: boolean;    
    args: ArgsQuery;
    packageSelection: Package[];    
}
