import * as React from "react";
import { observer } from "mobx-react";
import { AllStores } from "../stores/all-stores";

import {
    Container,
    Title5
} from "../elements/index";
export const Contributing = observer(
    (props: { stores: AllStores }) => {
        if (!props.stores) {
            throw new Error("Where are 'the stores'");
        }
        return (
            <Container id="contributing">
                <Title5>Contributing</Title5>
                <p>Want to contribute? Follow these
                    <a target="blank"
                        href="https://github.com/milligram/milligram/blob/master/.github/contributing.md"
                        title="Contributing">recommendations</a>.</p>
            </Container>
        );
    }
);