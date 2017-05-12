import * as React from "react";
import { observer } from "mobx-react";

// Popovers:
import { PopOverFty, } from "../../elements/popover";
import { PopOverItemLinkFty } from "../../elements/popover/popover-item-link-fty";

// Stores
import { AllStores } from "../../stores/all-stores";

export const DocumentationMenu = observer(
    // ...
    (props: { stores: AllStores, id?: string }) => {
        // ...
        const PopOver = PopOverFty(props.stores.popovers);
        const id = props.id || "documentation-menu";

        const toggleOpen = (id: string) => {
            return () => setTimeout(props.stores.popovers.toggleOpen(id), 0);
        };

        const MenuLink = PopOverItemLinkFty(id, toggleOpen);

        return (
            <PopOver id={id} >
                <ul  className="popover-list">
                    <MenuLink href="#/getting-started" title="Getting Started" />
                    <MenuLink href="#/typography" title="Typography" />
                    <MenuLink href="#/blockquotes" title="Blockquotes" />
                    <MenuLink href="#/buttons" title="Buttons" />
                    <MenuLink href="#/lists" title="Lists" />
                    <MenuLink href="#/forms" title="Forms" />
                    <MenuLink href="#/tables" title="Tables" />
                    <MenuLink href="#/grids" title="Grids" />
                    <MenuLink href="#/codes" title="Codes" />
                    <MenuLink href="#/utilities" title="Utilities" />
                    <MenuLink href="#/tips" title="Tips" />
                    <MenuLink href="#/browser-support" title="Browser Support" />
                    <MenuLink href="#/examples" title="Examples" />
                    <MenuLink href="#/contributing" title="Contributing" />
                </ul>
            </PopOver>
        );
    }
);