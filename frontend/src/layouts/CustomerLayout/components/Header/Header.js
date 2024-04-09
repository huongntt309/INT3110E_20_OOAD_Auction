import classNames from "classnames/bind";
import styles from './Header.module.scss';
import { Link, NavLink } from "react-router-dom";

import config from '~/config';
import { LogoBlack } from '~/components/Icon';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Menu from '~/components/Menu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Header() {
    const user = false;
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faUser}/>,
            title: 'Xem hồ sơ',
            // to: '/:nickname',
            to: '/ho-so',
        },
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Đăng xuất',
            // link: '/logout',
            to: config.routes.home,
            className: 'separate',
        }
    ];

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch(menuItem.to) {
            case config.routes.home:
                // authService.logout();
                // window.location.assign(config.routes.home);
                break;
            // case '/:nickname':
                // window.location.href = `/:${authUser.data.nickname}`;
                // break;
            default:
                break;
        }
    };

    return (
        <header className={cx('fixed inset-0 z-20', 'wrapper')}>
            <div className={cx('flex justify-between items-center w-full h-full', 'container')}>
                <div>
                    <Link to={config.routes.home}>
                        <LogoBlack />
                    </Link>
                </div>

                <div className='flex justify-center'>
                    <NavItem className={cx('header-link')} to={config.routes.home} title='Trang chủ' />
                    {/* <NavItem className={cx('header-link')} to={'/a'} title='Danh sách công bố' /> */}
                    <NavItem className={cx('header-link')} to={config.routes.products} title='Danh sách chính thức' />
                    <NavItem className={cx('header-link')} to={config.routes.room} title='Phòng đấu giá' />
                    <NavItem className={cx('header-link')} to={config.routes.result} title='Kết quả đấu giá' />
                    <NavItem className={cx('header-link')} to={'/a'} title='Thông báo' />
                </div>
                
                {user ? (
                    <div className='flex justify-end min-w-[200px] max-w-[250px]'>
                        <div className='flex flex-col items-end'>
                            <span className='font-semibold'>Nguyễn Hà Hoàng Anh</span>
                            <span className='text-[var(--primary)] font-semibold'>1,000,000,000 VNĐ</span>
                        </div>
                        <Menu
                            className={cx('header-menu-list')}
                            items={MENU_ITEMS}
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

function NavItem({ className, to, title }) {
    return (
        <NavLink className={(nav) => cx(className, { active: nav.isActive })} to={to}>
            {title}
        </NavLink>
    )
}

export default Header;