import * as React from "react";
import {code} from "./code";
import { Page as Generic } from "../page";

export const Page = () => (
    <Generic
        title="Codes"
        description={
            <span>
                The Code element represents a fragment of computer code. Just wrap anything in a
                <code>code</code> and it will appear like
this. if you need a block, by default, enter the <code>code</code> within the <code>pre</code>element.
            </span>
        }
        code={code}>
        <pre><code>{`
.milligram {
color: #9b4dca;
}
            `}</code></pre>
    </Generic>
);
