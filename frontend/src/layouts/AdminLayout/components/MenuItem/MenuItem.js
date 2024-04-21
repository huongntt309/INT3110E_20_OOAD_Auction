import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from '../Sidebar/Sidebar.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ className, to, icon, title, children, onClick = () => {} }) {
    return (
        <div className={cx('w-full', className)}>
            {to &&
                <NavLink to={to} className={(nav) => cx('relative', 'link', { active: nav.isActive })}>
                    <div className={cx('flex justify-center items-center', 'icon')}>{icon}</div>
                    <div className={cx('title')}>{title}</div>
                </NavLink>
            }
            {!to &&
                <div to={to} className={cx('relative', 'link')} onClick={onClick}>
                    <div className={cx('flex justify-center items-center', 'icon')}>{icon}</div>
                    <div className={cx('title')}>{title}</div>
                </div>
            }
            {children}
        </div>
    );
}

export default MenuItem;