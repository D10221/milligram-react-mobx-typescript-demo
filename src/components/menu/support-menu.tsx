import * as React from "react";
import { observer } from "mobx-react";

// Popovers:
import {
    PopOverFty as PopOverFty,
    PopOverList,
    PopOverItem,
    PopOverLink,
} from "../../elements/popover";

import { AllStores } from "../../stores/all-stores";

export const SupportMenu = observer(
    // ...
    (props: { stores: AllStores, id?: string }) => {
        const PopOver = PopOverFty(props.stores.popovers);
        // ...
        return (
            <PopOver id={props.id || "support-menu"} >
                <PopOverList>
                    <PopOverItem>
                        <PopOverLink target="blank" href="https://github.com/milligram/milligram" title="On Github">
                            On Github
                            </PopOverLink>
                    </PopOverItem>
                    <PopOverItem>
                        <PopOverLink target="blank" href="https://codepen.io/milligramcss" title="On Codepen">
                            On Codepen
                            </PopOverLink>
                    </PopOverItem>
                    <PopOverItem>
                        <PopOverLink target="blank" href="https://facebook.com/milligramcss" title="On Facebook">
                            On Facebook
                        </PopOverLink>
                    </PopOverItem>
                    <PopOverItem>
                        <PopOverLink target="blank" href="https://twitter.com/milligramcss" title="On Twitter">
                            On Twitter
                        </PopOverLink>
                    </PopOverItem>
                    <PopOverItem>
                        <PopOverLink target="blank" href="https://github.com/milligram/milligram/issues/new"
                            title="Need help?">
                            Need help?
                        </PopOverLink>
                    </PopOverItem>
                    <PopOverItem>
                        <PopOverLink target="blank" href="https://github.com/milligram/milligram#license"
                            title="License">
                            License
                        </PopOverLink>
                    </PopOverItem>
                    <PopOverItem>
                        <PopOverLink target="blank" href="https://github.com/milligram/milligram/releases"
                            title="Versions">
                            Versions
                        </PopOverLink>
                    </PopOverItem>
                </PopOverList>
            </PopOver>
        );
    }
);