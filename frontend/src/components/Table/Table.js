import classNames from "classnames/bind";
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

function Table({ header = [], children, fixedLast = false }) {
    return (
        <div className={cx('w-full', 'wrapper')}>
            <div className={cx('container')}>
                <table className={cx('w-full text-left', 'table', { 'fixed-last': fixedLast })} rules='rows'>
                    <thead>
                        <tr>
                            {header.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;