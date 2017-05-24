import * as path from "path";
import { root } from "../root";
import { getPackages } from "./get-packages";
import { tree } from "./packages-map";

export const localPackages = getPackages(path.resolve(root, "packages"));

tree(localPackages);
