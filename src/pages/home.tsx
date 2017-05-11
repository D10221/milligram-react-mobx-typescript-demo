import * as React from "react";
import { observer } from "mobx-react";

// Elements
import {
    Container,
    LinkItem,
    Title5
} from "../elements/index";
import { AllStores } from "../stores/all-stores";
export const Home = observer((props: { stores: AllStores }) => {
    const stores = props.stores;
    if (!stores) {
        throw new Error("where are the stores?");
    }
    return (
        <Container id="examples">
            <Title5>Examples</Title5>
            <p>You can view more examples of using Milligram.</p>
            <ul>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#getting-started"
                    title="Getting Started">Getting Started</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#typography"
                    title="Typography">Typography</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#blockquotes"
                    title="Blockquotes">Blockquotes</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#buttons"
                    title="Buttons">Buttons</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#lists"
                    title="Lists">Lists</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#forms"
                    title="Forms">Forms</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#tables"
                    title="Tables">Tables</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#grids"
                    title="Grids">Grids</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#codes"
                    title="Codes">Codes</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#utilities"
                    title="Utilities">Utilities</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#tips"
                    title="Tips">Tips</LinkItem>
                <LinkItem target="blank"
                    href="https://milligram.github.io/#browser-support"
                    title="Browser Support">Browser Support</LinkItem>
            </ul>
        </Container >
    );
}
);