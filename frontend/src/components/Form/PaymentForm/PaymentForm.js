import CustomForm from '~/components/Form/CustomForm';
import images from '~/assets/images';
import Button from '~/components/Button';
import { toast } from 'react-toastify';

import * as paymentService from '~/services/paymentService';

function PaymentForm({ item, payment, onClose }) {
    const handleSubmit = () => {
        toast.success('Thanh toán thành công!');
        // console.log('[PAYMENT FORM]', item);
        onClose();
    }

    const inputCurrency = (value) => {
        value =  value.replace(/[^0-9\s]/g, '');
        value =  value.replaceAll(',', '');
        const len = value.length;
    
        let count = 0;
            
        for (let i = 1; i <= ((len % 3 === 0) ? Math.floor(len / 3) - 1 : Math.floor(len / 3)); i++) {
            const position = - (i * 3 + count);
            value = `${value.slice(0, position)},${value.slice(position)}`;
            count++;
        }
    
        return value;
    }

    return (
        <CustomForm
            title='Thanh toán biến số đã đấu giá'
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
                        <p className='font-semibold text-[18px]'>{payment && inputCurrency(payment.toString())} VNĐ</p>
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

export default PaymentForm;