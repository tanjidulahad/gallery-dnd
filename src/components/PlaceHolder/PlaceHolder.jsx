import React, { forwardRef } from 'react';

export const PlaceHolder = forwardRef(({ img, index, activeId, style, ...props }, ref) => {
    const inlineStyles = {
        transformOrigin: '0 0',
        height: index === 0 ? 410 : 200,
        gridRowStart: index === 0 ? 'span 2' : null,
        gridColumnStart: index === 0 ? 'span 2' : null,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...style,
    };

    return (

            <div ref={ref} style={inlineStyles} {...props} className='rounded-md border-[2px] border-gray-300'></div>
        
    )
});