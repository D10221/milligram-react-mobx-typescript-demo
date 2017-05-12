import * as React from "react";
import { observer } from "mobx-react";

// Popovers:
import {
    PopOverFty as PopOverFty,
} from "../../elements/popover";
import { PopOverItemLinkFty } from "../../elements/popover/popover-item-link-fty";

import { AllStores } from "../../stores/all-stores";

export const SupportMenu = observer(
    // ...
    (props: { stores: AllStores, id?: string }) => {
        
        const PopOver = PopOverFty(props.stores.popovers);
        // ...
        const toggleOpen = (id: string) => {
            return () => setTimeout(props.stores.popovers.toggleOpen(id), 0);
        };

        const MenuLink = PopOverItemLinkFty(props.id, toggleOpen);

        return (
            <PopOver id={props.id || "support-menu"} >
                <ul className="popover-list">
                    <MenuLink 
                        target="blank" 
                        href="https://github.com/milligram/milligram" 
                        title="On Github" />
                    <MenuLink target="blank" href="https://codepen.io/milligramcss" title="On Codepen" />
                    <MenuLink target="blank" href="https://facebook.com/milligramcss" title="On Facebook" />
                    <MenuLink target="blank" href="https://twitter.com/milligramcss" title="On Twitter" />
                    <MenuLink target="blank" href="https://github.com/milligram/milligram/issues/new"
                        title="Need help?" />
                    <MenuLink target="blank" href="https://github.com/milligram/milligram#license"
                        title="License" />
                    <MenuLink target="blank" href="https://github.com/milligram/milligram/releases"
                        title="Versions" />
                </ul>
            </PopOver>
        );
    }
);