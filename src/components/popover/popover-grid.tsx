import * as React from "react";
import { observer } from "mobx-react";

// Popovers:
import {
    PopOverFty,
    PopOverList,
    PopOverItem,
    PopOverLink,
} from "../../elements/popover";

import { AllStores } from "../../stores/all-stores";

export const PopoverGrid = observer(
    // ...
    (props: { stores: AllStores }) => {
        // ...
        const PopOver = PopOverFty(props.stores.popovers);
        return (
            <PopOver id="popover-grid" >
                <PopOverList>
                    <PopOverItem>
                        <PopOverLink
                            href="#getting-started"
                            title="Getting Started">
                            Getting Started
                                </PopOverLink>
                        <PopOverLink href="#typography" title="Typography">Typography</PopOverLink>
                        <PopOverLink href="#blockquotes" title="Blockquotes">Blockquotes</PopOverLink>
                        <PopOverLink href="#buttons" title="Buttons">Buttons</PopOverLink>
                        <PopOverLink href="#lists" title="Lists">Lists</PopOverLink>
                        <PopOverLink href="#forms" title="Forms">Forms</PopOverLink>
                        <PopOverLink href="#tables" title="Tables">Tables</PopOverLink>
                        <PopOverLink href="#grids" title="Grids">Grids</PopOverLink>
                        <PopOverLink href="#codes" title="Codes">Codes</PopOverLink>
                        <PopOverLink href="#utilities" title="Utilities">Utilities</PopOverLink>
                        <PopOverLink href="#tips" title="Tips">Tips</PopOverLink>
                        <PopOverLink href="#browser-support"
                            title="Browser Support">Browser Support</PopOverLink>
                        <PopOverLink href="#examples" title="Examples">Examples</PopOverLink>
                        <PopOverLink href="#contributing"
                            title="Contributing">Contributing</PopOverLink>
                    </PopOverItem>
                </PopOverList>
            </PopOver>
        );
    }
);