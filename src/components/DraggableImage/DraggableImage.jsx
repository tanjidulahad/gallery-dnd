import React, { useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Image } from '../Image/Image';
import { PlaceHolder } from '../PlaceHolder/PlaceHolder';

const DraggableImage = ({src,index,activeId,setDeleteImages}) => {
    const sortable = useSortable({ id: src.id });
    const {
        attributes,
        listeners,
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = sortable;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <>
        {
            isDragging ? <PlaceHolder
            ref={setNodeRef}
            style={style}
            img={src}
            index={index}
            activeId={activeId}
            {...attributes}
            {...listeners} />
            :
            <Image
            ref={setNodeRef}
            style={style}
            img={src}
            index={index}
            activeId={activeId}
            setDeleteImages={setDeleteImages}
            {...attributes}
            {...listeners}
            isDragging={isDragging}
            />
        }
        </>

    );
};

export default DraggableImage;