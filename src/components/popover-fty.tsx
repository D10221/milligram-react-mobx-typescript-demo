import * as React from "react";
import { observer } from "mobx-react";

/**
 * @description PopOver factory
 * @returns {PopOver}
 */
export const PopOverFty = (isOpen: (id: string) => boolean) => observer(
    (props: React.HTMLProps<HTMLDivElement>) => {
        const open = isOpen(props.id);
        // console.log(`open: ${open}`);
        return (<div className={`popover ${open === true ? "popover-open" : ""}`} {...props} />);
    }
);