import { contextQuery } from "../context-query";
import { TaskContext } from "../TaskContext";
import { Package } from "../../package/Package";
import * as assert from "assert";
import { isNull } from "util";

describe("context query", () => {
    it("finds", () => {
        const packages: Package[] = [
            { name: "a", dependencies: { c: "" }, version: "0.0.0" },
            { name: "b", dependencies: { c: "" } },
            { name: "c", dependencies: { b: "" } }];
        const packageSelection = packages.slice(1, 2);
        const packageFilterList = ["b"];
        const tasks = ["xtest"];
        const ctx: TaskContext = {
            packages,
            packageSelection,
            taskName: "testTask",
            packageFilterList,
            tasks
        };
        const query = contextQuery(ctx);

        assert.equal(query.findPackageByName("a").version, "0.0.0");
        assert.ok(!isNull(query.findInPackageSelectionByName("a")));
        assert.ok(!isNull(query.findInFilterList(packages[1])));
    });
    it("?", () => {
        const packages = [{ name: "x" }];
        const ctx: TaskContext = {
            packages,
            packageSelection: packages,
            taskName: "x",
            packageFilterList: [], // any
            tasks: ["x"]
        };
        const query = contextQuery(ctx);
        assert.ok(query.isEnabled());
        assert.ok(!query.isDependency(packages[0]));
        assert.ok(query.isTaskSelectedForPackage(packages[0]));
    });
    it("??", () => {

        const q = contextQuery({
            packages: [{ name: "x" }, { name: "b", dependencies: {} }],
            packageSelection: [{ name: "x" }],
            taskName: "x",
            packageFilterList: [], // any
            tasks: ["t"]
        });
        assert.ok(!q.isEnabled());
        assert.ok(q.isDependency({ name: "x" }));
        assert.ok(!q.isTaskSelectedForPackage({ name: "x" }));
        assert.ok(q.ignoreDependency());
    });
    it("throws no task found", () => {
        assert.throws(() => contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "",
            packageFilterList: [],
            tasks: []
        }));
    });
    it("throws bad taskname", () => {
        assert.throws(() => contextQuery({
            packages: [],
            packageSelection: [],
            taskName: "",
            packageFilterList: [],
            tasks: ["x"]
        }));
    });
    it("!ignoreDependency", () => {
        const q = contextQuery({
            packages: [{ name: "x" }, { name: "b", dependencies: { x: "x" } }],
            packageSelection: [{ name: "x" }],
            taskName: "x",
            packageFilterList: ["+"], // any + deps
            tasks: ["t"]
        });
        assert.ok(!q.ignoreDependency());
    });
    it("!ignoreDependency x", () => {
        const q = contextQuery({
            packages: [{ name: "x" }, { name: "b", dependencies: { x: "x" } }],
            packageSelection: [{ name: "x" }],
            taskName: "x",
            packageFilterList: ["x", "+"], // any + deps
            tasks: ["t"]
        });
        assert.ok(!q.ignoreDependency() && q.isTaskSelectedForPackage({ name: "x" }));
    });
});