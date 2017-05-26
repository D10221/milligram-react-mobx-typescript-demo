import { contextQuery } from "../context-query";
import * as assert from "assert";
import { isNull } from "util";

describe("context query", () => {
    it("finds", () => {

        const query = contextQuery(
            {
                // all packages
                packages: [
                    { name: "a", dependencies: { c: "" }, version: "0.0.0" },
                    { name: "b", dependencies: { c: "" } },
                    { name: "c", dependencies: { b: "" } }],
                // selcted packages: any if !length
                packageSelection: [{ name: "a" }, { name: "b" }],
                // required
                taskName: "t",
                // task package filter
                taskPackageFilter: ["b"],
                tasks: ["t"]
            }
        );
        assert.equal(query.findPackageByName("a").version, "0.0.0");
        assert.ok(!isNull(query.findInPackageSelectionByName("a")));
        assert.ok(!isNull(query.findInFilterList({ name: "b" })));
    });
    it("?", () => {
        const query = contextQuery({
            packages: [{ name: "x" }],
            packageSelection: [{ name: "x" }],
            taskName: "x",
            taskPackageFilter: [], // any
            tasks: ["x"]
        });
        assert.ok(query.isEnabled());
        assert.ok(!query.isDependency([{ name: "x" }]));
        assert.ok(query.isTaskSelectedForPackage({ name: "x" }));
    });
    it("??", () => {

        const q = contextQuery({
            packages: [{ name: "a" }, { name: "b", dependencies: { x: "1" } }],
            packageSelection: [], // any
            taskName: "t2",
            taskPackageFilter: [], // any
            tasks: ["t", "t1"]
        });
        assert.ok(!q.isEnabled());
        assert.ok(q.isDependency({ name: "x" }));
        assert.ok(!q.isTaskSelectedForPackage({ name: "x" }));
        assert.ok(q.ignoreDependency());
    });
    it("throws no package not found in packages", () => {
        assert.throws(() => contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "t",
            taskPackageFilter: ["x"],
            tasks: ["t"]
        }));
    });
    it("throws no task found", () => {
        assert.throws(() => contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "",
            taskPackageFilter: [],
            tasks: []
        }));
    });
    it("throws bad taskname", () => {
        assert.throws(() => contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "",
            taskPackageFilter: [],
            tasks: ["x"]
        }));
    });
    it("!ignoreDependency", () => {
        const q = contextQuery({
            packages: [{ name: "x" }, { name: "b", dependencies: { x: "x" } }],
            packageSelection: [{ name: "x" }],
            taskName: "x",
            taskPackageFilter: ["+"], // any + deps
            tasks: ["t"]
        });
        assert.ok(!q.ignoreDependency());
    });
    it("!ignoreDependency x", () => {
        const q = contextQuery({
            packages: [{ name: "x" }, { name: "b", dependencies: { x: "x" } }],
            packageSelection: [{ name: "x" }],
            taskName: "x",
            taskPackageFilter: ["x", "+"], // any + deps
            tasks: ["t"]
        });
        assert.ok(!q.ignoreDependency() && q.isTaskSelectedForPackage({ name: "x" }));
    });
});