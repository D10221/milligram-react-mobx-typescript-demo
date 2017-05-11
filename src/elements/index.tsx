import * as React from "react";
import { observer } from "mobx-react";
export const Main = observer(
    (props: React.HTMLProps<HTMLElement>) => {
        return (
            <main className="wrapper" {...props}></main>
        );
    }
);

export const Container = (props: React.HTMLProps<HTMLElement>) => {
    return (
        <section className="container" {...props} />
    );
};

/**
 * Uneeded so far ...
 */
export const Blockquote = (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote {...props} />
);

export const Title5 = (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h5 className="title" {...props} />
);

export const Title1 = (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="title" {...props} />
);

export const LinkItem = (props: React.HTMLProps<HTMLAnchorElement>) => {
    return (
        <li><a {...props} /></li>
    );
};
export const Footer = (props: React.HTMLProps<HTMLDivElement>) => (
    <footer className="footer" {...props} style={
        {

            background: "#f4f5f6",
            border: "bottom: .1rem solid #d1d1d1",
            display: "block",
            height: "5.2rem",
            left: 0,
            maxWidth: "100 %",
            position: "fixed",
            right: 0,
            bottom: 0,
            width: "100%",
            zindex: 1

        }
    } />
);