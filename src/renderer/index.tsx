import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import { stores } from "./stores";

document.title = "Miligram";

ReactDOM.render(
    <App {...{ stores }} />, document.getElementById("main")
);