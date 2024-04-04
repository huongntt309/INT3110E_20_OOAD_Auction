import { forwardRef, useState } from "react";

import images from '~/assets/images';

function Image({ 
    src, 
    alt, 
    className, 
    fallBack: customFallBack = images.no_image, 
    ...otherProps 
}, ref) {
    const [fallBack, setFallBack] = useState();

    const handleError = () => {
        setFallBack(customFallBack);
    }

    return (
        <img 
            className={className}
            ref={ref}
            src={fallBack || src}
            alt={alt}
            {...otherProps}
            onError={handleError}
        />
    );
}

export default forwardRef(Image);