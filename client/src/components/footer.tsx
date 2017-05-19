import * as React from "react";
import { observer } from "mobx-react";
import { AllStores } from "../stores/all-stores";

import { ContainerSection, } from "milligrami/lib/container-section";
import { FooterSticky } from "./footer-sticky";
export const Footer = observer((props: { stores: AllStores }) => {
    if (!props.stores) {
        throw new Error("Where are the stores?");
    }
    return (
        <FooterSticky>
            <ContainerSection>
                <p>Designed with ♥ by
                        <a target="_blank" href="http://cjpatoilo.com" title="CJ Patoilo">CJ Patoilo</a>. Licensed
                    under the
                        <a target="_blank" href="https://github.com/milligram/milligram#license" title="MIT License">
                        MIT License</a>
                    .</p>
            </ContainerSection>
        </FooterSticky>
    );
});