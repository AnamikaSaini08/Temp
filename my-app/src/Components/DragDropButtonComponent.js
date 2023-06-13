import React, { useState, useEffect } from "react";
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
  setCarPosition,
  buttons,
  handleRotateCarClockWise,
  handleRotateCarAntiClockWise,
  batteryPosition,
  setBatteryPosition
}) {
  //For G=Drag And Drop Connection
  const [draggedButtonId, setDraggedButtonId] = useState(null);

  useEffect(() => {
    setBoxes(new Array(boxSize).fill(null));
  }, [boxSize]);

  //On Click Of Reset Button
  const eraseBoxes = () => {
    setBoxes(new Array(boxSize).fill(null));
    setCarPosition({ x: 0, y: 0 });
    setRobotDirection(new Array(0));
  };

  //When CLick On Play Button
  const changeCarPosition = () => {
    setRobotDirection([]);
    let pos = { x: 0, y: 0 };
    let index = 0;

    //When Traverse all BoxSize
    const interval = setInterval(() => {

      console.log("PosX-" , pos.x);
      console.log("PosY-" , pos.y);
      if (index >= boxSize) {
        clearInterval(interval);
        return;
      }

      if (batteryPosition.some(coord => coord[0] === pos.x + 1 && coord[1] === pos.y + 1)){
        alert("You Have Collect Battery");
        const updatedBatteryPosition = batteryPosition.filter(coord => !(coord[0] === pos.x + 1 && coord[1] === pos.y + 1));
        setBatteryPosition(updatedBatteryPosition);
      } 
      if (pos.x === col - 1 && pos.y === row - 1) {
        alert("You won the game");
        clearInterval(interval);
        eraseBoxes();
        return;
      }
      const box = boxes[index];
      if (box === "left") {
        if (pos.x > 0) pos = { ...pos, x: pos.x - 1 };
        else {
          alert("You Fail! Robot go out of boundary.");
          clearInterval(interval);
          return;
        }
      } else if (box === "right") {
        if (pos.x < col) pos = { ...pos, x: pos.x + 1 };
        else {
          alert("You Fail! Robot go out of boundary.");
          clearInterval(interval);
          return;
        }
      } else if (box === "top") {
        if (pos.y > 0) pos = { ...pos, y: pos.y - 1 };
        else {
          alert("You Fail! Robot go out of boundary.");
          clearInterval(interval);
          return;
        }
      } else if (box === "bottom") {
        if (pos.y < row) pos = { ...pos, y: pos.y + 1 };
        else {
          alert("You Fail! Robot go out of boundary.");
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
        <div className="">
          <h1 className=" text-white text-lg sm:py-2">Logic Panel</h1>
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
