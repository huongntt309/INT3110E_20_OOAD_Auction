import classNames from "classnames/bind";
import { useState } from "react";
import styles from './Profile.module.scss';

import Image from '~/components/Image';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Modal from '~/components/Modal';
import ProfileForm from '~/components/Form/ProfileForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

const USER = {
    _id: '1',
    name: 'Nguyễn Văn A',
    birthday: '06/04/2003',
    gender: 'Nam',
    role: 'area_manager',
    work_place: 'Hà Nội',
    phone: '0987 6543 21',
    email: 'a@gmail.com',
    password: '123',
    created_at: '2024-01-26T',
};

function Profile() {
    const [user, setUser] = useState(USER);
    const [showModal, setShowModal] = useState(false);

    const displayRole = (role) => {
        return new Map([
            ['boss', 'Lãnh đạo'],
            ['area_manager', 'Quản lý khu vực'],
            ['shop_manager', 'Quản lý quán'],
        ]).get(role);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleEdit = () => {
        handleShowModal();
    }

    return (
        <div className='px-32 py-8'>
            <div className='w-full'>
                <div className='flex'>
                    <Image 
                        className={cx('user-image')}
                        src={''}
                        alt={user.name}
                    />
                    <div className='flex flex-col justify-between'>
                        <div>
                            <h3 className={cx('font-semibold', 'user-name')}>
                                {user.name}
                            </h3>
                            <h4 className={cx('user-role')}>
                                {user.role && displayRole(user.role)}
                            </h4>
                        </div>
                        <Button
                            className={cx('edit-btn')}
                            leftIcon={<FontAwesomeIcon className={cx('edit-icon')} icon={faPenToSquare} />}
                            onClick={handleEdit}
                        >
                            Sửa hồ sơ
                        </Button>
                    </div>
                </div>

                <div className={cx('user-detail')}>
                    <h4 className={cx('info-header')}>Thông tin liên hệ</h4>
                    <div className={cx('info-wrapper')}>
                        <Input 
                            className={cx('info-data')}
                            wrapperClass={cx('input-wrapper')}
                            readOnly
                            inline
                            label='SĐT:'
                            value={user.phone}
                        />
                        <Input 
                            className={cx('info-data')}
                            wrapperClass={cx('input-wrapper')}
                            readOnly
                            inline
                            label='Email:'
                            value={user.email}
                        />
                        <Input 
                            className={cx('info-data')}
                            wrapperClass={cx('input-wrapper')}
                            readOnly
                            inline
                            label='Cơ quan:'
                            value={user.work_place}
                        />
                    </div>

                    <h4 className={cx('info-header')}>Thông tin cơ bản</h4>
                    <div className={cx('info-wrapper')}>
                        <Input 
                            className={cx('info-data')}
                            wrapperClass={cx('input-wrapper')}
                            readOnly
                            inline
                            label='Giới tính:'
                            value={user.gender}
                        />
                    </div>
                </div>
            </div>

            {showModal &&
                <Modal>
                    <ProfileForm 
                        item={user}
                        onClose={handleCloseModal}
                    />
                </Modal>
            }
        </div>
    );
}

export default Profile;