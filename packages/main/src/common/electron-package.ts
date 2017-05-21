import { JsonSchemaForNpmPackageJsonFiles } from "./Json-schema-for-npm-package-json-files";
export type ElectronPackage = JsonSchemaForNpmPackageJsonFiles & {
    window?: {
        /**
         * Window Icon
         */
        icon?: string;

        /**
         * Window Icon
         */
        trayIcon?: string;
    }
};