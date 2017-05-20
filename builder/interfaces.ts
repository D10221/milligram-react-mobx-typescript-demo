export interface BuildConfig {
    packages: [
        {
            name: string,
            dir: string,
            linked?: boolean,
            scripts: string[],
        }
    ];
}