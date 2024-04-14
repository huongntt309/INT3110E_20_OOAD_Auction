import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import classNames from "classnames/bind";
import styles from './Header.module.scss';
import { Link, NavLink } from "react-router-dom";

import config from '~/config';
import { LogoBlack } from '~/components/Icon';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Menu from '~/components/Menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRightFromBracket, faFile } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { authUserContext } from "~/App";

const cx = classNames.bind(styles);

const MENU_ITEMS = {
    user: [
        {
            icon: <FontAwesomeIcon icon={faUser}/>,
            title: 'Xem hồ sơ',
            to: config.routes.profile,
        },
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Đăng xuất',
            link: 'log_out',
            className: 'separate',
        }
    ],
    admin: [
        {
            icon: <FontAwesomeIcon icon={faUser}/>,
            title: 'Xem hồ sơ',
            to: config.routes.profile,
        },
        {
            icon: <FontAwesomeIcon icon={faFile}/>,
            title: 'Quản lý',
            to: config.routes.dashboard,
        },
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Đăng xuất',
            link: 'log_out',
            className: 'separate',
        }
    ],
};

function Header() {
    const context = useContext(authUserContext);
    const user = context && context.authUser?.user;
    const navigate = useNavigate();

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch(menuItem.link) {
            case 'log_out':
                toast.success('Đăng xuất thành công!');
                localStorage.removeItem('user');
                context.handleAuthUser();
                setTimeout(() => {
                    navigate(config.routes.home);
                }, 200);
                break;
            default:
                break;
        }
    };

    return (
        <header className={cx('fixed inset-0 z-20', 'wrapper')}>
            <div className={cx('flex justify-between items-center w-full h-full', 'container')}>
                <div>
                    <Link to={config.routes.dashboard}>
                        <LogoBlack />
                    </Link>
                </div>
                
                {context.authUser ? (
                    <div className='flex justify-end min-w-[200px] max-w-[250px]'>
                        <div className='flex flex-col items-end'>
                            <span className='font-semibold'>
                                {user.last_name} {user.first_name}
                            </span>
                            <span className='text-[var(--primary)] font-semibold capitalize'>
                                {user.role}
                            </span>
                        </div>
                        <Menu
                            className={cx('header-menu-list')}
                            items={user && MENU_ITEMS[user.role]}
                            placement='bottom-end'
                            offset={[12, 16]}
                            onChange={handleMenuChange}
                            menuPopper={cx('header-menu-popper')}
                        >
                            <Image className='ml-4 w-[40px] h-[40px] rounded-full' src={''} alt='avatar' />
                        </Menu>
                    </div>
                ) : (
                    <div className='flex justify-end min-w-[200px] max-w-[250px]'>
                        <Button className={cx('mr-4', 'action-btn')} to={config.routes.login} text>Đăng nhập</Button>
                        <Button className={cx('action-btn')} to={config.routes.signup} primary>Đăng ký</Button>
                    </div>
                )}
            </div>
        </header>
    );
}

function NavItem({ className, to, title, ...otherProps }) {
    return (
        <NavLink className={(nav) => cx(className, { active: nav.isActive })} to={to} {...otherProps}>
            {title}
        </NavLink>
    )
}

export default Header;