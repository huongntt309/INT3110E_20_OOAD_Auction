import classNames from "classnames/bind";
import { useState } from "react";
import styles from './ProfileForm.module.scss';

import Input from '~/components/Input';
import CustomForm from "../CustomForm";

const cx = classNames.bind(styles);

function ProfileForm({ item, onClose, updateData }) {
    const [inputs, setInputs] = useState({
        first_name: item !== undefined ? item.first_name : '',
        last_name: item !== undefined ? item.last_name : '',
        // gender: item !== undefined ? item.gender : 'Nam',
        birthday: item !== undefined ? item.dob : '',
        address: item !== undefined ? item.address : '',
        // phone: item !== undefined ? item.phone : '',
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
            // console.log(inputs.birthday);
            // Create
            // shopService
            //     .createItem(
            //         inputs.name, 
            //     )
            //     .then((data) => {
            //         updateData(data);
            //     })
        } else {
            // Update
        }
        onClose();
    }
    
    return (
        <CustomForm 
            title='Thông tin cá nhân' 
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin cơ bản</h3>
            <Input 
                className={cx('form-input')}
                type='text'
                placeholder='Họ'
                label='Họ'
                inline
                name='last_name'
                value={inputs.last_name}
                onChange={handleInputChange}
            />
            <Input 
                className={cx('form-input')}
                type='text'
                placeholder='Tên'
                label='Tên'
                inline
                name='first_name'
                value={inputs.first_name}
                onChange={handleInputChange}
            />
            <Input 
                className={cx('form-input')}
                type='date'
                placeholder='Ngày sinh'
                label='Ngày sinh'
                inline
                name='birthday'
                value={inputs.birthday}
                onChange={handleInputChange}
            />
            <Input 
                className={cx('form-input')}
                type='text'
                placeholder='Địa chỉ'
                label='Địa chỉ'
                inline
                name='address'
                value={inputs.address}
                onChange={handleInputChange}
            />
            {/* <div className='flex justify-between w-2/5'>
                <Input
                    id='staff-form-male'
                    className={cx('flex items-center', 'form-radio')}
                    type='radio'
                    label='Nam'
                    inline
                    small
                    name='gender'
                    checked={'Nam' === inputs.gender}
                    onChange={(e) => {
                        const { name } = e.target;
                        setInputs((prev) => ({
                            ...prev,
                            [name]: 'Nam',
                        }));
                    }}
                />
                <Input
                    id='staff-form-female'
                    className={cx('flex items-center', 'form-radio')}
                    type='radio'
                    label='Nữ'
                    inline
                    small
                    name='gender'
                    checked={'Nữ' === inputs.gender}
                    onChange={(e) => {
                        const { name } = e.target;
                        setInputs((prev) => ({
                            ...prev,
                            [name]: 'Nữ',
                        }));
                    }}
                />
            </div> */}

            {/* <h3 className={cx('font-semibold uppercase mb-4', 'form-header')}>Thông tin liên lạc</h3>
            <Input 
                className={cx('form-input')}
                type='text'
                placeholder='Số điện thoại'
                label='SĐT'
                inline
                small
                name='phone'
                value={inputs.phone}
                onChange={(e) => {
                    let { name, value } = e.target;
                    value =  value.replace(/[^0-9\s]/g, '');
                    if (value.length === 4 || value.length === 9) 
                        value += ' ';
                    
                    if (value.length < 13) {
                        setInputs((prev) => ({
                            ...prev,
                            [name]: value,
                        }));
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === ' ') {
                        // Prevent press space key
                        e.preventDefault();
                    } else if (e.key === 'Backspace') {
                        // Handle delete
                        if (inputs.phone[inputs.phone.length - 1] === ' ') {
                            setInputs((prev) => ({
                                ...prev,
                                phone: inputs.phone.slice(0, -1),
                            }))
                        }
                    }
                }}
            /> */}
        </CustomForm>
    );
}

export default ProfileForm;