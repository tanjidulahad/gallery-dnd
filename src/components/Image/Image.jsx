import React, { forwardRef, useEffect, useState } from 'react';

export const Image = forwardRef(({ img, index, activeId, setDeleteImages,isDragging, style, ...props }, ref) => {

    const [checked,setChecked]=useState(false)

    const inlineStyles = {
        transformOrigin: '0 0',
        height: index === 0 ? 410 : 200,
        gridRowStart: index === 0 ? 'span 2' : null,
        gridColumnStart: index === 0 ? 'span 2' : null,
        backgroundImage: `url("${img.src}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'grey',
        ...style,
    };

    useEffect(()=>{
        setChecked(false)
        setDeleteImages((items)=>{
            const filtered=items.filter(item=>item!=img.id)
            return filtered
        })
    },[isDragging,img])

    const handleChecked=(id)=>{
        
        if(checked){
            setDeleteImages((items)=>{
                const filtered=items.filter(item=>item!=id)
                return filtered
            })
        }else{
            setDeleteImages((items)=>[...items,parseInt(id)])
        }
        setChecked(!checked)
    }

    return (

        <div ref={ref} style={inlineStyles} {...props} className='rounded-md border-[2px] border-gray-300 relative group'>
            <div className={`absolute top-0 left-0 w-full h-full bg-black ${checked ? "opacity-10" : "opacity-0 group-hover:opacity-50"} transition-opacity duration-300 rounded-md`} />
            <input checked={checked} onChange={()=>handleChecked(img.id)} type="checkbox" className={`${checked ? "block" : "hidden"} group-hover:block absolute top-4 left-4 cursor-pointer w-6 h-6`} />
        </div>

    )
});