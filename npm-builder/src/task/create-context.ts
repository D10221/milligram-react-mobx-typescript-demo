import { Package } from "../package/Package";
import { ArgsQuery } from "../args/query";
import { TaskContext } from "./TaskContext";
export const createContext = (
    taskName: string,
    args: ArgsQuery,
    packageSelection: Package[]): TaskContext => {
    // ...
    const enabled = args.hasFlag(taskName);
        
    return {
        taskName,
        enabled,
        args,
        packageSelection,        
    };
};