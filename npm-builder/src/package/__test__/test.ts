import * as assert from "assert";
import * as path from "path";

import { getPackages } from "../get-packages";
import { Package } from "../Package";
import { walker } from "../package-walker";

describe("Package Walker", () => {

    it("Works", () => {
        const packages = getPackages(
            path.join(process.env.NPM_BUILDER_TEST_ROOT, "packages")
        );

        const byName = (a: Package, b: Package): number => {
            return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
        };

        const r = walker(packages.sort(byName))
            .build()
            .map(x => x.name)
            .join(",");

        assert.equal(r, "milligrami,client,electron-json-storage-async,electron-window-state,main");
    });
});