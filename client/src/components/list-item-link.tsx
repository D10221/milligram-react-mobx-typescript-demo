import * as React from "react";
export const ListItemLink = (props: React.HTMLProps<HTMLAnchorElement>) => {
    return (
        <li><a {...props} /></li>
    );
};