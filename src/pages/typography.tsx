import * as React from "react";
import { observer } from "mobx-react";

import { Container, } from "../elements/container";
import { Title3 } from "../elements/headers";
import { Row } from "../elements/row";
import { Column } from "../elements/column";
import { Description } from "../elements/description";
import { CodePrettyprint } from "../elements/code-prettyprint";
import { CodeContent } from "../elements/code-content";
import { styles } from "./typography.style";

const HeadingFont = (props: React.HTMLProps<HTMLSpanElement>) => (
    <span style={styles.headingFontSize} {...props} />
);
export const Page = observer(() => {
    // ...
    return (
        <Container>
            <Title3>Typography</Title3>
            <Description>
                ... description
                </Description>
            <Row>
                <Column>
                    <h1>Heading<HeadingFont> <code>h1</code> 4.6rem (46px)</HeadingFont></h1>
                    <h2>Heading<HeadingFont> <code>h2</code> 3.6rem (36px)</HeadingFont></h2>
                    <h3>Heading<HeadingFont> <code>h3</code> 2.8rem (28px)</HeadingFont></h3>
                    <h4>Heading<HeadingFont> <code>h4</code> 2.2rem (22px)</HeadingFont></h4>
                    <h5>Heading<HeadingFont> <code>h5</code> 1.8rem (18px)</HeadingFont></h5>
                    <h6>Heading<HeadingFont> <code>h6</code> 1.6rem (16px)</HeadingFont></h6>
                </Column>
            </Row>
            <CodePrettyprint>
                <CodeContent>
                    {`
<!-- Base font-size and line-height -->
<p>The base type is 1.6rem (16px) over 1.6 line height (24px)</p>= '\n\n'
<!-- Other elements to text markup -->
<a>Anchor</a>
<em>Emphasis</em>
<small>Small</small>
<strong>Strong</strong>
<u>Underline</u>
= \n\n
<!-- Default Headings -->
<h1>Heading</h1>
<h2>Heading</h2>
<h3>Heading</h3>
<h4>Heading</h4>
<h5>Heading</h5>
<h6>Heading</h6>
= \n\n
<!-- The base font-size is set at 62.5%\n
for having the convenience of sizing rems\n
in a way that is similar to using px.\n
So basically 1.6rem = 16px. -->\n
`}
                </CodeContent>
            </CodePrettyprint>
        </Container>
    );
}
);
