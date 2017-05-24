import * as util from "util";
import { Package } from "./Package";
const isNull = util.isNullOrUndefined;
export const walker = (pkgs: Package[]) => {
    const localNames = pkgs.map(x => x.name);
    const isLocal = (name: string) => localNames.indexOf(name) !== -1;
    const built: Package[] = [];
    const getPackage = (name: string) => pkgs.find(x => x.name === name);
    const isBuilt = (pkg: Package) => built.map(x => x.name).indexOf(pkg.name) !== -1;
    const walk = (pkg: Package) => {
        if (isNull(pkg) || isBuilt(pkg)) return;
        const deps = Object.keys(pkg.dependencies).filter(isLocal);
        for (const dep of deps) {
            walk(getPackage(dep));
        }
        built.push(pkg);
    };
    const build = () => {
        for (const pkg of pkgs) {
            walk(pkg);
        }
        return built;
    };
    return { build };
};