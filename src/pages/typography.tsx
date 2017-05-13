import * as React from "react";
import { observer } from "mobx-react";

import { Container, } from "../elements/container";
import { Title3 } from "../elements/headers";
import { Row } from "../elements/row";
import { Column } from "../elements/column";
import { Description } from "../elements/description";
import { CodePrettyprint } from "../elements/code-prettyprint";
import { CodeContent } from "../elements/code-content";
export const Page = observer(() => {
    return (
        <Container>
            <Title3>Typography</Title3>
            <Description>
                ... description
                    ... description
                    ... description
                </Description>
            <Row>
                <Column>
                    <h1>Heading </h1><span className="heading-font-size">
                        <code>h1 4.6rem (46px)</code>
                    </span>
                    <h2>Heading</h2><span className="heading-font-size">
                        <code>h2 3.6rem (36px)</code>
                    </span>
                    <h3>Heading<span className="heading-font-size">
                        <code>h3 2,8rem (28px)</code>
                    </span>
                    </h3>
                    <h4>Heading</h4><span className="heading-font-size">
                        <code>h4 2.2rem (22px)</code>
                    </span>
                    <h5>Heading</h5>
                    <span className="heading-font-size">
                        <code>h5 1.8rem (18px)</code>
                    </span>
                    <h6>Heading</h6>
                    <span className="heading-font-size">
                        <code>h6 1.6rem (16px)</code>
                    </span>
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

/*
 */