import * as React from "react";
import { Page as Generic } from "../page";
import { FloatRight } from "../../elements/float-right";
import { LabelInline } from "../../elements/label-inline";
import { ButtonInputPrimary } from "../../elements/button-input-primary";

const code = require("raw-loader!./code.html");
export const Page = () => (
    <Generic
        title="Forms"
        code={code}
        description={
            <span>
                The Form has never been exactly fun, and it can be downright painful
on a mobile device with its on-screen keyboard. Milligram
help to make this much easier with design focused on the user experience.
            </span>
        }>
        <form action="javascript: void(0)">
            <fieldset>
                <label htmlFor="nameField">
                    Name
                </label>
                <input id="nameField" type="text" placeholder="CJ Patoilo" />
                <label htmlFor="ageRangeField">Age Range</label>
                <select
                    id="ageRangeField">
                    <option value="0-13">0-13</option>
                    <option value="14-17">14-17</option>
                    <option value="18-23">18-23</option>
                    <option value="24+">24+</option>
                </select>
                <label htmlFor="commentField">Comment</label>
                <textarea id="commentField" placeholder="Hi CJ …" />
                <FloatRight>
                    <input id="confirmField" type="checkbox" />
                    <LabelInline htmlFor="confirmField">
                        Send a copy to yourself
                    </LabelInline>
                </FloatRight>
                <ButtonInputPrimary type="submit" value="Send" />
            </fieldset>
        </form>
    </Generic>
);

