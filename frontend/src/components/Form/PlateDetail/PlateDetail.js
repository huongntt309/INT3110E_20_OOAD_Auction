import CustomForm from "../CustomForm";

function PlateDetail({ item, onClose }) {
    return (
        <CustomForm 
            title='Thông tin biển số'
            onClose={onClose} 
        >
            <div className='flex justify-between mb-8 text-[16px]'>
                <span>Biển số</span>
                <span className='font-semibold'>{item.number}</span>
            </div>
            <div className='flex justify-between mb-8 text-[16px]'>
                <span>Thời gian mở đăng ký</span>
                <span className='font-semibold'>{item.registerStart}</span>
            </div>
            <div className='flex justify-between mb-8 text-[16px]'>
                <span>Thời gian kết thúc đăng ký</span>
                <span className='font-semibold'>{item.registerEnd}</span>
            </div>
            <div className='flex justify-between mb-8 text-[16px]'>
                <span>Thời gian bắt đầu đấu giá</span>
                <span className='font-semibold'>{item.auctionStart}</span>
            </div>
            <div className='flex justify-between mb-8 text-[16px]'>
                <span>Thời gian kết thúc đấu giá</span>
                <span className='font-semibold'>{item.auctionEnd}</span>
            </div>
        </CustomForm>
    );
}

export default PlateDetail;