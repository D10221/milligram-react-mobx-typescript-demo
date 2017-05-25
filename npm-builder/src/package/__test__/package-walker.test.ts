import * as assert from "assert";
import * as path from "path";

import { getPackages } from "../get-packages";
import { Package } from "../Package";
import { Walker } from "../package-walker";

describe("Package Walker", () => {

    it("Works", () => {
        const packages = getPackages(
            path.join(process.env.NPM_BUILDER_TEST_ROOT, "packages")
        );

        const byName = (a: Package, b: Package): number => {
            return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
        };

        const walker =  Walker(packages.sort(byName), () => true);
        const result = walker.walk();
        assert.ok(result.ok);
        const list = result.completed.map(x => x.name).join(",");
        assert.equal(list, "milligrami,client,electron-json-storage-async,electron-window-state,main");
    });

    it("Stops", () => {

        const packages = getPackages(
            path.join(process.env.NPM_BUILDER_TEST_ROOT, "packages")
        );

        const byName = (a: Package, b: Package): number => {
            return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
        };

        let i = 0;
        const walker = Walker(packages.sort(byName), () => {
            return i++ < 1;
        });
        const result = walker.walk();
        assert.ok(!result.ok);
        const list = result.completed.map(x => x.name).join(",");
        assert.equal(list, "milligrami");
    });
});