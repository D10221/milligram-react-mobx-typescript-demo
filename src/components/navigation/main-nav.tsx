import * as React from "react";
import {observer} from "mobx-react";

// Elements
import {
    Container,
    Title1,
} from "../../elements";

import {
    Nav,
    NavTitle,
    NavigationList,
    NavItem,
    NavLink,
} from "../../elements/navigation";

import { PopoverGrid } from "../../components/popover/popover-grid";
import { PopoverSupport } from "../../components/popover/popover-support";
import { Octocat } from "../../components/octocat";

import {NavLogo} from "./nav-logo";

import { AllStores } from "../../stores/all-stores";
export const MainNav = observer((props: { stores: AllStores }) => {
    const stores = props.stores;
    return (
        <Nav>
            <Container>
                <NavTitle target="blank" href="https://milligram.github.io/">
                    <NavLogo /> &nbsp;
                    <Title1>Milligram</Title1>
                </NavTitle>
                <NavigationList>
                    <NavItem>
                        <NavLink
                            href="#popover-grid"
                            onClick={stores.popovers.toggleOpen("popover-grid")}>
                            Docs
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
    );
}
);