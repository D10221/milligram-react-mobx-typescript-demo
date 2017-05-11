import * as React from "react";
import { observer } from "mobx-react";

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

import { DocumentationMenu } from "../menu/documentation-menu";
import { SupportMenu } from "../menu/support-menu";
import { Octocat } from "../../components/octocat";

import { NavLogo } from "./nav-logo";

import { AllStores } from "../../stores/all-stores";
export const MainNav = observer((props: { stores: AllStores }) => {
    const stores = props.stores;
    const documentationMenuId = "documentation-menu";
    const supportMenuId = "support-menu";
    return (
        <Nav>
            <Container>
                <NavTitle href="#/home">
                    <NavLogo /> &nbsp;
                    <Title1>Milligram</Title1>
                </NavTitle>
                <NavigationList>
                    <NavItem>
                        <NavLink onClick={stores.popovers.toggleOpen(documentationMenuId)}>
                            Docs
                        </NavLink>
                        <DocumentationMenu
                            id={documentationMenuId}
                            stores={stores} />
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={stores.popovers.toggleOpen(supportMenuId)}>
                            Support
                        </NavLink>
                        <SupportMenu stores={stores} id={supportMenuId} />
                    </NavItem>
                </NavigationList>
                <Octocat />
            </Container>
        </Nav>
    );
}
);