import * as electron from "electron";
import { getPath } from "./util/local-path";
import { isDarwin } from "./util/platform";

export interface TrayOptions {
    icon?: string;
    dontQuit?: boolean;
    label: string;
    toolTip: string;
}
export function create(options: TrayOptions): Electron.Tray {

    const icon = getPath(options.icon || "resources/icon-16x16.png");
    const tray = new electron.Tray(icon);
    const menuOptions: Electron.MenuItemOptions[] = [];

    let contextMenu: Electron.Menu;

    menuOptions.push(
        {
            label: options.label,
            type: "normal",
            icon,
            click: () => tray.emit("focus")
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

    if (isDarwin) {
        menuOptions.push([
            { role: "hide" },
            { role: "hideothers" }
        ]);
    }
    menuOptions.push(
        { type: "separator" },
        {
            label: "Exit",
            type: "normal",
            click: electron.app.quit
        }
    );

    contextMenu = electron.Menu.buildFromTemplate(menuOptions);
    tray.setToolTip(options.toolTip);
    tray.setContextMenu(contextMenu);
    return tray;
}