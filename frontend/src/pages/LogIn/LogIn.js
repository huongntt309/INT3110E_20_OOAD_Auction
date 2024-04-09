import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './LogIn.module.scss';

import Input from '~/components/Input';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

function LogIn() {
    const [inputs, setInputs] = useState({
        mobile: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]:  value,
        }));
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
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

    const showToastMessage = (message, type='success') => toast[type](message);

    const validation = () => {
        if (inputs.mobile === '') {
            showToastMessage('Vui lòng nhập Số điện thoại!', 'error');
            return false;
        }
        if (inputs.mobile.replaceAll(' ', '').length < 10) {
            showToastMessage('Vui lòng nhập Số điện thoại hợp lệ!', 'error');
            return false;
        }
        if (inputs.password === '') {
            showToastMessage('Vui lòng nhập Mật khẩu', 'error');
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        if (validation()) {
            authService
                .login(inputs.mobile, inputs.password)
                .then((data) => {
                    showToastMessage('Đăng nhập thành công', 'success');
                })
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className='flex justify-center items-center h-full'>
                <ToastContainer />
                <div className={cx('flex flex-col justify-center w-2/5', 'form')}>
                    <h1 className={cx('form-header')}>Đăng nhập</h1>
                    <Input 
                        className={cx('form-input')}
                        type='text' 
                        label='Số điện thoại'
                        placeholder='Số điện thoại'
                        name='mobile'
                        value={inputs.mobile}
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
                        type={showPassword ? 'text' : 'password'} 
                        label='Mật khẩu'
                        placeholder='Mật khẩu'
                        name='password'
                        value={inputs.password}
                        onChange={handleInputChange}
                    >
                        <Button className={cx('input-btn')} onClick={handleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </Button>
                    </Input>
                    <Button className={cx('w-full', 'submit-btn')} primary onClick={handleSubmit}>Đăng nhập</Button>
                </div>
            </div>
        </div>
    );
}

export default LogIn;