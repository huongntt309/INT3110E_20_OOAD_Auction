import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Card from '~/components/Card';
import Button from '~/components/Button';
import config from '~/config';
import { authUserContext } from '~/App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import * as bidService from '~/services/bidService';
import * as auctionService from '~/services/auctionService';

function RoomManagement() {
    const location = useLocation();
    const auction = location.state;
    const context = useContext(authUserContext);
    // const user = context && context.authUser?.user;
    const token = context && context.authUser?.token;

    const [allUsers, setAllUsers] = useState();
    const [allBids, setAllBids] = useState();
    
    // Time
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    let intervalId = useRef();
    
    const fetchData = () => {
        bidService
            .getAllBids(token)
            .then((data) => {
                // Sort data: Giảm dần
                data.sort((a, b) => (b.bid_price - a.bid_price))
                // Filter data by: auction_id
                data = data.filter((bid) => (bid.auction_id === auction.auction_id));
                console.log('[ROOM]', data);
                if (data.length > 0) setAllBids(data);
                else setAllBids();
            });
        bidService
            .getAllBids(token)
            .then((data) => {
                data = data.filter((bid) => (bid.auction_id === auction.auction_id));
                setAllUsers(data);
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
    
    // Count down
    const getTime = () => {
        const end = new Date(`${auction.end_date}T00:00`).getTime();

        intervalId = setInterval(() => {
            const now = new Date().getTime();
            const distance = end - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
            const seconds = Math.floor(distance % (1000 * 60) / 1000);

            if (distance < 0) {
                // Stop
                clearInterval(intervalId.current);
                setDays(0);
                setHours(0);
                setMinutes(0);
                setSeconds(0);
            } else {
                // Update time
                setDays(days);
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            }
        }, 1000);

        // console.log(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds `);
    }
    
    useEffect(() => {
        getTime();

        return () => clearInterval(intervalId.current);
    });

    // Fetch data every second
    useEffect(() => {
        fetchData();
    }, [seconds]);

    useEffect(() => {
        if (auction) {
            if ((auction.auction_status.toLowerCase() === 'đã kết thúc') && auction.bid_winner_id === 'null') {
                let bid_winner_id = 'null';
                if (allBids) {
                    for (let i = 0; i < allBids.length; i++) {
                        if (allBids[i].bid_status.toLowerCase() === 'verify') {
                            bid_winner_id = allBids[i].user_phone_number;
                            break;
                        }
                    }
                }
                
                // Update
                auctionService
                    .updateItem(
                        auction.auction_id,
                        auction.plate_id,
                        auction.start_date,
                        auction.end_date,
                        auction.auction_status,
                        bid_winner_id,
                        auction.city,
                        auction.plate_type,
                        auction.vehicle_type,
                    )
                    .then((data) => {
                        // console.log('[PRODUCT FORM]', item.auction_id);
                        if (data?.message) {
                            // toast.success('Cập nhật thành công!');
                            console.log('[ROOM]: bid winner', auction);
                        } else {
                            // toast.error(data?.error);
                        }
                    });
            }
        }
    }, [auction]);

    return (
        <div className="p-16">
            <div>
                <Card title='Phòng đấu giá'>
                    <div className='grid grid-cols-[40%_auto] text-[20px]'>
                        <h3>
                            <span>Biển số: </span>
                            <span className='font-semibold'>
                                {auction && auction.plate_id}
                            </span>
                        </h3>
                        <h3>
                            <span>Thời gian đấu giá còn lại: </span>
                            <span className='font-semibold'>
                                <span>{(days >= 10) ? days : `0${days}`} ngày </span>
                                <span>{(hours >= 10) ? hours : `0${hours}`} giờ </span>
                                <span>{(minutes >= 10) ? minutes : `0${minutes}`} phút </span>
                                <span>{(seconds >= 10) ? seconds : `0${seconds}`} giây</span>
                            </span>
                        </h3>
                    </div>
                    <div className='grid grid-cols-2 gap-16 mt-4'>
                        <div>
                            <h3 className='uppercase font-semibold text-center'>Danh sách người tham gia</h3>
                            <div className='h-[220px] overflow-scroll'>
                                {allUsers && allUsers.map((user, index) => (
                                    <div className='flex justify-between items-center' key={index}>
                                        <div>
                                            <div className='mt-4 font-semibold'>
                                                {user && inputPhone(user.user_phone_number)}
                                            </div>
                                            <div className='uppercase text-[var(--second-text-color)]'>
                                                {user && user.bid_status}
                                            </div>
                                        </div>
                                        {/* {(user.bid_status.toLowerCase() === 'pending') &&
                                            <Button
                                                className='w-[30px] h-[30px] rounded-full'
                                                onClick={() => handleVerifyDeposit(user)}
                                                primary
                                            >
                                                <FontAwesomeIcon icon={faCheck} />
                                            </Button>
                                        } */}
                                    </div>
                                ))}
                            </div>
                            <div className='flex items-center mb-8 mx-auto px-8 py-2 w-fit border-[0px] border-[var(--primary)] rounded-[8px]'>
                                <span>Tổng số người:</span>
                                <span className='ml-4 text-[20px] font-bold'>
                                    {(allUsers && allUsers.length) || '0'} người
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
                                            <p className='text-[14px] text-[var(--second-text-color)] uppercase'>
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
                        {/* <div className='flex'>
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
                        </div> */}
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default RoomManagement;