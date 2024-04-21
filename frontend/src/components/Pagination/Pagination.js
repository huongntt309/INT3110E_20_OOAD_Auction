import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const MAX_LENGTH = 7;

function Pagination({ pageCount, page, params, setParams }) {
    const [pageList, setPageList] = useState();
    
    const getPageList = (totalPages, page, maxLength) => {
        const range = (start, end) => 
            Array.from({ length : end - start + 1}, (_, index) => index + start);
        
        const sideWidth = maxLength < 9 ? 1 : 2;
        const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
        const rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

        if (totalPages <= maxLength) return range(1, totalPages);
        if (page <= maxLength - sideWidth - 1 - rightWidth)
            return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
        if (page >= totalPages - sideWidth - 1 - rightWidth)
            return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));

        return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
    }

    useEffect(() => {
        if (page && pageCount)
            setPageList(getPageList(pageCount, page, MAX_LENGTH));
    }, [page, pageCount]);

    // useEffect(() => {
    //     console.log('[PAGINATION]', pageList);
    // }, [pageList]);

    const handlePageChange = (page) => {
        // setPage(page);
        window.scrollTo(0, 0);
        if (page !== 1) {
            setParams((prev) => {
                prev.set('page', page);
                return prev;
            }, { replace: true });
        } else {
            params.delete('page');
            setParams(params);
        }
    }

    return (
        <div className='mt-8 flex justify-center'>
            <ul className='flex'>
                <li className={cx('item')}>
                    <Button 
                        className={cx('flex justify-center items-center', 'btn', {
                            disable: page === 1,
                        })}
                        outline 
                        disable={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                </li>
                {pageList &&
                    pageList.map((item, index) => (
                        <li className={cx('item')} key={index}>
                            <Button 
                                className={cx('flex justify-center items-center', 'btn', {
                                    active: page === item,
                                    dot: !item,
                                })}
                                outline 
                                disable={(page === item) || !item}
                                onClick={() => handlePageChange(item)}
                            >
                                {item ? item : '...'}
                            </Button>
                        </li>
                    ))
                }
                <li className={cx('item')}>
                    <Button 
                        className={cx('flex justify-center items-center', 'btn', {
                            disable: page === pageCount,
                        })}
                        outline 
                        disable={page === pageCount}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;