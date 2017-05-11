import * as React from "react";
import { observer } from "mobx-react";

import {
    Container,
    Footer,
    LinkItem,
    Main,
    Title5
} from "./elements/index";

// Components:
import { MainNav } from "./components/navigation";

// Stores/Vm's
import { AllStores } from "./stores/all-stores";

export const App = observer((props: { stores: AllStores }) => {
    const stores = props.stores;
    // ...
    return (
        <Main>
            <MainNav stores={stores} />
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

            <Container id="contributing">
                <Title5>Contributing</Title5>
                <p>Want to contribute? Follow these
                    <a href="https://github.com/milligram/milligram/blob/master/.github/contributing.md"
                        title="Contributing">recommendations</a>.</p>
            </Container>

            <Footer>
                <Container>
                    <p>Designed with ♥ by
                        <a target="_blank" href="http://cjpatoilo.com" title="CJ Patoilo">CJ Patoilo</a>. Licensed
                    under the
                        <a target="_blank" href="https://github.com/milligram/milligram#license" title="MIT License">
                            MIT License</a>
                        .</p>
                </Container>
            </Footer>
        </Main>
    );
}
);