import * as React from "react";
import { observer } from "mobx-react";

import { PopoverStore } from "../../stores/popover-store";

/**
 * @description PopOver factory
 * @returns {PopOver}
 */
export const PopOverFty = (popovers?: PopoverStore) => observer(
    (props: React.HTMLProps<HTMLDivElement>) => {
        const open = popovers.isOpen(props.id);
        // console.log(`open: ${open}`);
        return (<div className={`popover ${open === true ? "popover-open" : ""}`} {...props} />);
    }
);
