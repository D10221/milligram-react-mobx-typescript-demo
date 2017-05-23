import * as assert from "assert";
import { Query } from "../query";
describe("query", () => {
    it("works", () => {
        assert.ok(Query({ argv: ["--xyz"] }).hasFlag("xyz"));
    });
});