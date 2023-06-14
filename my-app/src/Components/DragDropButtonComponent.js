import React, { useState, useEffect, useRef } from "react";
import { setButtonText } from "../utils/constants/setButtonText";
import Play from "../utils/images/Play.png";
import Reset from "../utils/images/undo-arrow (1) 1.png";

function DragDropButtonComponent({
  boxes,
  setRobotDirection,
  setBoxes,
  row,
  col,
  boxSize,
  setBoxSize,
  setCarPosition,
  buttons,
  handleRotateCarClockWise,
  handleRotateCarAntiClockWise,
  batteryPosition,
  filterBatteryPosition,
  setFilterBatteryPosition,
  carHealth,
  setCarHealth
}) {

  //Note If anything depend upon previous state in setInterval then direct state update to ho jayega but bcz of closure setInterval purane vale par hi kaam krega so
  // state should update based on previous state.

  //For Drag And Drop Connection
  const [draggedButtonId, setDraggedButtonId] = useState(null);
  const [fillBoxes , setFillBoxes] = useState(0);
  const [carInitialHealth , setCarInitialHealth ] = useState(0);
  //Note- As setInterval() is callback() so in closure it takes initial value each time so kabhi bhi agr setInterval me 
  //har itertaion me previous state updation ki need ho to  ref use kro because closure ki vjh se always initial state hi lega vo.
  const carHealthRef = useRef(carHealth);
  const filteredBatteryPosRef = useRef(filterBatteryPosition);

  useEffect(() => {
    carHealthRef.current = carHealth; // Update the value of carHealthRef whenever carHealth changes
  }, [carHealth]);

  useEffect( ()=>{
    filteredBatteryPosRef.current = filterBatteryPosition; 
  })

  useEffect(()=>{
    setCarInitialHealth(carHealth);
  },[])

  useEffect(() => {
    setBoxes(new Array(boxSize).fill(null));
  }, [boxSize]);

  //On Click Of Reset Button
  const eraseBoxes = () => {
    setBoxes(new Array(boxSize).fill(null));
    setCarPosition({ x: 0, y: 0 });
    setRobotDirection(new Array(0));
    setCarHealth(carInitialHealth);
    if(setFilterBatteryPosition)
       setFilterBatteryPosition(batteryPosition);
    setFillBoxes(0);
  };

 async function fun(x,y)
 {
  await setFilterBatteryPosition((prevFilterBatteryPosition) =>
          prevFilterBatteryPosition.filter(
            (coord) => !(coord[0] === x && coord[1] === y)
          )
        );
 }

  //When CLick On Play Button
  const changeCarPosition = () => {
    if(fillBoxes < boxSize){
      alert("Please fill all the boxes");
      return;
    }

    setRobotDirection([]);
    let pos = { x: 0, y: 0 };
    let index = 0;
    let count = filterBatteryPosition.length;
    const batteryHealth = 5;
  
    // When Traverse all BoxSize
    const interval = setInterval(() => {
      if (index > boxSize) {
        alert("You Fail!");
        clearInterval(interval);
        return;
      }
  
      // When Robot Reach on Battery Position
      if (
        filterBatteryPosition &&
        filterBatteryPosition.some(
          (coord) => coord[0] === pos.x + 1 && coord[1] === pos.y + 1
        )
      ) {
        alert("You Have Collected a Battery");
        setCarHealth(carHealthRef.current + batteryHealth);
        fun(pos.x+1 , pos.y+1);
        count--;
      }
  
      // Robot Final Destination
      if (
        pos.x === row - 1 &&
        pos.y === col - 1 &&
        (count === 0)
      ) {
        alert("You won the game");
        clearInterval(interval);
        eraseBoxes();
        return;
      }
  
      const box = boxes[index];
      if (box === "left") {
        if (pos.x > 0) pos = { ...pos, x: pos.x - 1 };
        else {
          alert("You Fail! Robot went out of boundary.");
          clearInterval(interval);
          return;
        }
      } else if (box === "right") {
        if (pos.x < col - 1) pos = { ...pos, x: pos.x + 1 };
        else {
          alert("You Fail! Robot went out of boundary.");
          clearInterval(interval);
          return;
        }
      } else if (box === "top") {
        if (pos.y > 0) pos = { ...pos, y: pos.y - 1 };
        else {
          alert("You Fail! Robot went out of boundary.");
          clearInterval(interval);
          return;
        }
      } else if (box === "bottom") {
        if (pos.y < col - 1) pos = { ...pos, y: pos.y + 1 };
        else {
          alert("You Fail! Robot went out of boundary.");
          clearInterval(interval);
          return;
        }
      } else if (box === "turn-right") {
        handleRotateCarClockWise();
      } else if (box === "turn-left") {
        handleRotateCarAntiClockWise();
      }
  
      index++;
      setCarPosition({ ...pos });
      setCarHealth((prevHealth) => prevHealth - 1);
      console.log("Health", carHealthRef.current);

      // Rest of your logic

      if (carHealthRef.current === 0) {
        alert("Robot Died");
        clearInterval(interval);
        return;
      }

      if (box)
        setRobotDirection((prevDirection) => [
          ...prevDirection,
          `Robot Move ${box}`,
        ]);
    }, 1000);
  };
  

  //When we Drag Direction Button
  const handleDragStart = (buttonId) => {
    setDraggedButtonId(buttonId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedButtonId) {
      const updatedBoxes = [...boxes];
      updatedBoxes[index] = draggedButtonId;
      setBoxes(updatedBoxes);
      setDraggedButtonId(null);
      setFillBoxes(fillBoxes+1);
    }
  };

  const renderButton = (buttonId) => {
    const buttonText = setButtonText(buttonId);
    return (
      <button
        className=" bg-gray-300 text-white rounded mx-1 w-6 h-6 sm:w-7 sm:h-7 md:h-9 md:w-9 p-2"
        draggable="true"
        onDragStart={() => handleDragStart(buttonId)}
      >
        <img src={buttonText} alt="|" className="h-full w-full" />
      </button>
    );
  };

  return (
    <div className="w-full sticky">
      <div className="bg-blue-600 px-1 sm:px-6 sm:pb-3">
        <div className="flex  sm:py-2">
          <h1 className=" text-white text-lg">Logic Panel</h1>
          <button className="ml-5 px-2 w-6 h-6 rounded-sm text-blue-600 text-bold text-xl flex justify-center bg-yellow-500"
          onClick={()=>setBoxSize(boxSize+1)}>
            +
          </button>
          <button className="ml-5 px-2 w-6 h-6 rounded-sm text-blue-600 text-bold text-xl flex justify-center bg-yellow-500"
          onClick={()=>setBoxSize(boxSize-1)}>
            -
          </button>
        </div>

        <div className="flex flex-wrap">
          {boxes.map((box, index) => (
            <div
              key={index}
              className="bg-gray-300 w-6 h-6 sm:w-7 sm:h-7 md:h-9 md:w-9  items-center m-1 rounded-sm object-cover"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              {box ? renderButton(box) : ""}
            </div>
          ))}
        </div>
      </div>

      <div className="flex h-full bg-blue-950 py-2 sm:py-3 px-1 sm:px-6">
        <div className="flex flex-wrap ">
          {buttons.map((button) => renderButton(button))}
        </div>
        <button
          className="bg-yellow-500 px-2 text-bold h-7 w-12 sm:h-9 sm:w-20 pt-1 flex justify-between mx-2 text-blue-600"
          onClick={changeCarPosition}
        >
          <img src={Play} className="truncate h-5 w-0 sm:h-7 sm:w-6" />
          Play
        </button>

        <button
          className="bg-yellow-500 px-4 text-bold h-7 w-7 sm:h-9 sm:w-14"
          onClick={eraseBoxes}
        >
          <img src={Reset} className="h-6 w-7" />
        </button>
      </div>
    </div>
  );
}

export default DragDropButtonComponent;
