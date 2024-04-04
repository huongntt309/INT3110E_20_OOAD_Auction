import classNames from "classnames/bind";
import { useState } from "react";
import styles from './Menu.module.scss';
import Tippy from "@tippyjs/react/headless";

import Popper from '~/components/Popper';
import Button from '~/components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Header({ title, onBack = () => {} }) {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
}

function MenuItem({ data, onClick = () => {} }) {
    const classes = cx('relative block w-full','menu-item', { 
        [`${data.className}`]: data.className,
    });

    return (
        <Button 
            className={classes} 
            leftIcon={data.icon}
            href={data.href}
            to={data.to}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
}

function Menu({
    className,
    children,
    items = [],
    placement,
    offset,
    hideOnClick = false,
    onChange = () => {},
    ...otherProps
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <div key={index}>
                    <MenuItem 
                        data={item}
                        onClick={() => {
                            if (isParent) 
                                setHistory(prev => [...prev, item.children]);
                            else
                                onChange(item);
                        }}
                    />
                </div>
            );
        });
    }
    
    const renderResult = (attrs) => (
        <div
            className={cx('menu-list')}
            tabIndex='-1'
            {...attrs}
        >
            <Popper className={cx('relative', 'menu-popper', className)}>
                {history.length > 1 && !!current.title &&
                    <Header 
                        title={current.title} 
                        onBack={handleBack}
                    />
                }
                <div className={cx('menu-body')}>{renderItems()}</div>
            </Popper>
        </div>
    );

    // Back to previous
    const handleBack = () => {
        setHistory(prev => prev.slice(0, prev.length - 1))
    }

    // Reset to first page
    const handleReset = () => {
        setHistory(prev => prev.slice(0, 1));
    }

    return (
        <div>
            <Tippy
                interactive
                zIndex={2}
                placement={placement}
                offset={offset}
                popperOptions={{ modifiers: [{ name: 'flip', enabled: false }], strategy: 'fixed' }}
                hideOnClick={hideOnClick}
                render={renderResult}
                onHide={handleReset}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Menu;