import classNames from "classnames/bind";
import { useContext, useState } from "react";
import styles from './Profile.module.scss';

import Image from '~/components/Image';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Modal from '~/components/Modal';
import ProfileForm from '~/components/Form/ProfileForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { authUserContext } from '~/App';

const cx = classNames.bind(styles);

function Profile() {
    const context = useContext(authUserContext);
    const user = context && context.authUser?.user;
    const [showModal, setShowModal] = useState(false);

    const displayRole = (role) => {
        return new Map([
            ['admin', 'Admin'],
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
                        alt='Avatar'
                    />
                    <div className='flex flex-col justify-between'>
                        <div>
                            <h3 className={cx('font-semibold', 'user-name')}>
                                {user && `${user.last_name} ${user.first_name}`}
                            </h3>
                            <h4 className={cx('user-role')}>
                                {user && user.role && displayRole(user.role)}
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
                            value={user && user.phone_number}
                        />
                        <Input 
                            className={cx('info-data')}
                            wrapperClass={cx('input-wrapper')}
                            readOnly
                            inline
                            label='Địa chỉ:'
                            value={user && user.address}
                        />
                    </div>

                    <h4 className={cx('info-header')}>Thông tin cơ bản</h4>
                    <div className={cx('info-wrapper')}>
                        <Input 
                            className={cx('info-data')}
                            wrapperClass={cx('input-wrapper')}
                            readOnly
                            inline
                            label='Ngày sinh:'
                            value={user && user.dob.split('-').reverse().join('/')}
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