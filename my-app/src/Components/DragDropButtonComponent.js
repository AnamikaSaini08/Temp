import React, { useState , useEffect } from 'react';
import { setButtonText } from '../utils/constants/setButtonText';

function DragDropButtonComponent({boxSize  , setCarPosition , buttons}) {

  const [draggedButtonId, setDraggedButtonId] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [fillbox , setFillBox] = useState(0);

  useEffect(() => {
    setBoxes(new Array(boxSize).fill(null));
  }, [boxSize]);


  const changeCarPosition = () => {
    if(fillbox < boxSize){
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
  
  
  const handleDragStart = (buttonId)=> {
    setDraggedButtonId(buttonId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    setFillBox(fillbox+1);
    if (draggedButtonId) {
      const updatedBoxes = [...boxes];
      updatedBoxes[index] = draggedButtonId;
      setBoxes(updatedBoxes);
      setDraggedButtonId(null);
    }
  };

  const eraseBoxes = ()=>{
    setBoxes(new Array(boxSize).fill(null));
    setCarPosition({x:0,y:0})
  }

  const renderButton = (buttonId) => {
    const buttonText = setButtonText(buttonId);
    return (
      <button
        className=" bg-blue-400 text-white rounded mx-1 w-9 h-9 p-1"
        draggable="true"
        onDragStart={() => handleDragStart(buttonId)}
      >
        <img src={buttonText} alt='|' className='h-full w-full object-cover'/>
      </button>
    );
  };

  return (
    <div className='ml-2 sm:ml-10 mt-2 w-80 sm:w-96'>
    <div className='bg-blue-950'>
    <div className='flex justify-around'>
        <h1 className=' text-white text-lg py-2'>Logic Panel</h1>
        <button onClick={()=>eraseBoxes()}>
          <img className='max-w-6 max-h-6 rounded-full'
          src="https://media.istockphoto.com/id/171366630/photo/eraser.jpg?s=612x612&w=0&k=20&c=uVMsURPedBC0MghiNTogh82M-UcSeYAu29PWsbmZsNQ="
          alt="erase"
        /></button>
    </div>
   <hr/>
      <div className="flex flex-wrap justify-center">
        {boxes.map((box, index) => (
          <div
            key={index}
            className=" border-dashed border-2 border-gray-400 w-10 h-10 flex items-center justify-center m-2"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            {box ? renderButton(box) : ''}
          </div>
        ))}
      </div>
      <hr/>

      <div className="flex justify-center my-4 h-[7vh]">
        <div className="flex flex-wrap">
        {buttons.map( (button)=>(
          renderButton(button)
        ))}

        </div>
        <button
        className='ml-10 bg-yellow-500 px-5  rounded-lg text-bold '
             onClick={changeCarPosition}
        >Play</button>
      </div>
      <hr/>
      </div>
      
      <div className='mt-1'>
          <h1 className='flex justify-center py-1 text-white bg-blue-950'>Program Panel</h1>
          <div className='flex flex-wrap flex-col bg-blue-500 h-32'>
            {boxes.map((box, ind) => (
              <h1 key={ind} className='text-white ml-2 text-lg'>{box}</h1>
            ))}
          </div>
      </div>
    </div>
  );
}

export default DragDropButtonComponent;
