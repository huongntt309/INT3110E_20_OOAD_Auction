import classNames from "classnames/bind";
import { useState } from "react";
import styles from './AuctionForm.module.scss';

import Input from '~/components/Input';
import CustomForm from "../CustomForm";
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AuctionForm({ item, onClose = () => {}, updateData = () => {}, service }) {
    const [inputs, setInputs] = useState({
        plate_id: item !== undefined ? item.plate_id : '',
        start_date: item !== undefined ? item.start_date : '',
        end_date: item !== undefined ? item.end_date : '',
        auction_status: item !== undefined ? item.auction_status : '',
        bid_winner_id: "null",
        city: item !== undefined ? item.city : '',
        plate_type: item !== undefined ? item.plate_type : '',
        vehicle_type: item !== undefined ? item.vehicle_type : '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = () => {
        if (item === undefined) {
            // Create
            service
                .createItem(
                    inputs.plate_id,
                    inputs.start_date,
                    inputs.end_date,
                    inputs.city,
                    inputs.plate_type,
                    inputs.vehicle_type,
                )
                .then((data) => {
                    // console.log('[CREATE]', data);
                    if (data?.message) {
                        updateData();
                        toast.success('Thêm thành công!');
                    } else {
                        toast.error(data?.error);
                    }
                })
        } else {
            // Update
            service
                .updateItem(
                    item.auction_id,
                    inputs.plate_id,
                    inputs.start_date,
                    inputs.end_date,
                    inputs.auction_status,
                    inputs.bid_winner_id,
                    inputs.city,
                    inputs.plate_type,
                    inputs.vehicle_type,
                )
                .then((data) => {
                    // console.log('[PRODUCT FORM]', item.auction_id);
                    if (data?.message) {
                        updateData();
                        toast.success('Cập nhật thành công!');
                    } else {
                        toast.error(data?.error)
                    }
                })
        }
        onClose();
    }
    
    return (
        <CustomForm
            title='Thông tin đấu giá'
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className='grid grid-cols-2 gap-8'>
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Biển số'
                    label='Biển số'
                    inline
                    name='plate_id'
                    value={inputs.plate_id}
                    onChange={handleInputChange}
                    readOnly={item !== undefined}
                />
                
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Địa chỉ'
                    label='Địa chỉ'
                    inline
                    name='city'
                    value={inputs.city}
                    onChange={handleInputChange}
                />
            </div>
            
            <div className='grid grid-cols-2 gap-8'>
                <Input 
                    className={cx('form-input')}
                    type='date'
                    placeholder='Bắt đầu'
                    label='Bắt đầu'
                    inline
                    name='start_date'
                    value={inputs.start_date}
                    onChange={handleInputChange}
                />
                
                <Input 
                    className={cx('form-input')}
                    type='date'
                    placeholder='Kết thúc'
                    label='Kết thúc'
                    inline
                    name='end_date'
                    value={inputs.end_date}
                    onChange={handleInputChange}
                />
            </div>
            
            <div className='grid grid-cols-2 gap-8'>
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Loại biển'
                    label='Loại biển'
                    inline
                    name='plate_type'
                    value={inputs.plate_type}
                    onChange={handleInputChange}
                />
                
                <Input 
                    className={cx('form-input')}
                    type='text'
                    placeholder='Loại xe'
                    label='Loại xe'
                    inline
                    name='vehicle_type'
                    value={inputs.vehicle_type}
                    onChange={handleInputChange}
                />
            </div>
        </CustomForm>
    );
}

export default AuctionForm;