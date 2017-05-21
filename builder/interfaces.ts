export interface Package {
    name: string;
    dir: string;
    linked?: boolean;
    scripts: string;
}
export interface BuildConfig {
    packages: Package[];
}