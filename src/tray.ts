import * as electron from "electron";
import * as path from "path";
import * as fs from "fs";
const Tray = electron.Tray;

export interface TrayOptions {
    icon?: string;
    window?: Electron.BrowserWindow;
}
export function create(options?: TrayOptions): Electron.Tray {
    let { icon, window } = options;
    icon = icon || path.join(__dirname, "../resources/icon-16x16.png");
    window = window || {} as any;

    if (!fs.statSync(icon)) {
        throw new Error(`Icon Not found: ${icon}`);
    }
    const tray = new Tray(icon);
    const contextMenu = electron.Menu.buildFromTemplate([
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
            click: () => {
                if (window.reload) {
                    window.reload();
                }
            }
        }, {
            label: "Dev Tools",
            type: "normal",
            click: () => {
                if (window.webContents) {
                    if (!window.webContents.isDevToolsOpened()) {
                        window.webContents.openDevTools();
                    } else {
                        window.webContents.closeDevTools();
                    }
                }
            }
        },
        {
            label: "Quit",
            type: "normal",
            click: () => {
                process.exit();
            }
        }
    ]);
    tray.setToolTip("X-App");
    tray.setContextMenu(contextMenu);
    return tray;
}