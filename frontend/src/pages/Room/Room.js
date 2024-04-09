import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Input from '~/components/Input';
import Button from '~/components/Button';
import config from '~/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Room() {
    const location = useLocation();
    const item = location.state;
    const [bid, setBid] = useState('');
    
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

    const validation = () => {
        if (!item) {
            toast.error('Vui lòng chọn biển số để đấu giá!');
            return false;
        }
        if (bid === '') {
            toast.error('Vui lòng nhập Số tiền!');
            return false;
        }
        return true;
    }

    const handleSubmit = () => {
        // console.log('[ROOM]', item);
        if (validation()) {
            toast.success('Số tiền của bạn đã được ghi nhận!');
        }
    }

    return (
        <div className='px-32 py-16'>
            <div>
                <ToastContainer />
                <div className='grid grid-cols-[auto_45%] gap-16'>
                    <div className='px-32 py-8 min-h-[367px] rounded-[10px] shadow-[0_4px_20px_var(--shadow-color)]'>
                        <div className='mx-auto px-16 py-4 w-fit text-center border-[0px] border-[var(--primary)] rounded-[6px]'>
                            <h3 className='text-[20px] uppercase font-semibold'>Thời gian đấu giá còn lại</h3>
                            <h3 className='text-[60px] leading-[60px] text-[var(--primary)] font-["UKNumberPlate"]'>
                                {(item && '10:00') || '00:00'}
                            </h3>
                        </div>
                        {item ? (
                            <div className='flex flex-col justify-center items-center mt-16 mx-auto px-8 w-fit border-[4px] border-[var(--black)] aspect-[2/1] rounded-[6px]'>
                                <div className='text-[64px] leading-[64px] font-["UKNumberPlate"]'>
                                    {item.number.split('-').shift()}
                                </div>
                                <div className='text-[64px] leading-[64px] font-["UKNumberPlate"]'>
                                    {item.number.split('-').pop()}
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-center items-center mt-16 mx-auto px-8 w-fit border-[4px] border-[var(--black)] aspect-[2/1] rounded-[6px]'>
                                <h3 className='text-[20px]'>Vui lòng chọn biển số để đấu giá</h3>
                                <Button className='mt-4 p-[9px_16px]' to={config.routes.products} primary>Chọn biển số</Button>
                            </div>
                        )}
                    </div>
                    <div className='px-16 py-8 min-h-[367px]'>
                        <h3 className='text-[20px] uppercase font-semibold text-center'>Diễn biến đấu giá</h3>
                        <div className='min-h-[165px]'>
                            {item && Array.from({ length: 3 }, (arr, index) => (
                                <div className='flex justify-between items-center' key={index}>
                                    <div>
                                        <h3 
                                            className='mt-4 font-bold' 
                                            style={{ color: !index && 'var(--primary)' }}
                                        >
                                            {item && '75,275,000'} VNĐ
                                        </h3>
                                        <p className='text-[14px] text-[var(--second-text-color)]'>
                                            {item && '13/01/2024 - 10:25:26'}
                                        </p>
                                    </div>
                                    <div className='font-semibold'>
                                        {item && 'Nguyễn Hà Hoàng Anh'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex items-center mt-4 mb-8 mx-auto px-8 py-2 w-fit border-[0px] border-[var(--primary)] rounded-[8px]'>
                            <span>Giá hiện tại:</span>
                            <span className='ml-4 text-[20px] font-bold'>
                                {(item && '75,275,000') || '0'} VNĐ
                            </span>
                        </div>
                        <Input 
                            type='text' 
                            inline
                            label='Đặt giá'
                            placeholder='VD: 100,000,000'
                            name='email'
                            value={inputCurrency(bid)}
                            onChange={(e) => setBid(e.target.value)}
                        />
                        <Button className='p-[9px_16px] w-full' primary onClick={handleSubmit}>Đặt giá</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room;