import * as React from "react";
import { observer } from "mobx-react";
export const Main = observer(
    (props: React.HTMLProps<HTMLDivElement>) => {
        return (
            <main className="wrapper" {...props}></main>
        );
    }
);
export const Nav = (props: React.HTMLProps<HTMLDivElement>) => {
    return (
        <nav className="navigation" {...props} />
    );
};
export const Container = (props: React.HTMLProps<HTMLDivElement>) => {
    return (
        <section className="container" {...props} />
    );
};

export const NavTitle = (props: React.HTMLProps<HTMLAnchorElement>) => {
    return (
        <a className="navigation-title" {...props} />
    );
};

export const NavigationList = (props: React.HTMLProps<HTMLUListElement>) => {
    return (
        <ul className="navigation-list float-right" {...props} />
    );
};

export const NavItem = (props: React.HTMLProps<HTMLLIElement>) => {
    return (<li className="navigation-item" {...props} />);
};

export const NavLink = (props: React.HTMLProps<HTMLAnchorElement>) => {

    return (<a className="navigation-link" data-popover {...props} />);
};

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
    <footer className="footer" {...props} />
);