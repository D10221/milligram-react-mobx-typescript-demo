const assert = require("assert");

describe("Storage", () =>
    it("Works", () => {
        const store = require("./built/store").Store("xyz");
        return store
            .clear()
            .then(store.set("a", 1)
            .then(
                    store.get("a").then(
                        value => {
                            assert.equal(value, 1);
                        }
                    )
            ));            
    }));