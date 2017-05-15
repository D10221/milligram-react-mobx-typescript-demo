import * as React from "react";
import { Page as Generic } from "../page";
const code = require("raw-loader!./code.html");

export const Page = () => (
    <Generic title="Tables"
        description={(
            <span>
                The Table element represents data in two dimensions or more.
                We encourage the use of proper formatting with <code>thead</code>
                and <code>tbody</code> to create a <code>table</code>.
                The code becomes cleaner without disturbing understanding.
            </span>
        )}
        code={code}>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Height</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Stephen Curry</td>
                    <td>27</td>
                    <td>1,91</td>
                    <td>Akron, OH</td>
                </tr>
                <tr>
                    <td>Klay Thompson</td>
                    <td>25</td>
                    <td>2,01</td>
                    <td>Los Angeles, CA</td>
                </tr>
            </tbody>
        </table>
    </Generic>
);