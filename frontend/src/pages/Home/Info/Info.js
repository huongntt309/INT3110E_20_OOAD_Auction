import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Info.module.scss';

import Button from '~/components/Button';
import Card from '~/components/Card';
import config from '~/config';
import Modal from "~/components/Modal";
import PlateDetail from "~/components/Form/PlateDetail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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

function Info() {
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState();
    const [itemIndex, setItemIndex] = useState(0);

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

    const showNextItem = () => {
		setItemIndex(index => {
			if (index === 7 - 1) return 0;
			return index + 1;
		});
	}

	const showPrevItem = () => {
		setItemIndex(index => {
			if (index === 0) return 7 - 1;
			return index - 1;
		});
	}

    return (
        <div className='px-32 py-16'>
            <div>
                <div className='flex justify-between mb-[4px]'>
                    <p className='text-[16px] font-bold'>Có 46394 biển số</p>
                    <Button className='text-[var(--primary)] text-[16px] font-normal' to={config.routes.products}>Xem tất cả</Button>
                </div>
                <hr />
                <div className='relative'>
                    <div className='overflow-hidden'>
                        <div 
                            className='flex mt-8 -mx-4 transition-[var(--linear)]' 
                            style={{
                                translate: `${-100 * itemIndex}%`
                            }}
                        >
                            {Array.from({ length: 7 }, (arr, index) => (
                                <Card className={cx('grow-0 shrink-0 mx-4', 'card')} key={index}>
                                    <div className={'flex flex-col items-center border-[4px] border-solid border-[var(--black)] aspect-[2/1] rounded-[4px]'}>
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
                                        <Button className='flex justify-center p-[9px_16px] mt-4 w-full' to={config.routes.products} primary>Đăng ký đấu giá</Button>
                                        <Button className='mt-4 text-[var(--primary)] font-normal' onClick={() => showDetail(ITEM)}>Xem thông tin chi tiết biển số</Button>
                                    </div>
                                </Card>
                            ))}
                            <Card className={cx('flex justify-center items-center grow-0 shrink-0 mx-4', 'card')}>
                                <div className='flex flex-col justify-center items-center'>
                                    <Button to={config.routes.products}>
                                        <div className='m-auto w-[24px] h-[24px] text-center border-2 border-solid border-[var(--primary)] rounded-full'>
                                            <FontAwesomeIcon className='text-[var(--primary)]' icon={faChevronRight} />
                                        </div>
                                        <div className='mt-4'>Xem tất cả</div>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <Button 
                        className='absolute top-1/2 -translate-y-1/2 -left-[16px] w-[32px] h-[32px] bg-[var(--hover-color)] rounded-full'
                        style={{
                            display: itemIndex > 0 ? 'block' : 'none'
                        }}
                        onClick={showPrevItem}
                    >
                        <FontAwesomeIcon className='w-[14px] h-[14px] text-[var(--primary)]' icon={faChevronLeft} />
                    </Button>
                    <Button 
                        className='absolute top-1/2 -translate-y-1/2 -right-[16px] w-[32px] h-[32px] bg-[var(--hover-color)] rounded-full'
                        style={{
                            display: itemIndex === 0 ? 'block' : 'none'
                        }}
                        onClick={showNextItem}
                    >
                        <FontAwesomeIcon className='w-[14px] h-[14px] text-[var(--primary)]'icon={faChevronRight} />
                    </Button>
                </div>
            </div>

            {showModal && 
                <Modal>
                    <PlateDetail item={item} onClose={handleCloseModal} />
                </Modal>
            }
        </div>
    );
}

export default Info;