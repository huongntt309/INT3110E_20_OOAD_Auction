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
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import * as paymentService from '~/services/paymentService';

const cx = classNames.bind(styles);

const TB_HEADER = [
    'STT',
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
    const [showModal, setShowModal] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [item, setItem] = useState();

    // Pagination
    const [pageCount, setPageCount] = useState();
    
    const fetchData = () => {
        paymentService
            .getAllPaymentsAdmin()
            .then((data) => {
                const length = Math.ceil(data.length / PER_PAGE);
                setPageCount(length);
                return { data, length };
            })
            .then((data) => {
                // Calculate start & end index
                const startIndex = (page - 1) * perPage;
                const endIndex = page * perPage;

                setData(data.data.reverse().slice(startIndex, endIndex));
            });
    }

    // Fetch data when page changed
    useEffect(() => {
        fetchData();
    }, [page]);

    // Show modal
    const handleShowModal = () => {
        setShowModal(true);
    }

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
    }

    // Add item
    const handleAdd = () => {
        setItem();
        setIsDelete(false);
        handleShowModal();
    }

    // Edit item
    const handleEdit = (item) => {
        setItem(item);
        setIsDelete(false);
        handleShowModal();
    }

    // Delete item
    const handleDelete = (item) => {
        setItem(item);
        setIsDelete(true);
        handleShowModal();
    }

    return (
        <div className="p-16">
            <div>
                <Card title='Đặt cọc'>
                    <Table header={TB_HEADER} fixedLast>
                        {data && data.map((item, index) => (
                            <tr key={item.auction_id}>
                                <td>{index + 1}</td>
                                <td>{item.payment_type}</td>
                                <td>
                                    <span className={cx('p-[2px_8px] rounded-full', 'status', {
                                        success: item.payment_status.toLowerCase() === 'verify',
                                        pending: item.payment_status.toLowerCase() === 'pending',
                                    })}>
                                        {item.payment_status}
                                    </span>
                                </td>
                                <td className='flex justify-center'>
                                    <Button 
                                        className='mx-[4px] w-[30px] h-[30px] rounded-full' 
                                        primary
                                        onClick={() => handleEdit(item)}
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                    </Button>
                                    <Button 
                                        className='mx-[4px] w-[30px] h-[30px] rounded-full' 
                                        primary
                                        onClick={() => handleDelete(item)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
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

                {showModal &&
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
                }
            </div>
        </div>
    );
}

export default DepositManagement;