import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '~/components/Card';
import Button from '~/components/Button';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Result() {
    return (
        <div className='px-32 py-16'>
            <div className='grid gap-8'>
                {Array.from({ length: 5 }, (arr, index) => (
                    <Button to={'/a'} key={index}>
                        <Card>
                            <div className='flex justify-between items-center'>
                                <h3 className='text-[18px] font-semibold'>Kết quả đấu giá ngày 03/04/2024 thời gian từ 14:00 đến 14:25</h3>
                                <span className='text-[16px]'>
                                    <span className='text-[var(--second-text-color)]'>Giá trúng cao nhất</span>
                                    <span className='ml-2 font-semibold'>1.025.000.000 đ</span>
                                </span>
                                <Button className='w-[30px] h-[30px] rounded-full bg-[var(--hover-color)]'>
                                    <FontAwesomeIcon className='w-[14px] h-[14px] text-[var(--primary)]' icon={faChevronRight} />
                                </Button>
                            </div>
                        </Card>
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Result;