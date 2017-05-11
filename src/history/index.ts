import * as h from "history";

const _history = h.createHashHistory();

import { RouterStore, syncHistoryWithStore } from "mobx-react-router";

export const ruterStore = new RouterStore();

export const history = syncHistoryWithStore(_history, ruterStore);

history.listen((location, action) => {
    console.log("history-changed", location, action);
});

export const navigate = (url: string) => {
    history.push(url);
};