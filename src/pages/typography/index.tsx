import * as React from "react";
import { styles } from "../../styles";
import { Page as Generic } from "../page";
const code = require("raw-loader!./code.html") as string;

const HeadingFont = (props: React.HTMLProps<HTMLSpanElement>) => (
    <span style={styles.headingFontSize} {...props} />
);

const MyDescription = () => (
    <span>
        CSS3 introduces a few new units, including the<code> rem</code> unit, which stands for <em>
            "root em"</em>.
The < code > rem</code >unit is relative to the font- size of the root element< code > html</code >.
That means that we can define a single
font size on the root element, and define all< code > rem</code >units to be a percentage of that.
The typography has < code > font - size</code > defined in 1.6rem (16px) and < code > line - height</code >
        in 1.6(24px).
<strong > Milligram</strong > uses the <code> font - family</code >
        <a href="https://www.google.com/fonts/specimen/Roboto"
            title="Roboto by Christian Robertson"
            target="_blank"> Roboto</a>, created by < u > Christian Robertson</u >, and provided by Google.
 </span>
);
export const Page = () => {
    // ...
    return (
        <Generic title="Typography"
            code={code}
            description={<MyDescription />} >
            <h1>Heading<HeadingFont> <code>h1</code> 4.6rem (46px)</HeadingFont></h1>
            <h2>Heading<HeadingFont> <code>h2</code> 3.6rem (36px)</HeadingFont></h2>
            <h3>Heading<HeadingFont> <code>h3</code> 2.8rem (28px)</HeadingFont></h3>
            <h4>Heading<HeadingFont> <code>h4</code> 2.2rem (22px)</HeadingFont></h4>
            <h5>Heading<HeadingFont> <code>h5</code> 1.8rem (18px)</HeadingFont></h5>
            <h6>Heading<HeadingFont> <code>h6</code> 1.6rem (16px)</HeadingFont></h6>
        </Generic>
    );
};

