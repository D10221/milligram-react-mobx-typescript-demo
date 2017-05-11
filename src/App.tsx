import * as React from "react";
import { observer } from "mobx-react";

import {
    Container,
    Footer,
    LinkItem,
    Main,
    Title1,
    Title5
} from "./elements/index";

// Navigation
import {
    Nav,
    NavTitle,
    NavigationList,
    NavItem,
    NavLink,
} from "./elements/navigation";

// Components:
import { PopoverGrid } from "./components/popover/popover-grid";
import { PopoverSupport } from "./components/popover/popover-support";

import { Octocat } from "./components/octocat";

import { miligramLogo } from "./resources/miligram-logo";
import { stores } from "./stores";

export const App = observer(() => {
    // ...
    return (
        <Main>
            <Nav>
                <Container>
                    <NavTitle target="blank" href="https://milligram.github.io/">
                        <svg className="img" version="1.1" viewBox="0 0 463 669" >
                            <g transform="translate(0.000000,669.000000) scale(0.100000,-0.100000)">
                                <path d={miligramLogo}></path>
                            </g>
                        </svg >
                        &nbsp;
                <Title1>Milligram</Title1>
                    </NavTitle>
                    <NavigationList>
                        <NavItem>
                            <NavLink
                                href="#popover-grid"
                                onClick={stores.popovers.toggleOpen("popover-grid")}
                            >Docs
                            </NavLink>
                            <PopoverGrid stores={stores} />
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="#popover-support"
                                onClick={stores.popovers.toggleOpen("popover-support")}
                            >Support
                            </NavLink>
                            <PopoverSupport stores={stores} />
                        </NavItem>
                    </NavigationList>
                    <Octocat />
                </Container>
            </Nav>
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