import { useState, useRef } from 'react'
import './App.css'
import addimg from "/add-img.png"

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import DraggableImage from './components/DraggableImage/DraggableImage'

function App() {

  const uploadRef = useRef(null) //for holding upload input reference
  const [images, setImages] = useState([]); //storing images
  const [activeId, setActiveId] = useState(null); //storing curently draging image id
  const [deleteImages, setDeleteImages] = useState([]) //storing the ids of selected images to delete

  // defining drag activation on different sensor
  const sensors = useSensors(useSensor(MouseSensor, {
    activationConstraint: {
      distance: 20,
    }
  }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 20,
      }
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
      }
    }));


  //storing images in a state
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {

      setImages([...images, { "src": e.target.result, "id": images.length.toString() }]);
    };

    reader.readAsDataURL(file);
    uploadRef.current.value = null //to upload same image right after the current upload if user want
  };

  //updating active id when start dragging an image
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  }

  //reordering the images after the drag event end
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }

  // undating active id if a drag event happend but didn't complete
  const handleDragCancel = () => {
    setActiveId(null);
  }

  // to handle selected image delete
  const handleDeleteFiles = () => {
    // filtering out the images that is selected
    const filtered = images.filter(item => {
      if (!deleteImages.includes(parseInt(item.id))) {
        return item
      }
    })
    setImages(filtered) //updating the images state
    setDeleteImages([]) //setting deleteimage state to default
  }


  return (
    <>
      <div className='bg-white min-h-[600px] lg:w-[80%] mx-auto md:mt-2 lg:mt-5 mb-5 rounded-xl'>

        <div className='border-b-[2px] border-b-gray-200'>

          {
            deleteImages.length > 0 ?
              <div className='flex justify-between px-10'>
                <h2 className='font-bold text-2xl py-5'>{deleteImages.length} Files Selected</h2>
                <button onClick={handleDeleteFiles} className='text-red-600 text-lg font-semibold'>Delete files</button>
              </div>
              :
              <h2 className='font-bold text-2xl py-5 px-10'>Gallery</h2>
          }


        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}

        >
          <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2`}>
            <SortableContext items={images} strategy={rectSortingStrategy}>

              {
                images.map((img, idx) => (
                  <DraggableImage src={img} key={idx} index={idx} activeId={activeId} setDeleteImages={setDeleteImages} />
                ))
              }

            </SortableContext>

            {/* to show a placeholder when draging an image */}
            <DragOverlay adjustScale={true}>
              {activeId ? (
                <img src={images.filter(item => item.id == activeId)[0].src} className={`rounded-md border border-gray-300 ${images.findIndex(item => item.id === activeId) == 0 ? "h-[400px]" : "h-[200px]"}`} />
              ) : null}
            </DragOverlay>

            {/* for uploading images */}
            <div className="relative group">
              <input ref={uploadRef} onChange={handleImageUpload} type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-[190px] h-[200px] border-dashed border-[3px] border-gray-300 flex flex-col gap-4 items-center justify-center rounded-md group-hover:bg-gray-200 transition duration-300">
                <img src={addimg} alt="addimg" className='w-5 h-5' />
                <p className='text-lg font-semibold'>Add Images</p>
              </div>
            </div>
          </div>

        </DndContext>

      </div>
    </>
  )
}

export default App
