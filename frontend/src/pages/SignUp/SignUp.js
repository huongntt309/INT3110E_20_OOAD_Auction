import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './SignUp.module.scss';

import Input from '~/components/Input';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function SignUp() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        rePassword: '',
        checked: false,
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

    const validation = () => {
        if (inputs.email === '') {
            alert('Please enter your email!');
            return false;
        }
        if (inputs.password === '') {
            alert('Please enter your password!');
            return false;
        }
        if (inputs.rePassword === '') {
            alert('Please enter your confirmation password!');
            return false;
        }
        if (inputs.rePassword !== inputs.password) {
            alert('Please check your confirmation password!');
            return false;
        }
        if (inputs.checked === false) {
            alert('Please agree with our conditions!');
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
        <div className={cx('p-16', 'wrapper')}>
            <div className='flex justify-center items-center h-full'>
                <div className={cx('flex flex-col justify-center w-2/5', 'form')}>
                    <h1 className={cx('form-header')}>Đăng ký</h1>
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
                    <div className='grid grid-cols-[16px_auto] gap-4'>
                        <Input
                            id='staff-form-male'
                            className='flex items-center mt-[3px] border-none w-[16px] h-[16px]'
                            type='checkbox'
                            name='checked'
                            checked={inputs.checked}
                            onChange={(e) => {
                                const { name } = e.target;
                                setInputs((prev) => ({
                                    ...prev,
                                    [name]: !inputs.checked,
                                }));
                            }}
                        />
                        <p>
                            Tôi cam kết chịu trách nhiệm về các thông tin cá nhân đã kê khai, 
                            chính sách bảo mật thông tin khách hàng, 
                            cơ chế giải quyết tranh chấp, 
                            <a className='ml-[4px] text-[var(--primary)] font-normal]' href='/'>quy chế hoạt động</a> tại Website. 
                            Đồng ý chia sẻ các thông tin đã cung cấp cho tổ chức đấu giá 
                            <a className='ml-[4px] text-[var(--primary)] font-normal]' href='/'>tham chiếu theo nghị định 13/2023/NĐ-CP</a>
                        </p>
                    </div>
                    <Button className={cx('w-full', 'submit-btn')} primary onClick={handleSubmit}>Đăng ký</Button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;