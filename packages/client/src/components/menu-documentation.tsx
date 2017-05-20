import * as React from "react";
import { observer } from "mobx-react";

import { NavItemPopoverMenu, NavItemPopoverMenuProps } from "./nav-item-popover-menu";
export const DocMenu = observer(
    (props: NavItemPopoverMenuProps) => {
        const links = [
            { href: "#/getting-started", title: "Getting Started" },
            { href: "#/typography", title: "Typography" },
            { href: "#/blockquotes", title: "Blockquotes" },
            { href: "#/buttons", title: "Buttons" },
            { href: "#/lists", title: "Lists" },
            { href: "#/forms", title: "Forms" },
            { href: "#/tables", title: "Tables" },
            { href: "#/grids", title: "Grids" },
            { href: "#/codes", title: "Codes" },
            { href: "#/utilities", title: "Utilities" },
            { href: "#/tips", title: "Tips" },
            { href: "#/browser-support", title: "Browser Support" },
            { href: "#/examples", title: "Examples" },
            { href: "#/contributing", title: "Contributing" },
        ];
        return (
            <NavItemPopoverMenu
                id={props.id}
                toggleOpen={props.toggleOpen}
                isOpen={props.isOpen}
                links={links}
            />
        );
    }
);