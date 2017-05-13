import * as React from "react";
export const ButtonClear = (props: React.HTMLProps<HTMLButtonElement>) => {
    return (
        <input className="button button-clear" {...props} />
    );
};