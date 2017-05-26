import { TaskContext } from "./TaskContext";
import { isNullOrUndefined as isNull } from "util";
import { Package } from "../package/Package";

const _switch = /^(?:\$|\+).*/;
export const contextQuery = (context: TaskContext) => {
    if (isNull(context.taskName) || context.taskName.trim() === "") {
        throw new Error("Bad Task Name");
    }
    if (!context.tasks.length || context.tasks.reduce((a, b) => a + b).trim() === "") {
        throw new Error("No Task Found");
    }
    const findPackageByName = (name: string) => {
        return context.packages.find(p => p.name === name);
    };
    const findInPackageSelectionByName = (name: string) => {
        return context.packageSelection.find(p => p.name === name);
    };

    const filterList = context.taskPackageFilter.filter(x => !_switch.test(x));
    const switches = context.taskPackageFilter.filter(x => _switch.test(x));
    const anyPackage = !filterList.length;

    if (!anyPackage) {
        {
            // Package Not Found
            const wrong = filterList.find(x => isNull(findPackageByName(x)));
            if (!isNull(wrong)) {
                throw new Error(
                    `Package: '${wrong}' from` +
                    ` in selection filter list: [${filterList.map(xx => `'${xx}'`).join(", ")}]` +
                    ` for task: '${context.taskName}'` +
                    ` Not found in local packages`);
            }
        }

        if (context.packageSelection.length) {
            // Pckage Not fund in Selection
            const wrong = filterList.find(x => isNull(findInPackageSelectionByName(x)));
            if (!isNull(wrong)) {
                throw new Error(
                    ` Package: '${wrong}'` +
                    ` in selection filter list: [${filterList.map(xx => `'${xx}'`).join(", ")}]` +
                    ` for task: '${context.taskName}'` +
                    ` not found in selection filter`);
            }
        }
    }

    const isEnabled = () => {
        return context.tasks.indexOf(context.taskName) !== -1;
    };

    const findInFilterList = (pkg: Package) => {
        return filterList.find(x => x === pkg.name);
    };

    const isTaskSelectedForPackage = (pkg: Package) => {
        if (isDependency(pkg)) {
            return !ignoreDependency(); // || !isNull(findInFilterList(pkg));
        }
        return anyPackage || !isNull(findInFilterList(pkg));
    };

    const isDependency = (pkg: Package) => {
        return !isNull(
            context.packageSelection
                .map(x => Object.keys(x.dependencies || {})).reduce((c, n) => {
                    return c.concat(n);
                })
                .find(x => x === pkg.name)
        );
    };

    const taskEnabledsDesc = () => {
        return `${context.taskName}: ${anyPackage ? "any" : filterList.join(",")}` +
            `${ignoreDependency() ? "" : " + deps"}`;
    };

    const ignoreDependency = () => {
        return switches.length > 0 && switches.indexOf("+") === -1;
    };

    return {
        isEnabled,
        isTaskSelectedForPackage,
        isDependency,
        taskEnabledsDesc,
        ignoreDependency,
        findPackageByName,
        findInPackageSelectionByName,
        findInFilterList,
    };
};