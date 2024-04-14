import { forwardRef } from "react";

function Menu({ className, children }, ref) {
    return (
        <nav className={className} ref={ref}>
            {children}
        </nav>
    );
}

export default forwardRef(Menu);