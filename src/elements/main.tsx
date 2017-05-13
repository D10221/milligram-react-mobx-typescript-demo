import * as React from "react";
import { observer } from "mobx-react";
export const Main = observer(
    (props: React.HTMLProps<HTMLElement>) => {
        return (
            <main className="wrapper" {...props}></main>
        );
    }
);