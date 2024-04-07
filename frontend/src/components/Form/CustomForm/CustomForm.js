import classNames from "classnames/bind";
import styles from './CustomForm.module.scss';

import Button from '~/components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function CustomForm({ className, title, children, onClose, onSubmit }) {
    return (
        <div className={cx('w-full', 'wrapper', className)}>
            <div className='p-16'>
                <header>
                    <Button 
                        className={cx('absolute flex justify-center items-center', 'close-btn')}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                    <h1 className={cx('text-center', 'form-header')}>
                        {title}
                    </h1>
                </header>
                <main>
                    {children}
                    {onSubmit &&
                        <Button 
                            className={cx('submit-btn', 'w-full')} 
                            primary 
                            onClick={onSubmit}
                        >
                            Lưu
                        </Button>
                    }
                </main>
            </div>
        </div>
    );
}

export default CustomForm;