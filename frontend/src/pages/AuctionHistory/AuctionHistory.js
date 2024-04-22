import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './AuctionHistory.module.scss';

import Table from '~/components/Table';
import Button from '~/components/Button';
import Modal from "~/components/Modal";
import Pagination from '~/components/Pagination';
import PlateDetail from "~/components/Form/PlateDetail";
import config from '~/config';
import PaymentForm from "~/components/Form/PaymentForm";
import { toast } from 'react-toastify';
import { authUserContext } from '~/App';

import * as auctionService from '~/services/auctionService';

const cx = classNames.bind(styles);

const PAGE = 1;
const PER_PAGE = 10;

const TB_HEADER = [
    'STT',
    'Biển số',
    'Trạng thái',
    'Giá trúng đấu giá',
    'Giá cao nhất của tôi',
    'Hành động',
];

function AuctionHistory() {
    const context = useContext(authUserContext);
    const user = context && context.authUser?.user;
    
    // Query
    const [params, setParams] = useSearchParams({ 'page': PAGE });
    const page = Number(params.get('page')) || PAGE;
    const perPage = PER_PAGE;

    const [data, setData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState();
    const [item, setItem] = useState();
    // const context = useContext(authUserContext);

    // Pagination
    const [pageCount, setPageCount] = useState();

    const fetchData = () => {
        auctionService
            .getRegisterItems(user.phone_number)
            .then((data) => {
                console.log('[WAITING AUCTION]', data);
                const verifyData = [...data?.Verify];
                // const pendingData = [...data?.PENDING];
                if (verifyData.length > 0) {
                    verifyData.forEach((item) => {
                        item.status = 'verify';
                    });
                }
                // if (pendingData.length > 0) {
                //     pendingData.forEach((item) => {
                //         item.status = 'pending';
                //     });
                // }
                // data = [...verifyData, ...pendingData];
                data = [...verifyData];
                console.log('[WAITING AUCTION]', data);
                const length = Math.ceil(data.length / PER_PAGE);
                setPageCount(length);
                return { data, length };
            })
            .then((data) => {
                // Calculate start & end index
                const startIndex = (page - 1) * perPage;
                const endIndex = page * perPage;

                setData(data.data.slice(startIndex, endIndex));
            });
    }

    useEffect(() => {
        fetchData();
    }, [page]);

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

    const handleShowModal = () => {
        setShowModal(true);
    }
    
    const handleCloseModal = () => {
        setShowModal(false);
    }

    // Handle payment
    const handlePayment = (item) => {
        handleShowModal();
        setItem(item);
    }

    return (
        <div className="p-16">
            <div>
                <h1 className='mb-8 text-[32px] text-center font-bold uppercase'>Lịch sử đấu giá</h1>
                <Table header={TB_HEADER} fixedLast>
                    {data && data.map((item, index) => (
                        <tr key={item.auction_id}>
                            <td>{index + 1}</td>
                            <td>{item.plate_id}</td>
                            <td>
                                <span className={cx('p-[2px_8px] rounded-full', 'status', {
                                    success: item.bid_winner_id === user.phone_number,
                                })}>
                                    {(item.bid_winner_id === user.phone_number) ? 'Đã trúng' : 'Không trúng'}
                                </span>
                            </td>
                            <td>{inputCurrency((100000000).toString())} VNĐ</td>
                            <td>{inputCurrency((100000000).toString())} VNĐ</td>
                            <td className='flex justify-center'>
                                {(item.bid_winner_id === user.phone_number) &&
                                    <Button 
                                        className='p-[9px]' 
                                        primary
                                        onClick={() => handlePayment(item)}
                                    >
                                        Thanh toán
                                    </Button>
                                }
                            </td>
                        </tr>
                    ))}
                </Table>
                <Pagination 
                    pageCount={pageCount} 
                    page={page} 
                    params={params}
                    setParams={setParams}
                />

                {showModal &&
                    <Modal>
                        <PaymentForm 
                            item={item} 
                            onClose={handleCloseModal} 
                        />
                    </Modal>
                }
            </div>
        </div>
    );
}

export default AuctionHistory;