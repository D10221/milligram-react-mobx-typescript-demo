export interface BuildConfig {
    packages: [
        {
            name: string,
            dir: string,
            scripts: string[],
        }
    ];
}