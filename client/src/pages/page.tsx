import * as React from "react";
import { observer } from "mobx-react";

import { Container, } from "../elements/container";
import { Title3 } from "../elements/headers";
import { Row } from "../elements/row";
import { Column } from "../elements/column";
import { Description } from "../elements/description";

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
