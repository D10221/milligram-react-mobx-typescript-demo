import * as React from "react";
import { Footer as FooterElement, } from "../elements/footer";
import { styles } from "../styles";

export const FooterSticky = (props: React.HTMLProps<HTMLElement>) => (
    <FooterElement style={styles.footerSticky} {...props} />
);
