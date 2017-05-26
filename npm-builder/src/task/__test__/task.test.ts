// import { contextQuery } from "../context-query";
// import { TaskContext } from "../TaskContext";
// import { Package } from "../../package/Package";
import * as assert from "assert";
// import { isNull } from "util";
import { createTask } from "../index";

describe("task", () => {
    it("disabled", () => {
        const returnValue = { code: 0 };
        const exec = (_: any) => returnValue;
        const task = createTask({
            packages: [],
            packageSelection: [],
            taskName: "x",
            packageFilterList: [], // any + deps
            tasks: []
        }, exec);
        assert.deepEqual(task.run({ name: "x" }).state, { state: "disabled" }.state);
    });
    it("completed", () => {
        const returnValue = { code: 0 };
        const exec = (_: any) => returnValue;
        const task = createTask({
            packages: [{ name: "x" }, { name: "b", dependencies: { x: "x" } }],
            packageSelection: [{ name: "x" }],
            taskName: "t",
            packageFilterList: ["x", "+"], // any + deps
            tasks: ["t"]
        }, exec);
        assert.equal(task.run({ name: "x" }).state, "completed");
    });
});