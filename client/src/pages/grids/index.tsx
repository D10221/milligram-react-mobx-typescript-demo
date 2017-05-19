import * as React from "react";
import { Page as Generic } from "../page";
import { Container } from "milligrami/lib/container";
import { Column } from "milligrami/lib/column";
import { Row } from "milligrami/lib/row";
const code = require("raw-loader!./code.html");

const ColumnDemo = (props: React.HTMLProps<HTMLDivElement>) => (
    <div className="column-demo" {...props} />
);

const Column50Offset25 = (props: React.HTMLProps<HTMLDivElement>) => (
    <div className="column column-50 column-offset-25" {...props} />
);

export const Page = () => (
    <Generic
        title="Grids"
        code={code}
        description={
            <span>
                The Grid is a fluid system with a max width of <code>112.0rem</code> <small>(1120px)</small>,
 that shrinks with the browser/device
at smaller sizes. The max width can be changed with one line of CSS and all columns will resize accordingly. Milligram
is different than most because of its use of the <strong>CSS Flexible Box Layout Module standard</strong>. The advantage
is the simplicity, and we know that a functional code is very important for maintainability and scalability. Simply add
columns you want in a row, and they'll evenly take up the available space. If you want three columns, add three columns,
if you want five columns, add five columns. There is no restriction on number of columns, but we advise you to follow
a design pattern of grid system. See more tips on best practices in the<a href="#tips" title="Tips"> tips</a>.
                </span>
        }>
        <Container>
            <Row>
                <Column>
                    <ColumnDemo>.column</ColumnDemo>
                </Column>
                <Column><ColumnDemo>.column</ColumnDemo></Column>
                <Column><ColumnDemo>.column</ColumnDemo></Column>
                <Column><ColumnDemo>.column</ColumnDemo></Column>
            </Row>
            <Row>
                <Column><ColumnDemo>.column</ColumnDemo></Column>
                <Column50Offset25><ColumnDemo>.column-50.column-offset-25</ColumnDemo></Column50Offset25>
            </Row>
        </Container>
    </Generic >
);