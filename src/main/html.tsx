import * as React from "react";

export interface HtmlProps {
    displayName: string;
    scripts: string[];
    styles: string[];
}

export const Html = (props: HtmlProps) => (
    <html lang="en">
        <head>
            <title>{props.displayName}</title>
            <meta charSet="UTF-8" />
            <meta name="viewport"
                 content="width=device-width, initial-scale=1" />
            {props.styles.map((style, i) => (
                <link key={`css_${i}`} href={style} rel="stylesheet" />
                ))}
        </head>
        <body>
            <main id="main"></main>
            {props.scripts.map((s, i) => (
                <script key={`script_${i}`} src={s} />
            ))}
        </body>
    </html>
);
