import * as React from "react";
import { Page as Generic } from "../page";

export const Page = () => {
    return (<Generic
        title="Blockquotes"
        description="The Blockquote represents a section that is quoted from another source"
        content={(<blockquote>
            <p><em>Yeah!! Milligram is amazing.</em></p>
        </blockquote>)}
        code={`
<blockquote>
    <p><em>Yeah!! Milligram is amazing.</em></p>
</blockquote>
        `}
    />);
};