import * as React from "react";
import { observer } from "mobx-react";

// Elements
import {
    Container,
    Blockquote
} from "../elements/index";

import { AllStores } from "../stores/all-stores";
export const Home = observer((props: { stores: AllStores }) => {
    const stores = props.stores;
    if (!stores) {
        throw new Error("where are the stores?");
    }
    return (
        <Container id="examples">
            <a data-align="center"
                target="blank"
                href="https://milligram.github.io">
                <img width="100%"
                    src="resources/thumbnail.png"
                    alt="Milligram - A minimalist CSS framework" />
            </a>
            <Blockquote>
                <p><em>A minimalist CSS framework.</em></p>
            </Blockquote>
        </Container >
    );
}
);