import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomForm from '~/components/Form/CustomForm';
import images from '~/assets/images';
import Button from '~/components/Button';
import config from '~/config';
import { toast } from 'react-toastify';
import { authUserContext } from '~/App';

import * as paymentService from '~/services/paymentService';

function DepositForm({ item, onClose }) {
    const context = useContext(authUserContext);
    const user = context && context.authUser?.user;
    const navigate = useNavigate();

    const handleSubmit = () => {
        paymentService
            .addDeposit(
                item.auction_id,
                user.phone_number,
            )
            .then((data) => {
                if (data?.message) {
                    toast.success('Đặt cọc thành công!');
                    setTimeout(() => {
                        navigate(config.routes.waiting_auction);
                    }, 200);
                }
                else if (data?.error)
                    toast.error(data.error);
            });
        // console.log('[DEPOSIT FORM]: auction_id, phone_number', item.auction_id, user.phone_number);
        onClose();
    }

    return (
        <CustomForm
            title='Đặt cọc'
            onClose={onClose}
        >
            <h3 className='mb-4 text-[18px]'>
                Thanh toán biển số 
                <span className='ml-[4px] font-semibold'>
                    {item && item.plate_id}
                </span>
                . Vui lòng chuyển khoản đến công ty đấu giá
            </h3>
            <div className='grid grid-cols-[30%_auto] gap-8'>
                <div>
                    <p className='text-[14px] text-[var(--second-text-color)]'>Quét mã thanh toán</p>
                    <img className='aspect-square' src={images.qr} alt='QR' />
                </div>
                <div>
                    <div className='mb-[16px]'>
                        <p className='text-[14px] text-[var(--second-text-color)]'>Ngân hàng</p>
                        <p className='font-semibold text-[18px]'>Ngân hàng BIDV - Chi nhánh Cầu Giấy</p>
                    </div>
                    <div className='mb-[16px]'>
                        <p className='text-[14px] text-[var(--second-text-color)]'>Số tài khoản</p>
                        <p className='font-semibold text-[18px]'>21510004273890</p>
                    </div>
                    <div className='mb-[16px]'>
                        <p className='text-[14px] text-[var(--second-text-color)]'>Số tiền</p>
                        <p className='font-semibold text-[18px]'>40,000,000 VNĐ</p>
                    </div>
                </div>
            </div>
            <Button
                className='mt-8 p-[9px_16px] w-full'
                primary
                onClick={handleSubmit}
            >
                Tôi đã thanh toán
            </Button>
        </CustomForm>
    );
}

export default DepositForm;