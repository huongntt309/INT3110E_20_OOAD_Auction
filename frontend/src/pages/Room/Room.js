import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import BidResult from '~/components/Form/BidResult';
import DepositForm from "~/components/Form/DepositForm";
import config from '~/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authUserContext } from '~/App';

import * as bidService from '~/services/bidService';
import * as auctionService from '~/services/auctionService';

function Room() {
    const location = useLocation();
    const item = location.state;
    const context = useContext(authUserContext);
    const user = context && context.authUser?.user;
    const token = context && context.authUser?.token;

    const [bid, setBid] = useState('');
    const [allBids, setAllBids] = useState();
    const [auction, setAuction] = useState();
    // const [bidId, setBidId] = useState();
    // const [bidStatus, setBidStatus] = useState('PENDING');

    const [modal, setModal] = useState();
    const [showModal, setShowModal] = useState(false);
    const [win, setWin] = useState(false);

    // Time
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const intervalId = useRef();

    const fetchData = () => {
        bidService
            .getAllBids(token)
            .then((data) => {
                // Sort data: Giảm dần
                data.sort((a, b) => (b.bid_price - a.bid_price))
                // Filter data by: auction_id
                data = data.filter((bid) => (bid.auction_id === item.auction_id));
                console.log('[ROOM]: bids', data);
                // console.log('[ROOM]: item', item);
                if (data.length > 0) setAllBids(data.slice(0, 3));
                else setAllBids();
                return data;
            });
        auctionService
            .getItemById(item.auction_id)
            .then((data) => {
                console.log('[ROOM]: auction', data);
                setAuction(data);
            });
    }

    useEffect(() => {
        if (item) fetchData();
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

    const validation = () => {
        if (!item) {
            toast.error('Vui lòng chọn biển số để đấu giá!');
            return false;
        }
        if (bid === '') {
            toast.error('Vui lòng nhập Số tiền!');
            return false;
        }
        if (allBids && (Number(bid.replaceAll(',', '')) <= allBids[0].bid_price)) {
            toast.error('Vui lòng nhập Số tiền lớn hơn Giá hiện tại!');
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        if (validation()) {
            bidService
                .createBid(
                    item.auction_id, 
                    user.phone_number, 
                    Number(bid.replaceAll(',', '')),
                )
                .then((data) => {
                    if (data && data?.message) {
                        toast.success(data.message);
                    } else if (data && data?.error) {
                        toast.error(data.error);
                    }
                    setBid('');
                    fetchData();
                });
        }
    }

    // useEffect(() => {
    //     if (allBids) {
    //         const bid = allBids.find((item) => item.user_phone_number === user.phone_number);
    //         setBidId(bid.bid_id);
    //         setBidStatus(bid.bid_status);
    //     }
    // }, [allBids]);
    
    // useEffect(() => {
    //     // console.log('[ROOM]: bid_id', bidId);
    //     if (bidId && bidStatus.toLowerCase() === 'pending') {
    //         handleDeposit(item, bidId);
    //     }
    // }, [bidId]);

    const handleShowModal = () => {
        setShowModal(true);
    } 

    const handleCloseModal = () => {
        setShowModal(false);
    }

    // Handle deposit
    // const handleDeposit = (item, bid_id) => {
    //     handleShowModal();
    //     setModal(<DepositForm item={item} bidId={bid_id} onClose={handleCloseModal} />);
    // }

    // Show result
    const showResult = () => {
        handleShowModal();
        setModal(
            <BidResult 
                item={item}
                win={win}
                winning_bid={allBids && inputCurrency(allBids[0].bid_price.toString())}
                onClose={handleCloseModal}
            />
        );
    }

    // Count down
    const getTime = () => {
        const end = new Date(`${auction && auction.end_date}T00:00`).getTime();

        intervalId.current = setInterval(() => {
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

    return (
        <div className='px-32 py-16'>
            <div>
                <div className='grid grid-cols-[auto_45%] gap-16'>
                    <div className='px-32 py-8 min-h-[367px] rounded-[10px] shadow-[0_4px_20px_var(--shadow-color)]'>
                        <div className='mx-auto px-16 py-4 w-fit text-center border-[0px] border-[var(--primary)] rounded-[6px]'>
                            <h3 className='text-[20px] uppercase font-semibold'>Thời gian đấu giá còn lại</h3>
                            <div className='flex justify-evenly'>
                                <span className='flex flex-col items-center'>
                                    <span className='text-[60px] leading-[60px] text-[var(--primary)] font-["UKNumberPlate"]'>
                                        {(item && ((days >= 10) ? days : `0${days}`)) || '00'}
                                    </span>
                                    <span className='text-[16px] leading-[18px] font-normal'>Ngày</span>
                                </span>
                                <span className='text-[60px] leading-[60px] text-[var(--primary)] font-["UKNumberPlate"]'>:</span>
                                <span className='flex flex-col items-center'>
                                    <span className='text-[60px] leading-[60px] text-[var(--primary)] font-["UKNumberPlate"]'>
                                        {(item && ((hours >= 10) ? hours : `0${hours}`)) || '00'}
                                    </span>
                                    <span className='text-[16px] leading-[18px] font-normal'>Giờ</span>
                                </span>
                                <span className='text-[60px] leading-[60px] text-[var(--primary)] font-["UKNumberPlate"]'>:</span>
                                <span className='flex flex-col items-center'>
                                    <span className='text-[60px] leading-[60px] text-[var(--primary)] font-["UKNumberPlate"]'>
                                        {(item && ((minutes >= 10) ? minutes : `0${minutes}`)) || '00'}
                                    </span>
                                    <span className='text-[16px] leading-[18px] font-normal'>Phút</span>
                                </span>
                                <span className='text-[60px] leading-[60px] text-[var(--primary)] font-["UKNumberPlate"]'>:</span>
                                <span className='flex flex-col items-center'>
                                    <span className='text-[60px] leading-[60px] text-[var(--primary)] font-["UKNumberPlate"]'>
                                        {(item && ((seconds >= 10) ? seconds : `0${seconds}`)) || '00'}
                                    </span>
                                    <span className='text-[16px] leading-[18px] font-normal'>Giây</span>
                                </span>
                            </div>
                        </div>
                        {item ? (
                            <div className='flex flex-col justify-center items-center mt-16 mx-auto px-8 w-fit border-[4px] border-[var(--black)] aspect-[2/1] rounded-[6px]'>
                                <div className='text-[64px] leading-[64px] font-["UKNumberPlate"]'>
                                    {item.plate_id.split('-').shift()}
                                </div>
                                <div className='text-[64px] leading-[64px] font-["UKNumberPlate"]'>
                                    {item.plate_id.split('-').pop()}
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-center items-center mt-16 mx-auto px-8 w-fit border-[4px] border-[var(--black)] aspect-[2/1] rounded-[6px]'>
                                <h3 className='text-[20px]'>Vui lòng chọn biển số để đấu giá</h3>
                                <Button className='mt-4 p-[9px_16px]' to={config.routes.auction} primary>Chọn biển số</Button>
                            </div>
                        )}
                    </div>
                    <div className='px-16 py-8 min-h-[367px]'>
                        <h3 className='text-[20px] uppercase font-semibold text-center'>Diễn biến đấu giá</h3>
                        <div className='min-h-[165px]'>
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
                        <div className='flex items-center mt-4 mb-8 mx-auto px-8 py-2 w-fit border-[0px] border-[var(--primary)] rounded-[8px]'>
                            <span>Giá hiện tại:</span>
                            <span className='ml-4 text-[20px] font-bold'>
                                {(allBids && inputCurrency(allBids[0].bid_price.toString())) || '0'} VNĐ
                            </span>
                        </div>
                        <Input 
                            type='text' 
                            inline
                            label='Đặt giá'
                            placeholder='VD: 100,000,000'
                            name='email'
                            value={inputCurrency(bid)}
                            onChange={(e) => setBid(e.target.value)}
                        />
                        {(auction && auction.auction_status.toLowerCase() === 'đang diễn ra') ? (
                            <Button 
                                className='p-[9px_16px] w-full' 
                                primary 
                                onClick={handleSubmit}
                            >
                                Đặt giá
                            </Button>
                        ) : (
                            <Button 
                                className='p-[9px_16px] w-full' 
                                primary 
                                disable
                            >
                                Đã kết thúc đấu giá
                            </Button>
                        )}
                    </div>
                </div>

                {showModal && 
                    <Modal className='w-2/5'>
                        {modal}
                    </Modal>
                }
            </div>
        </div>
    );
}

export default Room;