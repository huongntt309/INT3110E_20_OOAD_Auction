import classNames from "classnames/bind";
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ className, children }) {
    return (
        <div className={cx('fixed', 'inset-0', 'w-full', 'h-full', 'wrapper')}>
            <div className={cx('absolute', 'container', className)}>
                {children}
            </div>
        </div>
    );
}

export default Modal;