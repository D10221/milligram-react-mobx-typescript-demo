import * as React from "react";
import { observer } from "mobx-react";
import { AllStores } from "../stores/all-stores";

import { ContainerSection, } from "../elements/container-section";
import { Title5} from "../elements/headers";

/**
 * Generic TODO item
 */
export const Todo = observer(
    (props: { stores: AllStores, what: any }) => {
        if (!props.stores) {
            throw new Error("Where are 'the stores'");
        }
        const what = props.what;
        console.log(`page: todo: ${what}`);
        return (
            <ContainerSection id={`page_${what}`}>
                <Title5>{props.what}</Title5>
                <p>TODO ...</p>
            </ContainerSection>
        );
    }
);