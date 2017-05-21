export interface TrayOptions {
    icon?: string;
    label?: string;
    toolTip?: string;
}

export interface Tray {
    canQuit(): boolean;
}
