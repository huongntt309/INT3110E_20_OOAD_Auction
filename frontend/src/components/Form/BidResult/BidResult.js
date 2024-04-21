import CustomForm from "../CustomForm";
import Button from '~/components/Button';
import config from '~/config';

function PlateDetail({ item, win = false, winning_bid, onClose }) {
    return (
        <CustomForm 
            title={win ? 'Trúng đấu giá' : 'Không trúng đấu giá'}
            onClose={onClose} 
        >
            <div className='flex justify-between mb-8 text-[16px]'>
                <span>Biển số</span>
                <span className='font-semibold'>{item && item.plate_id}</span>
            </div>
            {win ? (
                <div className='flex justify-between mb-8 text-[16px]'>
                    <span>Giá trúng đấu giá</span>
                    <span className='font-semibold'>
                        {winning_bid && winning_bid} VNĐ
                    </span>
                </div>
            ) : (
                <p>
                    Rất tiếc! Bạn đã không đấu giá thành công
                    biển số xe {item && item.plate_id}
                </p>
            )}
            <Button className='w-full mt-[32px] p-[9px_16px]' to={config.routes.home} primary>Trở về trang chủ</Button>
        </CustomForm>
    );
}

export default PlateDetail;