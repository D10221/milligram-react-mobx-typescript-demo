import * as React from "react";

// Elements
import { Blockquote } from "../elements/blockquote";
import { ContainerSection, } from "../elements/container-section";

export const Home = () => {
    return (
        <ContainerSection id="examples">
            <a data-align="center"
                target="blank"
                href="https://milligram.github.io">
                <img width="100%"
                    src="resources/thumbnail.png"
                    alt="Milligram - A minimalist CSS framework" />
            </a>
            <Blockquote>
                <p><em>A minimalist CSS framework.</em></p>
            </Blockquote>
        </ContainerSection >
    );
};
