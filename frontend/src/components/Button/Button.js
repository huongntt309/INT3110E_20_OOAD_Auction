import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Button.module.scss';

const cx = classNames.bind(styles)

function Button({ 
    className, 
    to, 
    href, 
    primary = false, 
    secondary = false,
    text = false,
    outline = false, 
    disable = false, 
    leftIcon,
    rightIcon,
    children, 
    onClick, 
    ...otherProps 
}) {
    let Component = 'button';
    const props = {
        onClick,
        ...otherProps,
    };

    // Remove event listener in disable button
    if (disable) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        secondary,
        text,
        outline,
        disable,
    });

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className='mr-4'>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className='ml-4'>{rightIcon}</span>}
        </Component>
    );
}

export default Button;