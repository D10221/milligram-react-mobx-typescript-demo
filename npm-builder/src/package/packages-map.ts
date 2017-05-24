import { Package } from "./Package";

const makeMap = (pkg: Package, localPackages: Package[]): ItemMap => {
    const dependencies = Object.keys(pkg.dependencies)
        .filter(depKey => localPackages.find(x => x.name === depKey))
        .map(key => localPackages.find(xx => xx.name === key))
        .map(d => localPackages.find(l => l.name === d.name));

    return {
        name: pkg.name,
        dependencies: dependencies.map(d => makeMap(d, localPackages))
    };
}
interface ItemMap {
    name: string;
    dependencies: ItemMap[]
}
export const packagesMap = (packages: Package[]): ItemMap[] => {
    return packages.map(p => makeMap(p, packages));
}

export const flatten = (localPackages: Package[]) => {
    let last: string;
    return packagesMap(localPackages)
        .map(x => x.dependencies).reduce((prev, next) => {
            return prev.concat(next)
        }, []).map(x=>x.name)
        .filter( (item)=> {            
            const ok = last !== item;
            last = item;
            return ok;
        });

}
// import * as util from "util";
//const isNull = util.isNullOrUndefined;

export const tree = (localPackages: Package[]) => {        
    const all = flatten(localPackages);
    console.log(all);
}