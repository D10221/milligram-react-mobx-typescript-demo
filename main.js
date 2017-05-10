const electron = require("electron");
const path = require("path");
const url = require("url");
const createTray = require("./built/tray").create;

const hasFlag = (x) => typeof x === "string" && process.argv.indexOf(x) !== -1;

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 640,
        height: 480,
        // frame: false,
        titleBarStyle: "hidden",
        autoHideMenuBar: true,
        icon: path.join(process.cwd(), "resources", "favicon.ico"),
        show: false
    });
    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(process.cwd(), "window.html"),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    if (process.env.OPEN_DEV_TOOLS || hasFlag("--dev-tools")) {
        mainWindow.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    mainWindow.on("closed", () => {        
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.        
        mainWindow = null;
    });
    mainWindow.on("ready-to-show", () => {        
        mainWindow.show();
        if(hasFlag("--maximize")){
            mainWindow.maximize();
        };
        tray = createTray({window: mainWindow});
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {       
    createWindow();
    
});
// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.