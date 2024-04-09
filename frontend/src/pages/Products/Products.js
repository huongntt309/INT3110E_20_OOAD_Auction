import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from './Products.module.scss';

import Card from '~/components/Card';
import Button from '~/components/Button';
import Modal from "~/components/Modal";
import PlateDetail from "~/components/Form/PlateDetail";
import config from '~/config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { toast } from 'react-toastify';
import { authUserContext } from '~/App';

import * as productsService from '~/services/productsService';

const cx = classNames.bind(styles);

function Products() {
    const [data, setData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState();
    const context = useContext(authUserContext);

    const fetchData = () => {
        productsService
            .getAllItems()
            .then((data) => {
                console.log('PRODUCTS', data);
                setData(data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

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

    const remainingTime = (item) => {
        const start = new Date(item.start_date);
        const end = new Date(item.end_date);
        
        var millisBetween = start.getTime() - end.getTime();
        var days = millisBetween / (1000 * 3600 * 24);

        return `${Math.round(Math.abs(days))} ngày`;
    }

    return (
        <div className='px-32 py-16'>
            <div className='grid grid-cols-4 gap-8'>
                {data && data.map((item, index) => (
                    <Card className={cx('card')} key={index}>
                        <div className='flex flex-col justify-center items-center border-[4px] border-solid border-[var(--black)] aspect-[2/1] rounded-[4px]'>
                            <div className='text-[64px] leading-[64px] font-["UKNumberPlate"]'>{item.plate_id.split('-').shift()}</div>
                            <div className='text-[64px] leading-[64px] font-["UKNumberPlate"]'>{item.plate_id.split('-').pop()}</div>
                        </div>
                        <div className='mt-4'>
                            <div className='flex text-[14px] text-[var(--second-text-color)]'>
                                <h3>{item.vehicle_type}</h3>
                                <h3 className='ml-8'>{item.city}</h3>
                            </div>
                            <div className='flex items-center mt-4'>
                                <div className='flex justify-center items-center w-[34px] h-[34px] bg-[var(--hover-color)] rounded-full'>
                                    <FontAwesomeIcon className='w-[18px] h-[18px] text-[var(--primary)]' icon={faClock} />
                                </div>
                                <div className='ml-8'>
                                    <h3 className='text-[14px] text-[var(--second-text-color)]'>Thời gian đăng ký còn lại</h3>
                                    <h3 className='text-[16px] font-semibold'>
                                        {remainingTime(item)}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center mt-4'>
                            <Button 
                                className='flex justify-center p-[9px_16px] mt-4 w-full' 
                                to={context.authUser ? config.routes.room : config.routes.login} 
                                state={item} 
                                primary
                                onClick={() => {
                                    if (!context.authUser) {
                                        toast.error('Vui lòng đăng nhập!');
                                    }
                                }}
                            >
                                Đăng ký đấu giá
                            </Button>
                            <Button className='mt-4 text-[var(--primary)] font-normal' onClick={() => showDetail(item)}>Xem thông tin chi tiết biển số</Button>
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