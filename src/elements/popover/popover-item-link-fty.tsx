import * as React from "react";

export const PopOverItemLinkFty = (menuId: string, toggleOpen: (menuId: string) => () => void) =>
    (props: { href: string, title: string, target?: string }) => {
        return (
            <li className="popover-item" >
                <a className="popover-link"
                    target={props.target}
                    href={props.href}
                    title={props.title}
                    onClick={toggleOpen(menuId)} >
                    {props.title}
                </a>
        </li>    
        );
};