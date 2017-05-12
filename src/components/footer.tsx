import * as React from "react";
import { observer } from "mobx-react";
import { AllStores } from "../stores/all-stores";

import {
    Container,
    Footer as FooterElement,
} from "../elements/index";

export const Footer = observer((props: { stores: AllStores }) => {
    if (!props.stores) {
        throw new Error("Where are the stores?");
    }
    return (
        <FooterElement>
            <Container>
                <p>Designed with ♥ by
                        <a target="_blank" href="http://cjpatoilo.com" title="CJ Patoilo">CJ Patoilo</a>. Licensed
                    under the
                        <a target="_blank" href="https://github.com/milligram/milligram#license" title="MIT License">
                        MIT License</a>
                    .</p>
            </Container>
        </FooterElement>
    );
}
)