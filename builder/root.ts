import * as path from "path";
import { getFlag } from "./flags";
export const root = path.resolve(process.cwd(), getFlag("--root") || process.cwd());
console.log(`root: ${root}`);