import * as React from "react";
import { PopoverLink } from "milligrami/lib//popover-link";
import { PopoverListItem } from "milligrami/lib/popover-list-item";

export const PopOverItemLinkFty = (menuId: string, toggleOpen: (menuId: string) => void) =>
    (props: { href: string, title: string, target?: string }) => {
        return (
            <PopoverListItem >
                <PopoverLink
                    target={props.target}
                    href={props.href}
                    title={props.title}
                    onClick={() => toggleOpen(menuId)} >
                    {props.title}
                </PopoverLink>
            </PopoverListItem>
        );
    };