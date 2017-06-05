import { app, BrowserWindow } from "electron";
import * as path from "path";
// Index

// load window
let win: Electron.BrowserWindow;
app.on("ready", () => {
    win = new BrowserWindow({
        show: false,
        width: 400,
        height: 400,
        icon: path.join(
            __dirname,
            "../../",
            "resources",
            "icon.png"
        )
    });
    win.on("ready-to-show", () => {
        win.show();
    });
    win.loadURL(`file:///${__dirname}/../index.html`);
});
app.on("window-all-closed", () => {
    app.quit();
});