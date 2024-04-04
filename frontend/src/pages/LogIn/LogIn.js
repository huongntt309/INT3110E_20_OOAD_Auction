import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './LogIn.module.scss';

import Input from '~/components/Input';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function LogIn() {
    const [inputs, setInputs] = useState({
        email: '',
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

    const validation = () => {
        if (inputs.email === '') {
            alert('Please enter your email!');
            return false;
        }
        if (inputs.password === '') {
            alert('Please enter your password!');
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        if (validation()) {
            alert('Login successfully!');
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className='flex justify-center items-center h-full'>
                <div className={cx('flex flex-col justify-center w-2/5', 'form')}>
                    <h1 className={cx('form-header')}>Đăng nhập</h1>
                    <Input 
                        className={cx('form-input')}
                        type='text' 
                        label='Email'
                        placeholder='Email'
                        name='email'
                        value={inputs.email}
                        onChange={handleInputChange}
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