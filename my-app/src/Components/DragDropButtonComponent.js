import React, { useState, useEffect, useRef } from "react";
import { setButtonText } from "../utils/constants/setButtonText";
import Play from "../utils/images/Play.png";
import Reset from "../utils/images/undo-arrow (1) 1.png";
import {
  changeCarPosition,
  eraseBoxes,
} from "../utils/constants/changeCarPosition";

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
  setCarHealth,
  carInitialHealth,
  showPopUp, 
  setShowPopUp
}) {
  //Note If anything depend upon previous state in setInterval then direct state update to ho jayega but bcz of closure setInterval purane vale par hi kaam krega so
  // state should update based on previous state.

  //For Drag And Drop Connection
  const [draggedButtonId, setDraggedButtonId] = useState(null);
  const [fillBoxes, setFillBoxes] = useState(0);

  //Note- As setInterval() is callback() so in closure it takes initial value each time so kabhi bhi agr setInterval me
  //har itertaion me previous state updation ki need ho to  ref use kro because closure ki vjh se always initial state hi lega vo.
  
  const carHealthRef = useRef(carHealth);

  useEffect(() => {
    carHealthRef.current = carHealth; // Update the value of carHealthRef whenever carHealth changes
  }, [carHealth]);

  useEffect(() => {
    setBoxes(new Array(boxSize).fill(null));
  }, []);

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
      setFillBoxes(fillBoxes + 1);
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

  const showEmptyBoxes = (boxes) => {
    return boxes.map((box, index) => (
      <div
        key={index}
        className="bg-gray-300 w-6 h-6 sm:w-7 sm:h-7 md:h-9 md:w-9  items-center m-1 rounded-sm object-cover"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(index)}
      >
        {box ? renderButton(box) : ""}
      </div>
    ));
  };

  const increaseBoxSize = () => {
    if (fillBoxes < boxSize) {
      alert("First fill all boxes then only can increase!");
      return;
    } else {
      setBoxes(boxes.concat(new Array(1).fill(null)));
      setBoxSize(boxSize+1);
    }
  };

  return (
    <div className="w-full sticky">
      <div className="bg-blue-600 px-1 sm:px-6 sm:pb-3">
        <div className="flex  sm:py-2">
          <h1 className=" text-white text-lg">Logic Panel</h1>
          <button
            className="ml-5 px-2 w-6 h-6 rounded-sm text-blue-600 text-bold text-xl flex justify-center bg-yellow-500"
            onClick={() => {
              increaseBoxSize();
            }}
          >
            +
          </button>
          <button
            className="ml-5 px-2 w-6 h-6 rounded-sm text-blue-600 text-bold text-xl flex justify-center bg-yellow-500"
            onClick={() => {
              setBoxes((prevBoxes) => {
                const updatedBoxes = [...prevBoxes];
                updatedBoxes.pop(); // Remove the last element
                return updatedBoxes;
              });
              setBoxSize(boxSize-1);
            }}
          >
            -
          </button>
        </div>

        <div className="flex flex-wrap">{showEmptyBoxes(boxes)}</div>
      </div>

      <div className="flex h-full bg-blue-950 py-2 sm:py-3 px-1 sm:px-6">
        <div className="flex flex-wrap ">
          {buttons.map((button) => renderButton(button))}
        </div>
        <button
          className="bg-yellow-500 px-2 text-bold h-7 w-12 sm:h-9 sm:w-20 pt-1 flex justify-between mx-2 text-blue-600"
          onClick={() =>
            changeCarPosition(
              fillBoxes,
              boxSize,
              setRobotDirection,
              filterBatteryPosition,
              setCarHealth,
              carHealthRef,
              boxes,
              setFilterBatteryPosition,
              setCarPosition,
              row,
              col,
              handleRotateCarClockWise,
              handleRotateCarAntiClockWise,
              carInitialHealth,
              showPopUp,
              setShowPopUp
            )
          }
        >
          <img src={Play} className="truncate h-5 w-0 sm:h-7 sm:w-6" />
          Play
        </button>

        <button
          className="bg-yellow-500 px-4 text-bold h-7 w-7 sm:h-9 sm:w-14"
          onClick={() =>
            eraseBoxes(
              setBoxes,
              setCarPosition,
              setRobotDirection,
              setCarHealth,
              setFilterBatteryPosition,
              batteryPosition,
              setFillBoxes,
              carInitialHealth,
              boxSize
            )
          }
        >
          <img src={Reset} className="h-6 w-7" />
        </button>
      </div>
    </div>
  );
}

export default DragDropButtonComponent;
