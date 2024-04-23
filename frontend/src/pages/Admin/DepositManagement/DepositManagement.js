import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DepositManagement.module.scss';

import Card from '~/components/Card';
import Table from '~/components/Table';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import Modal from '~/components/Modal';
import AuctionForm from '~/components/Form/AuctionForm';
import DeleteForm from '~/components/Form/DeleteForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRotate } from '@fortawesome/free-solid-svg-icons';

import * as paymentService from '~/services/paymentService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const TB_HEADER = [
    'STT',
    'Số điện thoại',
    'Biển số',
    'Loại',
    'Trạng thái',
    'Hành động',
];

const PAGE = 1;
const PER_PAGE = 10;

function DepositManagement() {
    // Query
    const [params, setParams] = useSearchParams({ 'page': PAGE });
    const page = Number(params.get('page')) || PAGE;
    const perPage = PER_PAGE;

    const [data, setData] = useState();
    // const [showModal, setShowModal] = useState(false);
    // const [isDelete, setIsDelete] = useState(false);
    // const [item, setItem] = useState();

    // Pagination
    const [pageCount, setPageCount] = useState();
    
    const fetchData = () => {
        paymentService
            .getAllPaymentsAdmin()
            .then((data) => {
                const length = Math.ceil(data.length / PER_PAGE);
                data = data.filter((item) => (item.payment_type.toLowerCase() === 'deposit'));
                setPageCount(length);
                return { data, length };
            })
            .then((data) => {
                // Calculate start & end index
                const startIndex = (page - 1) * perPage;
                const endIndex = page * perPage;

                console.log('[DEPOSIT MANAGEMENT]', data);
                setData(data.data.reverse().slice(startIndex, endIndex));
            });
    }

    // Fetch data when page changed
    useEffect(() => {
        fetchData();
    }, [page]);

    // Show modal
    // const handleShowModal = () => {
    //     setShowModal(true);
    // }

    // Close modal
    // const handleCloseModal = () => {
    //     setShowModal(false);
    // }

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

    // Verify item
    const handleVerify = (item) => {
        // setItem(item);
        // setIsDelete(false);
        // handleShowModal();
        paymentService
            .verifyDeposit(item.payment_id)
            .then((data) => {
                if (data?.message) {
                    toast.success(`Xác nhận đặt cọc cho User`);
                    fetchData();
                } else {
                    toast.error(data?.error);
                }
            });
    }

    // Refund item
    const handleRefund = (item) => {
        // setItem(item);
        // setIsDelete(true);
        // handleShowModal();
    }

    return (
        <div className="p-16">
            <div>
                <Card title='Đặt cọc'>
                    <Table header={TB_HEADER} fixedLast>
                        {data && data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{inputPhone(item.user_phone_number)}</td>
                                <td>{item.plate_id}</td>
                                <td>
                                    {(item.payment_type.toLowerCase() === 'deposit') && 'Đặt cọc'}
                                    {(item.payment_type.toLowerCase() === 'payment for bid winner') && 'Thanh toán'}
                                </td>
                                <td>
                                    <span className={cx('p-[2px_8px] rounded-full', 'status', {
                                        success: item.payment_status.toLowerCase() === 'verify',
                                        pending: item.payment_status.toLowerCase() === 'pending',
                                    })}>
                                        {(item.payment_status.toLowerCase() === 'verify') && 'Đã xác thực'}
                                        {(item.payment_status.toLowerCase() === 'pending') && 'Đang xử lý'}
                                        {(item.payment_status.toLowerCase() === 'refund') && 'Đã hoàn tiền'}
                                    </span>
                                </td>
                                <td className='flex justify-center'>
                                    {(item.payment_status.toLowerCase() === 'pending') &&
                                        <Button 
                                            className='mx-[4px] w-[30px] h-[30px] rounded-full' 
                                            primary
                                            onClick={() => handleVerify(item)}
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </Button>
                                    }
                                    {(item.payment_status.toLowerCase() === 'pending') && 
                                        <Button 
                                            className='mx-[4px] w-[30px] h-[30px] rounded-full' 
                                            primary
                                            onClick={() => handleRefund(item)}
                                        >
                                            <FontAwesomeIcon icon={faRotate} />
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
                    {/* <Button 
                        className='mt-8 p-[9px_16px]'
                        primary leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={handleAdd}
                    >
                        Thêm
                    </Button> */}
                </Card>

                {/* {showModal &&
                    <Modal>
                        {!isDelete ? (
                            <AuctionForm 
                                item={item} 
                                onClose={handleCloseModal} 
                                updateData={fetchData} 
                                service={paymentService}
                            />
                        ) : (
                            <DeleteForm 
                                id={item.auction_id}
                                name={item.plate_id}
                                onClose={handleCloseModal}
                                updateData={fetchData}
                                service={paymentService}
                            />
                        )}
                    </Modal>
                } */}
            </div>
        </div>
    );
}

export default DepositManagement;