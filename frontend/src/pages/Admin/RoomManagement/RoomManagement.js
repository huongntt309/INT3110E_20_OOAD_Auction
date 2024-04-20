import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Card from '~/components/Card';
import Button from '~/components/Button';
import config from '~/config';
import { authUserContext } from '~/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import * as bidService from '~/services/bidService';

function RoomManagement() {
    const location = useLocation();
    const auction = location.state;
    const context = useContext(authUserContext);
    // const user = context && context.authUser?.user;
    const token = context && context.authUser?.token;

    const [allUsers, setAllUsers] = useState();
    const [allBids, setAllBids] = useState();
    
    const fetchData = () => {
        bidService
            .getAllBids(token)
            .then((data) => {
                // Sort data: Giảm dần
                data.sort((a, b) => (b.bid_price - a.bid_price))
                // Filter data by: auction_id
                data = data.filter((bid) => (bid.auction_id === auction.auction_id));
                // console.log('[ROOM]',  data);
                if (data.length > 0) setAllBids(data);
                else setAllBids();
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const inputCurrency = (value) => {
        value =  value.replace(/[^0-9\s]/g, '');
        value =  value.replaceAll(',', '');
        const len = value.length;
    
        let count = 0;
            
        for (let i = 1; i <= ((len % 3 === 0) ? Math.floor(len / 3) - 1 : Math.floor(len / 3)); i++) {
            const position = - (i * 3 + count);
            value = `${value.slice(0, position)},${value.slice(position)}`;
            count++;
        }
    
        return value;
    }

    const inputPhone = (value) => {
        value = value.replace(/[^0-9\s]/g, '');
        value = value.replaceAll(' ', '');
        const len = value.length;
    
        let count = 0;
    
        for (let i = 1; i <= ((len % 4 === 0) ? Math.floor(len / 4) - 1 : Math.floor(len / 4)); i++) {
            const position = i * 4 + count;
            value = `${value.slice(0, position)} ${value.slice(position)}`;
            count++;
        }
    
        return value;
    }

    return (
        <div className="p-16">
            <div>
                <Card title='Phòng đấu giá'>
                    <div className='grid grid-cols-2 text-[20px]'>
                        <h3>
                            <span>Biển số: </span>
                            <span className='font-semibold'>
                                {auction && auction.plate_id}
                            </span>
                        </h3>
                        <h3>
                            <span>Thời gian đấu giá còn lại: </span>
                            <span className='font-semibold'>
                                <span>10 phút </span>
                                <span>00 giây</span>
                            </span>
                        </h3>
                    </div>
                    <div className='grid grid-cols-2 gap-16 mt-4'>
                        <div>
                            <h3 className='uppercase font-semibold text-center'>Danh sách người tham gia</h3>
                            <div className='h-[220px] overflow-scroll'>
                                {allBids && allBids.map((bid, index) => (
                                    <div className='flex justify-between items-center' key={index}>
                                        <div className='mt-4 mb-[21px] font-semibold'>
                                            {bid && inputPhone(bid.user_phone_number)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex items-center mb-8 mx-auto px-8 py-2 w-fit border-[0px] border-[var(--primary)] rounded-[8px]'>
                                <span>Tổng số người:</span>
                                <span className='ml-4 text-[20px] font-bold'>
                                    {(allBids && allBids.length) || '0'} người
                                </span>
                            </div>
                        </div>
                        <div>
                            <h3 className='uppercase font-semibold text-center'>Diễn biến đấu giá</h3>
                            <div className='h-[220px] overflow-scroll'>
                                {allBids && allBids.map((bid, index) => (
                                    <div className='flex justify-between items-center' key={index}>
                                        <div>
                                            <h3 
                                                className='mt-4 font-bold' 
                                                style={{ color: !index && 'var(--primary)' }}
                                            >
                                                {bid && inputCurrency(bid.bid_price.toString())} VNĐ
                                            </h3>
                                            <p className='text-[14px] text-[var(--second-text-color)]'>
                                                {bid && bid.bid_status}
                                            </p>
                                        </div>
                                        <div className='font-semibold'>
                                            {bid && inputPhone(bid.user_phone_number)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex items-center mb-8 mx-auto px-8 py-2 w-fit border-[0px] border-[var(--primary)] rounded-[8px]'>
                                <span>Giá hiện tại:</span>
                                <span className='ml-4 text-[20px] font-bold'>
                                    {(allBids && inputCurrency(allBids[0].bid_price.toString())) || '0'} VNĐ
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <Button
                            className='p-[9px_16px]'
                            text
                            to={config.routes.auction_management}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <span className='ml-4'>Quay lại</span>
                        </Button>
                        <div className='flex'>
                            <Button
                                className='p-[9px_16px] ml-4'
                                primary
                            >
                                Bắt đầu đấu giá
                            </Button>
                            <Button
                                className='p-[9px_16px] ml-4'
                                outline
                            >
                                Kết thúc đấu giá
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default RoomManagement;