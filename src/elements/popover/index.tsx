import * as React from "react";
import { observer } from "mobx-react";

import {PopoverStore} from "../../stores/popover-store";
export const PopOver = (popovers?: PopoverStore) => observer (
    (props: React.HTMLProps<HTMLDivElement>) => {
        const open = popovers.isOpen(props.id);
        // console.log(`open: ${open}`);
        return (<div className={`popover ${open === true ? "popover-open" : ""}`} {...props} />);
    }
);

export const PopOverList = (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="popover-list" {...props} />
);

export const PopOverItem = (props: React.HTMLProps<HTMLLIElement>) =>
    (<li className="popover-item" {...props} />);

export const PopOverLink = (props: React.HTMLProps<HTMLAnchorElement>) =>
    (<a className="popover-link" {...props} />);