import * as React from "react";
import { Page as Generic } from "../page";
import { Row } from "../../elements/row";
import { Column } from "../../elements/column";
const code = require("raw-loader!./code.html");
export const Page = () => (
    <Generic
        title="Lists"
        code={code}
        description={(
            <span>
                The List is a very versatile and common way to display items.
                Milligram has three types of lists: The unordered list use
<code>ul</code> element will be marked with a outline circles, the ordered list use <code>ol</code> element and your
items will be marked with numbers, the description list use <code>dl</code> element and your items will not be marking,
    only spacings.
            </span>
        )}>
        <Row>
            <Column>
                <ul>
                    <li>Unordered list item 1</li>
                    <li>Unordered list item 2</li>
                </ul>
            </Column>
            <Column>
                <ol>
                    <li>Ordered list item 1</li>
                    <li>Ordered list item 2</li>
                </ol>
            </Column>
            <Column>
                <dl>
                    <dt>Description list item 1</dt>
                    <dd>Description list item 1.1</dd>
                </dl>
            </Column>
        </Row>
    </Generic>
);