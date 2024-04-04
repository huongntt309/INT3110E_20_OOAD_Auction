import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import { LogoWhite } from '~/components/Icon';
import Button from '~/components/Button';
import config from '~/config';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className='py-16'>
                <div className='grid grid-cols-3 gap-16 px-16'>
                    <section>
                        <LogoWhite width={136} height={46} />
                        <h3 className={cx('mt-4 font-bold', 'header')}>Công ty Đấu giá Hợp danh Việt Nam</h3>
                        <ul>
                            <li className='flex mt-4'>
                                <FontAwesomeIcon className={cx('mr-4', 'icon')} icon={faLocationDot} />
                                <div>
                                    <span className={cx('contact')}>Trụ sở chính: </span>
                                    <span>L4-05 tầng 4 tòa nhà N02 - TNL Plaza Goldseason, số 47 Nguyễn Tuân, phường Thanh Xuân Trung, quận Thanh Xuân, thành phố Hà Nội</span>
                                </div>
                            </li>
                            <li className='flex mt-4'>
                                <FontAwesomeIcon className={cx('mr-4', 'icon')} icon={faPhone} />
                                <div>
                                    <span className={cx('contact')}>Hotline: </span>
                                    <span>1900.0555.15</span>
                                </div>
                            </li>
                            <li className='flex mt-4'>
                                <FontAwesomeIcon className={cx('mr-4', 'icon')} icon={faEnvelope} />
                                <div>
                                    <span className={cx('contact')}>Email: </span>
                                    <span>dgbs@vpa.com.vn</span>
                                </div>
                            </li>
                            <li className='flex mt-4'>
                                <p>Đại diện: Lâm Thị Mai Anh - Chức vụ: Giám đốc</p>
                            </li>
                            <li className='flex mt-4'>
                                <p>Giấy chứng nhận ĐKHĐ: 41/TP-ĐKHĐ do Sở Tư pháp Hà Nội cấp ngày 21/01/2019</p>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h3 className={cx('mt-4 font-bold', 'header')}>Chính sách</h3>
                        <ul>
                            <li className='mt-4'>
                                <Button className={cx('font-normal', 'link')} to={config.routes.customer_home}>Điều khoản sử dụng</Button>
                            </li>
                            <li className='mt-4'>
                                <Button className={cx('font-normal', 'link')} to={config.routes.customer_home}>Hướng dẫn</Button>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h3 className={cx('mt-4 font-bold', 'header')}>Theo dõi chúng tôi trên</h3>
                        <img className='w-1/2' src={images.logo_gov} alt='Chứng nhận' />
                    </section>
                </div>
                <hr className='mt-8 mb-8 border-[var(--border-color)]' />
                <div className='flex justify-between px-16'>
                    <section className='w-3/5'>
                        <p className='text-xl text-[var(--border-color)]'>
                            Trang thông tin điện tử đấu giá trực tuyến vpa.com.vn đã được Sở Tư pháp thành phố Hà Nội phê duyệt đủ điều kiện thực hiện hình thức đấu giá trực tuyến theo Quyết định số 226/QĐ-STP ngày 16/3/2023
                        </p>
                    </section>
                    <section>
                        <p className='text-right text-xl text-[var(--border-color)]'>
                            Bản quyền thuộc về VPA@2023
                        </p>
                    </section>
                </div>
            </div>
        </footer>
    );
}

export default Footer;