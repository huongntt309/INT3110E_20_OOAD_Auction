import { useState } from "react";
import classNames from "classnames/bind";
import styles from './Products.module.scss';

import Card from '~/components/Card';
import Button from '~/components/Button';
import Modal from "~/components/Modal";
import PlateDetail from "~/components/Form/PlateDetail";
import config from '~/config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

// Sample
const ITEM = {
    number: '51K-868.68',
    type: 'Xe con',
    address: 'Thành phố Hồ Chí Minh',
    registerStart: '11:39 17/07/2023',
    registerEnd: '16:30 09/04/2024',
    auctionStart: '09:15 12/04/2024',
    auctionEnd: '09:40 12/04/2024',
};

function Products() {
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState();

    const handleShowModal = () => {
        setShowModal(true);
    }
    
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const showDetail = (item) => {
        handleShowModal();
        setItem(item);
    }

    return (
        <div className='px-32 py-16'>
            <div className='grid grid-cols-4 gap-8'>
                {Array.from({ length: 12 }, (arr, index) => (
                    <Card className={cx('card')} key={index}>
                        <div className='flex flex-col justify-center items-center border-[4px] border-solid border-[var(--black)] aspect-[2/1] rounded-[4px]'>
                            <div className='text-[64px] leading-[64px] font-["UKNumberPlate"]'>{ITEM.number.split('-').shift()}</div>
                            <div className='text-[64px] leading-[64px] font-["UKNumberPlate"]'>{ITEM.number.split('-').pop()}</div>
                        </div>
                        <div className='mt-4'>
                            <div className='flex text-[14px] text-[var(--second-text-color)]'>
                                <h3>{ITEM.type}</h3>
                                <h3 className='ml-8'>{ITEM.address}</h3>
                            </div>
                            <div className='flex items-center mt-4'>
                                <div className='flex justify-center items-center w-[34px] h-[34px] bg-[var(--hover-color)] rounded-full'>
                                    <FontAwesomeIcon className='w-[18px] h-[18px] text-[var(--primary)]' icon={faClock} />
                                </div>
                                <div className='ml-8'>
                                    <h3 className='text-[14px] text-[var(--second-text-color)]'>Thời gian đăng ký còn lại</h3>
                                    <h3 className='text-[16px] font-semibold'>6 ngày 2 giờ 40 phút</h3>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center mt-4'>
                            <Button className='p-[9px_16px] mt-4 w-full' to={config.routes.room} state={ITEM} primary>Đăng ký đấu giá</Button>
                            <Button className='mt-4 text-[var(--primary)] font-normal' onClick={() => showDetail(ITEM)}>Xem thông tin chi tiết biển số</Button>
                        </div>
                    </Card>
                ))}
            </div>

            {showModal && 
                <Modal>
                    <PlateDetail item={item} onClose={handleCloseModal} />
                </Modal>
            }
        </div>
    );
}

export default Products;