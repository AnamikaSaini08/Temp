import React, { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {updateBoxSequence} from '../utils/dragDropButtonSequenceGameSlice';

function DragDropButtonComponent({size , carPosition , setCarPosition}) {
  const dispatch = useDispatch();

  const [draggedButtonId, setDraggedButtonId] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [fillbox , setFillBox] = useState(0);
  useEffect(() => {
    setBoxes(new Array(size).fill(''));
  }, [size]);

  console.log("Boxes-" , boxes);

  const changeCarPosition = () => {
    if(fillbox < size){
      alert("First fill all the blocks then click play logic");
      return;
    }
    let pos = {x: 0, y: 0};
    boxes.forEach((box) => {
      if(box === 'left' && pos.x > 0){
        pos = {...pos , x: pos.x-1};
      }
      else if(box === 'right' && pos.x < 2){
        pos = {...pos , x: pos.x+1};
      }
      else if(box === 'top' && pos.y > 0){
        pos = {...pos , y: pos.y-1};
      }
      else if(box === 'bottom' && pos.y < 2){
        pos = {...pos , y: pos.y+1};

      }
      console.log("After operation- ", pos);
      });
      console.log("Position---------",pos);
      setCarPosition({...pos});
  };
  
  


  const handleDragStart = (e, buttonId)=> {
    setDraggedButtonId(buttonId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    setFillBox(fillbox+1);
    if (draggedButtonId) {
      const updatedBoxes = [...boxes];
      updatedBoxes[index] = draggedButtonId;
      setBoxes(updatedBoxes);
      dispatch(updateBoxSequence(updatedBoxes));
      setDraggedButtonId(null);
    }
  };


  const renderButton = (buttonId) => {
    let buttonText = '';
    switch (buttonId) {
      case 'left':
        buttonText = 'Left';
        break;
      case 'right':
        buttonText = 'Right';
        break;
      case 'top':
        buttonText = 'Top';
        break;
      case 'bottom':
        buttonText = 'Bottom';
        break;
      case 'turn-left':
        buttonText = 'Turn Left';
        break;
      case 'turn-right':
        buttonText = 'Turn Right';
        break;
      default:
        break;
    }

    return (
      <button
        className="p-2 bg-blue-500 text-white rounded"
        draggable="true"
        onDragStart={(e) => handleDragStart(e, buttonId)}
      >
        {buttonText}
      </button>
    );
  };

  return (
    <div className='bg-slate-600 pt-5'>
      <div className="flex flex-wrap justify-center">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="truncate border-dashed border-2 border-gray-400 h-[8vh] w-[4vw] flex items-center justify-center m-2"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {box ? renderButton(box) : ''}
          </div>
        ))}
      </div>
      <div className="flex justify-center my-4 h-[7vh]">
        <div className="flex truncate">
          {renderButton('left')}
          {renderButton('right')}
          {renderButton('top')}
          {renderButton('bottom')}
          {renderButton('turn-left')}
          {renderButton('turn-right')}
        </div>
        <button
        className=' ml-10 bg-green-500 px-5 py-2 rounded-lg truncate'
             onClick={changeCarPosition}
        >Play Logic</button>
      </div>
      <hr/>
      <div className='mt-2'>
      <h1 className='flex justify-center py-4 bg-blue-950'>Program Panel</h1>
      <div className='flex flex-wrap flex-col'>
        {boxes.map((box, ind) => (
          <h1 key={ind} className='text-white ml-2 text-xl'>{box}</h1>
        ))}
      </div>
      </div>
    </div>
  );
}

export default DragDropButtonComponent;
