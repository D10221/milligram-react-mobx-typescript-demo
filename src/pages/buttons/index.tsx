import * as React from "react";
import { Page as Generic } from "../page";
const code = require("raw-loader!./code.html");
import { ButtonClear } from "../../elements/button-clear";
import { ButtonLink } from "../../elements/button-link";
import { ButtonOutline } from "../../elements/button-outline";
import { ButtonInputClear } from "../../elements/button-input-clear";
import { ButtonInputOutline } from "../../elements/button-input-outline";
export const Page = () => (
    <Generic title="Buttons" code={code} description={
        (<span>
            The Button, an essential part of any user experience.
            Buttons come in three basic styles in Milligram: The <code>button</code> element has flat color by default,
            whereas <code>.button-outline</code> has a simple outline around,
            and <code>.button-clear</code> is entirely clear.
        </span>)
    }>
        <ButtonLink href="javascript: void(0)">Default Button</ButtonLink>
        <br />
        <ButtonOutline>Outlined Button</ButtonOutline>
        <br />
        <ButtonClear>Outlined Clear</ButtonClear>
        <br />
        <ButtonInputClear type="submit" value="Clear Input Button" />
        <br />
        <ButtonInputOutline type="submit" value="Outlined Input Button" />
    </Generic>
);