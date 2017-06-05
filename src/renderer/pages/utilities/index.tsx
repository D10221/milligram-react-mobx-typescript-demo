import * as React from "react";
import {code} from "./code";
import { Page as Generic } from "../page";

export const Page = () => (
    <Generic title="Utilities"
        code={code}
        description={<span>
            Milligram has some functional classes to improve the performance and productivity everyday.
        </span>} />
);