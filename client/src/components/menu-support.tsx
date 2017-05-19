import * as React from "react";
import { observer } from "mobx-react";

// Styled elements
import { PopOverList, } from "../elements/popover-list";
import { PopOverFty as PopOverFty, } from "./popover-fty";

import { PopOverItemLinkFty } from "./popover-item-link-fty";

export const SupportMenu = observer(
    // ...
    (props: { id: string, isOpen: (id: string) => boolean, toggleOpen: (id: string) => void }) => {

        const PopOver = PopOverFty(props.isOpen);
        // ...
        const PopOverItemLink = PopOverItemLinkFty(props.id, props.toggleOpen);

        return (
            <PopOver id={props.id || "support-menu"} >
                <PopOverList>
                    <PopOverItemLink
                        target="blank"
                        href="https://github.com/milligram/milligram"
                        title="On Github" />
                    <PopOverItemLink
                        target="blank"
                        href="https://codepen.io/milligramcss"
                        title="On Codepen" />
                    <PopOverItemLink
                        target="blank"
                        href="https://facebook.com/milligramcss"
                        title="On Facebook" />
                    <PopOverItemLink
                        target="blank"
                        href="https://twitter.com/milligramcss"
                        title="On Twitter" />
                    <PopOverItemLink
                        target="blank"
                        href="https://github.com/milligram/milligram/issues/new"
                        title="Need help?" />
                    <PopOverItemLink
                        target="blank"
                        href="https://github.com/milligram/milligram#license"
                        title="License" />
                    <PopOverItemLink
                        target="blank"
                        href="https://github.com/milligram/milligram/releases"
                        title="Versions" />
                </PopOverList>
            </PopOver>
        );
    }
);