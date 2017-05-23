
import * as fs from "fs";
import * as path from "path";

import { BuildConfig } from "./interfaces";
import { ArgsQuery } from "../args/query";

const cleanComments = (input: string) => {
    return input.replace(/\/\/\s+?.*/mg, "");
};

export const getConfig = (args: ArgsQuery, root: string): BuildConfig => JSON.parse(
    cleanComments(
        fs.readFileSync(
            path.join(root, args.getFlagAsString("config", "build.config.json")),
            "utf-8"
        )
    )
);