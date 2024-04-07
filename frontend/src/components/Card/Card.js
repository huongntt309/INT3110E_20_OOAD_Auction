import classNames from "classnames/bind";
import styles from './Card.module.scss';

const cx = classNames.bind(styles);

function Card({ className, title, children, ...otherProps }) {
    return (
        <div className={cx('wrapper', className)} {...otherProps}>
            <div className='w-full'>
                {title && <h3 className={cx('title')}>{title}</h3>}
                {children}
            </div>
        </div>
    );
}

export default Card;