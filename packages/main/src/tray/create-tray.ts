import * as electron from "electron";
import { Store } from "electron-json-storage-async";

import { MainWindow } from "../window/create-window";

import { getPackage } from "../common/package";
import { getPath } from "../common/local-path";
import { isDarwin } from "../common/platform";
import { orDefault } from "../common/or-default";

import { TrayOptions, Tray } from "./interfaces";
export const CreateTray = async (options: TrayOptions) => {

    let dontQuit = isDarwin;

    const canQuit = () => !dontQuit;

    const trayState = Store<any>("tray");

    dontQuit = orDefault(
        (await trayState.get<boolean>("dont-quit")),
        dontQuit
    );

    if (!options.label || !options.toolTip || !options.icon) {
        const pkg = getPackage();
        options.label = options.label || pkg.displayName;
        options.toolTip = options.toolTip || pkg.description;
        options.icon = options.icon || pkg.window ? pkg.window.trayIcon : null;
    }
    const toggleDontQuit = () => {
        dontQuit = !dontQuit;
        trayState.set("dont-quit", dontQuit);
    };

    const icon = getPath(options.icon);
    let tray: Electron.Tray;

    // ...
    return (mainWindow: MainWindow) => {

        if (tray) { tray.destroy(); }
        tray = new electron.Tray(icon);
        const menuOptions: Electron.MenuItemOptions[] = [];

        let contextMenu: Electron.Menu;
        menuOptions.push(
            {
                label: options.label,
                type: "normal",
                icon,
                click: mainWindow.focus
            },
            {
                label: "About",
                type: "normal"
            },
            {
                label: "Reload",
                type: "normal",
                // checked: true,
                click: mainWindow.reload
            },
            {
                label: "Stay in tray",
                type: "checkbox",
                click: () => {
                    tray.setContextMenu(contextMenu);
                    toggleDontQuit();
                },
                checked: dontQuit === true
            }
        );

        menuOptions.push({
            label: "Dev Tools",
            type: "normal",
            click: mainWindow.toggleDevTools,
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

        return {
            canQuit,
        } as Tray;
    };
};