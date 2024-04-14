import classNames from "classnames/bind";
import styles from './PlateDetail.module.scss';
import CustomForm from "../CustomForm";

const cx = classNames.bind(styles);

function PlateDetail({ item, onClose }) {
    return (
        <CustomForm 
            title='Thông tin biển số'
            onClose={onClose} 
        >
            <div className='flex justify-between mb-8 text-[16px]'>
                <span>Biển số</span>
                <span className='font-semibold'>{item.plate_id}</span>
            </div>
            <div className='flex justify-between mb-8 text-[16px]'>
                <span>Trạng thái</span>
                <span className={cx('mr-[-8px] p-[2px_8px] font-semibold rounded-full', 'status', {
                    success: item.auction_status.toLowerCase() === 'đã kết thúc',
                    pending: item.auction_status.toLowerCase() === 'đang diễn ra',
                })}>
                    {item.auction_status}
                </span>
            </div>
            <div className='flex justify-between mb-8 text-[16px]'>
                <span>Thời gian bắt đầu đấu giá</span>
                <span className='font-semibold'>
                    {item.start_date.split('-').reverse().join('/')}
                </span>
            </div>
            <div className='flex justify-between mb-8 text-[16px]'>
                <span>Thời gian kết thúc đấu giá</span>
                <span className='font-semibold'>
                    {item.end_date.split('-').reverse().join('/')}
                </span>
            </div>
        </CustomForm>
    );
}

export default PlateDetail;