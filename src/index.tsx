import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import { stores } from "./stores";
import "./warnings";

document.title = "Miligram React Electron Typescript";

ReactDOM.render(
    <App {...{ stores }} />, document.getElementById("root")
);