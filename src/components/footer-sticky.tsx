import * as React from "react";
import { Footer as FooterElement, } from "../elements/footer";
import { style as footerStyle } from "../styles/footer-sticky";

export const FooterSticky = (props: React.HTMLProps<HTMLElement>) => (
    <FooterElement style={footerStyle} {...props} />
);
