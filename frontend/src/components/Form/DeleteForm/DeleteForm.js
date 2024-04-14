import classNames from "classnames/bind";
import styles from './DeleteForm.module.scss';

import Button from '~/components/Button';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function DeleteForm({ id, name, onClose = () => {}, updateData = () => {}, service }) {
    const handleSubmit = () => {
        service
            .deleteItem(id)
            .then(() => {
                updateData();
                toast.success('Xóa thành công!');
            })
        onClose();
    }
    
    return (
        <div className={cx('w-full', 'wrapper')}>
            <div className={cx('container')}>
                <header>
                    <h1 className={cx('text-center', 'form-header')}>
                        Bạn có chắc chắn muốn xóa "{name}"?
                    </h1>
                    <Button 
                        className={cx('absolute flex justify-center items-center', 'close-btn')}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </header>
                <main>
                    <div className='grid grid-cols-2 gap-8'>
                        <Button 
                            className={cx('submit-btn')} 
                            primary 
                            onClick={handleSubmit}
                        >
                            Xóa
                        </Button>
                        <Button 
                            className={cx('submit-btn')} 
                            outline 
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DeleteForm;