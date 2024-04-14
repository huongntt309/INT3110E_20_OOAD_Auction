import CustomForm from "../CustomForm";

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