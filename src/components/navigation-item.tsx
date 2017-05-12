import * as React from "react";
import { observer } from "mobx-react";
interface NavigationItemChild /*extends React.Props<any>*/ {
    id: string;
    isOpen: (id: string) => boolean;
    toggleOpen: (id: string) => void;
}
interface NavigationItemProps {
    id: string;
    title: string;
    toggleOpen: (id: string) => void;
    isOpen: (id: string) => boolean;
    child?: React.ComponentClass<NavigationItemChild> | React.SFC<NavigationItemChild>
    | React.ClassicComponentClass<NavigationItemChild>;
}

export const NavigationItem = observer(
    (props: NavigationItemProps) => {
        const Child = props.child;
        return (
            <li className="navigation-item" >
                <a className="navigation-link"
                    style={{cursor: "pointer"}}
                    data-popover
                    onClick={() => props.toggleOpen(props.id)}>
                    {props.title}
                </a>
                <Child
                    id={props.id}
                    isOpen={props.isOpen}
                    toggleOpen={props.toggleOpen} />
            </li>
        );
    }
);