import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './LogIn.module.scss';

import Input from '~/components/Input';
import Button from '~/components/Button';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import { authUserContext } from '~/App';

import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

function LogIn() {
    const [inputs, setInputs] = useState({
        phone_number: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const context = useContext(authUserContext);
    const navigate = useNavigate();

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

    const validation = () => {
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
        return true;
    }

    const handleSubmit = () => {
        // console.log('[LOGIN]', inputs.phone_number.replaceAll(' ', ''), inputs.password);
        if (validation()) {
            authService
                .login(
                    inputs.phone_number.replaceAll(' ', ''), 
                    inputs.password
                )
                .then((data) => {
                    console.log('[LOGIN]', data);
                    if (data) {
                        toast.success('Đăng nhập thành công!');
                        localStorage.setItem('user', JSON.stringify(data));
                        context.handleAuthUser(data);
                        setTimeout(() => {
                            navigate(config.routes.home);
                        }, 200);
                    } else {
                        toast.error('Sai số điện thoại hoặc mật khẩu!');
                    }
                })
        }
    }

    return (
        <div className='px-32 py-16'>
            <div className='flex justify-center items-center h-full'>
                <div className={cx('flex flex-col justify-center w-2/5', 'form')}>
                    <h1 className={cx('form-header')}>Đăng nhập</h1>
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