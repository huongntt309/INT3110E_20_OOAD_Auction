import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './SignUp.module.scss';

import Input from '~/components/Input';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

function SignUp() {
    const [inputs, setInputs] = useState({
        phone_number: '',
        password: '',
        rePassword: '',
        first_name: '',
        last_name: '',
        role: 'user',
        dob: '',
        address: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]:  value,
        }));
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
        if (inputs.last_name === '') {
            toast.error('Vui lòng nhập Họ!');
            return false;
        }
        if (inputs.first_name === '') {
            toast.error('Vui lòng nhập Tên!');
            return false;
        }
        if (inputs.dob === '') {
            toast.error('Vui lòng nhập Ngày sinh!');
            return false;
        }
        if (inputs.address === '') {
            toast.error('Vui lòng nhập Địa chỉ!');
            return false;
        }
        if (inputs.phone_number === '') {
            toast.error('Vui lòng nhập Số điện thoại!');
            return false;
        }
        if (inputs.phone_number.replaceAll(' ', '').length < 10) {
            toast.error('Vui lòng nhập Số điện thoại hợp lệ!');
            return false;
        }
        if (inputs.password === '') {
            toast.error('Vui lòng nhập Mật khẩu!');
            return false;
        }
        if (inputs.rePassword === '') {
            toast.error('Vui lòng nhập Nhập lại mật khẩu!');
            return false;
        }
        if (inputs.rePassword !== inputs.password) {
            toast.error('Mật khẩu không khớp!');
            return false;
        }
        if (inputs.checked === false) {
            toast.error('Vui lòng đồng ý với điều khoản của chúng tôi!');
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        if (validation()) {
            authService
                .signUp(
                    inputs.phone_number.replaceAll(' ', ''),
                    inputs.password,
                    inputs.role,
                    inputs.first_name,
                    inputs.last_name,
                    inputs.dob,
                    inputs.address,
                )
                .then((data) => {
                    if (data?.message) {
                        toast.success(data.message);
                        setInputs({
                            phone_number: '',
                            password: '',
                            rePassword: '',
                            first_name: '',
                            last_name: '',
                            role: 'user',
                            dob: '',
                            address: '',
                        });
                    } else if (data?.error) {
                        toast.error(data.error)
                    }
                })
        }
    }

    return (
        <div className={cx('p-16', 'wrapper')}>
            <div className='flex justify-center items-center h-full'>
                <ToastContainer />
                <div className={cx('flex flex-col justify-center w-2/5', 'form')}>
                    <h1 className={cx('form-header')}>Đăng ký</h1>
                    <div className='grid grid-cols-2 gap-8'>
                        <Input 
                            className={cx('form-input')}
                            type={'text'} 
                            label='Họ'
                            placeholder='Họ'
                            name='last_name'
                            value={inputs.last_name}
                            onChange={handleInputChange}
                        />
                        <Input 
                            className={cx('form-input')}
                            type={'text'} 
                            label='Tên'
                            placeholder='Tên'
                            name='first_name'
                            value={inputs.first_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-8'>
                        <Input 
                            className={cx('form-input')}
                            type='text' 
                            label='Số điện thoại'
                            placeholder='Số điện thoại'
                            name='phone_number'
                            value={inputs.phone_number}
                            onChange={(e) => {
                                let { name, value } = e.target;
                                value = inputPhone(value);
                                
                                if (value.replaceAll(' ', '').length <= 10) {
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
                                } 
                            }}
                        />
                        <Input 
                            className={cx('form-input')}
                            type={'date'} 
                            label='Ngày sinh'
                            placeholder='Ngày sinh'
                            name='dob'
                            value={inputs.dob}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-8'>
                        <Input 
                            className={cx('form-input')}
                            type={showPassword ? 'text' : 'password'} 
                            label='Mật khẩu'
                            placeholder='Mật khẩu'
                            name='password'
                            value={inputs.password}
                            onChange={handleInputChange}
                        >
                            <Button className={cx('input-btn')} onClick={() => setShowPassword(!showPassword)}>
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </Button>
                        </Input>
                        <Input 
                            className={cx('form-input')}
                            type={showRePassword ? 'text' : 'password'} 
                            label='Nhập lại mật khẩu'
                            placeholder='Nhập lại mật khẩu'
                            name='rePassword'
                            value={inputs.rePassword}
                            onChange={handleInputChange}
                        >
                            <Button className={cx('input-btn')} onClick={() => setShowRePassword(!showRePassword)}>
                                <FontAwesomeIcon icon={showRePassword ? faEye : faEyeSlash} />
                            </Button>
                        </Input>
                    </div>
                    <Input 
                        className={cx('form-input')}
                        type={'text'} 
                        label='Địa chỉ'
                        placeholder='Địa chỉ'
                        name='address'
                        value={inputs.address}
                        onChange={handleInputChange}
                    />
                    
                    <Button className={cx('w-full', 'submit-btn')} primary onClick={handleSubmit}>Đăng ký</Button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;