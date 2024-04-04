import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Slider.module.scss';

import config from '~/config';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const IMAGES = [
    {
        url: images.slider_0,
        alt: 'Image 0',
        to: config.routes.customer_home,
    },
    {
        url: images.slider_1,
        alt: 'Image 1',
        to: config.routes.customer_home,
    },
];

function Slider() {
    const [imageIndex, setImageIndex] = useState(0);

    const showNextImage = () => {
        setImageIndex(index => {
            if (index === IMAGES.length - 1) return 0;
            return index + 1;
        });
    }

    useEffect(() => {
        const timerId = setInterval(() => {
            showNextImage();
        }, 3000);

        return () => clearInterval(timerId);
    }, [imageIndex]);

    return (
        <div className='w-full'>
            <div className='relative w-full'>
                <ul className='flex overflow-hidden w-full'>
                    {IMAGES.map((image, index) => (
                        <li 
                            className={cx('w-full', 
                                'relative', 
                                'flex-grow-0',
                                'flex-shrink-0',
                                'slider', 
                                { active: (index === imageIndex) }
                            )} 
                            key={index} 
                            style={{ 
                                left: `${-100 * imageIndex}%`,
                            }}
                        >
                            <Link to={image.to}>
                                <img 
                                    className='w-full'
                                    src={image.url} 
                                    alt={image.alt} 
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='flex absolute bottom-8 left-1/2 -translate-x-1/2'>
                    {IMAGES.map((_, index) => (
                        <Button 
                            className={cx('slider-btn', 
                                'relative',
                                { active: (index === imageIndex) }
                            )} 
                            key={index}
                            onClick={() => setImageIndex(index)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Slider;