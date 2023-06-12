import React, { useState , useEffect } from 'react';
import { setButtonText } from '../utils/constants/setButtonText';
import LogicOutput from './LogicOutput';

function DragDropButtonComponentLayoutTwo({carRoute ,row, col ,initialBoxSize,boxSize ,setBoxSize, setCarPosition , buttons ,handleRotateCarClockWise ,handleRotateCarAntiClockWise}) {

  const [draggedButtonId, setDraggedButtonId] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [fillbox , setFillBox] = useState(0);
  const [plusButtonClickCount , setPlusButtonClickCount] = useState(2);
  
  useEffect(() => {
    setBoxes(new Array(boxSize).fill(null));
  }, [boxSize]);

  const changeCarPosition = () => {
    if(fillbox < boxSize){
      alert("First fill all the blocks then click play logic");
      return;
    }
    let pos = {x: 0, y: 0};
    let index = 0;

    const interval = setInterval(()=>{
      if(index >= boxSize){
        clearInterval(interval);
        if(pos.x === col-1 && pos.y === row-1){
          alert("You won the game")
          const isCarPresent = carRoute.some(route => JSON.stringify(route) === JSON.stringify(boxes));
          if(isCarPresent){
            alert("You Play Optimically. Excellent!")
          }else{
            alert("You does't Play Optimally. Try Best!")
          }
        }
        return;
      }
      const box = boxes[index];
      if (box === "left" && pos.x > 0) {
        pos = { ...pos, x: pos.x - 1 };
      } else if (box === "right" && pos.x < col) {
        pos = { ...pos, x: pos.x + 1 };
      } else if (box === "top" && pos.y > 0) {
        pos = { ...pos, y: pos.y - 1 };
      } else if (box === "bottom" && pos.y < row) {
        pos = { ...pos, y: pos.y + 1 };
      }
      else if(box === "turn-right"){
        handleRotateCarClockWise();
      }
      else if(box === "turn-left"){
        handleRotateCarAntiClockWise();
      }
      index++;
      setCarPosition({...pos});
    } , 700)
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
      console.log(boxes);
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
        className=" bg-blue-400 text-white rounded mx-1 w-9 h-9"
        draggable="true"
        onDragStart={() => handleDragStart(buttonId)}
      >
        <img src={buttonText} alt='|' className='h-full w-full'/>
      </button>
    );
  };
  console.log("BoxSize ",boxSize)

  return (
    <div className='w-full mt-4 mx-3'>
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
   <div className="flex justify-center">
            <div className={`flex flex-wrap ml-0 sm:ml-72 md:ml-96 w-72`}>
                {boxes.map((box, index) => (
                <div
                    key={index}
                    className="border-dashed border-2 border-gray-400 w-9 h-9 flex items-center justify-center m-2 object-cover"
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                >
                    {box ? renderButton(box) : ''}
                </div>
                ))}
            </div>
  <div className="ml-auto m-2">
    <button className="text-white text-lg"
    onClick={()=>{
        setBoxSize(plusButtonClickCount*initialBoxSize);
        setPlusButtonClickCount(plusButtonClickCount+1);
    }}>
    +</button>
  </div>
</div>

      <hr/>

      <div className="flex justify-between my-4 h-full">
        <div className="flex flex-wrap ml-0 sm:ml-72 md:ml-96 my-0 ">
        {buttons.map( (button)=>(
          renderButton(button)
        ))}

        </div>
        <button
        className='bg-yellow-500 px-5  rounded-lg text-bold '
             onClick={changeCarPosition}
        >Play</button>
      </div>
      <hr/>
      </div>
      
      <LogicOutput boxes={boxes}/>
    </div>
  );
}

export default DragDropButtonComponentLayoutTwo;
