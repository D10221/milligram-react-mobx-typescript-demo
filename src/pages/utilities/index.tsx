import * as React from "react";
const code = require("raw-loader!./code.html");
import { Page as Generic } from "../page";

export const Page = () => (
    <Generic title="Utilities"
        code={code}
        description={<span>
            Milligram has some functional classes to improve the performance and productivity everyday.
        </span>} />
);