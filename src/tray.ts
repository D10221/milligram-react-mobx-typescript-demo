import * as electron from "electron";
import { getPath } from "./util/local-path";

export interface TrayOptions {
    icon?: string;
    dontQuit?: boolean;
    // window?: Electron.BrowserWindow;
}
export function create(options: TrayOptions): Electron.Tray {

    const icon = getPath(options.icon || "resources/icon-16x16.png");
    const tray = new electron.Tray(icon);
    const menuOptions: Electron.MenuItemOptions[] = [];

    let contextMenu: Electron.Menu;

    menuOptions.push(
        {
            label: "Milligram",
            type: "normal",
            icon
        },
        {
            label: "About",
            type: "normal"
        },
        {
            label: "Restart",
            type: "normal",
            // checked: true,
            click: () => tray.emit("restart")
        },
        {
            label: "Stay in tray",
            type: "checkbox",
            click: () => {
                tray.setContextMenu(contextMenu);
                tray.emit("dont-quit");
            },
            checked: options.dontQuit === true
        }
    );
    menuOptions.push({
        label: "Dev Tools",
        type: "normal",
        click: () => tray.emit("dev-tools"),
        // checked: options.canQuit
    });

    if (process.platform === "darwin") {
        menuOptions.push([
            { role: "hide" },
            { role: "hideothers" }
        ]);
    }
    menuOptions.push(
        { type: "separator" },
        {
            label: "Quit",
            type: "normal",
            click: electron.app.quit
        }
    );

    contextMenu = electron.Menu.buildFromTemplate(menuOptions);
    tray.setToolTip("X-App");
    tray.setContextMenu(contextMenu);
    return tray;
}