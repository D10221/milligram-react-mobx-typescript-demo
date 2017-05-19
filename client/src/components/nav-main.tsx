import * as React from "react";
import { observer } from "mobx-react";

// Elements
import { ContainerSection, } from "milligrami/lib/container-section";
import { Title1, } from "milligrami";

import {
    Nav,
    NavTitle,
    NavigationList,
} from "milligrami/lib/navigation";

import { DocMenu } from "./menu-documentation";
import { SupportMenu } from "./menu-support";
import { Octocat } from "./octocat";

import { NavLogo } from "./nav-logo";
import { NavigationItem } from "./navigation-item";
import { AllStores } from "../stores/all-stores";

export const NavMain = observer((props: { stores: AllStores }) => {
    const stores = props.stores;
    const documentationMenuId = "documentation-menu";
    const supportMenuId = "support-menu";
    const store = stores.popovers;
    const isOpen = store.isOpen;
    const toggleOpen = (id: string) => setTimeout(props.stores.popovers.toggleOpen(id), 0);

    return (
        <Nav>
            <ContainerSection>
                <NavTitle href="#/home">
                    <NavLogo /> &nbsp;
                    <Title1>Milligram</Title1>
                </NavTitle>
                <NavigationList>
                    <NavigationItem
                        id={documentationMenuId}
                        title="Docs"
                        isOpen={isOpen}
                        toggleOpen={toggleOpen}
                        child={DocMenu}
                    />
                    <NavigationItem
                        id={supportMenuId}
                        title="Support"
                        isOpen={isOpen}
                        toggleOpen={toggleOpen}
                        child={SupportMenu} />
                </NavigationList>
                <Octocat />
            </ContainerSection>
        </Nav>
    );
}
);