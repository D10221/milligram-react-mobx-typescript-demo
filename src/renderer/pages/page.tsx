import * as React from "react";
import { observer } from "mobx-react";

import { Container, } from "milligrami/lib/container";
import { Title3 } from "milligrami/lib/headers";
import { Row } from "milligrami/lib/row";
import { Column } from "milligrami/lib/column";
import { Description } from "milligrami/lib/description";

export const Page = observer((props: {
    title: React.ReactElement<any> | string,
    description: React.ReactElement<any> | string,
    content?: React.ReactElement<any> | string,
    code: string,
} & React.Props<any>) => {
    // ...
    return (
        <Container>
            <Title3>{props.title}</Title3>
            <Description>
                {props.description}
            </Description>
            <Row>
                <Column>
                    {props.content || props.children}
                </Column>
            </Row>
            <pre>
                <code>
                    {props.code}
                </code>
            </pre>
        </Container>
    );
}
);
