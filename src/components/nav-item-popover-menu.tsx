import * as React from "react";
import { observer } from "mobx-react";

// Elements:
import { PopOverFty,  } from "../elements/popover-fty";
import { PopOverList } from "../elements/popover-list";
import { PopOverItemLinkFty } from "../elements/popover-item-link-fty";

export interface NavItemPopoverMenuLink {
    href: string;
    title: string;
    target?: string;
}
export interface NavItemPopoverMenuProps {
    id: string;
    isOpen: (id: string) => boolean;
    toggleOpen: (id: string) => void;

    links: NavItemPopoverMenuLink[];
}

export const NavItemPopoverMenu = observer(
    // ...
    (props: NavItemPopoverMenuProps) => {
        // ...
        const PopOver = PopOverFty(props.isOpen);

        const PopOverItemLink = PopOverItemLinkFty(props.id, props.toggleOpen);

        return (
            <PopOver id={props.id} >
                <PopOverList>
                    {props.links.map((link, index) => (
                        <PopOverItemLink
                            key={`popover_item_link_${index}`}
                            href={link.href}
                            title={link.title}
                            target={link.target} />))}
                </PopOverList>
            </PopOver>
        );
    }
);