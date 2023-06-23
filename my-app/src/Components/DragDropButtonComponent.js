import React, { useState, useEffect, useRef } from "react";
import { setButtonText } from "../utils/constants/setButtonText";
import Play from "../utils/images/Play.png";
import Reset from "../utils/images/undo-arrow (1) 1.png";
import {
  changeCarPosition,
  eraseBoxes,
  checkEmptyBox,
} from "../utils/constants/changeCarPosition";
import { nextSlide, previousSlide } from "../utils/constants/slideChange";

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
  setShowPopUp,
  setPopUpStatus,
  setPopUpDesc,
  obstaclePosition,
  endPosition,
  currentSlide,
  setCurrentSlide,
  slideLength,
  coins,
  setCoins
}) {
  //Note If anything depend upon previous state in setInterval then direct state update to ho jayega but bcz of closure setInterval purane vale par hi kaam krega so
  // state should update based on previous state.

  //For Drag And Drop Connection
  const [draggedButtonId, setDraggedButtonId] = useState(null);
  const [boxIndex , setBoxIndex] = useState(0);
  const [boxSizeTemp , setBoxSizeTemp] = useState(boxSize);
  const [playButton , setPlayButton] = useState(false);

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
      if(!boxes[index])
        setBoxIndex(boxIndex+1);
      setDraggedButtonId(null);
    }
  };

  const renderButton = (buttonId) => {
    const buttonText = setButtonText(buttonId);
    return (
      <button
        className=" bg-gray-300 text-white rounded mx-1 w-6 h-6 sm:w-7 sm:h-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 p-2"
        draggable="true"
        onDragStart={() => handleDragStart(buttonId)}
        onClick={()=>{
          if(boxIndex === boxSizeTemp){
            setShowPopUp(true);
            setPopUpDesc("All button is filled, first Increase button!");
            setPopUpStatus("Fail");
            return;
          }
          const updatedBoxes = [...boxes];
          updatedBoxes[boxIndex] = buttonId;
          setBoxIndex(boxIndex+1);
          setBoxes(updatedBoxes);
        }}
      >
        <img src={buttonText} alt="|" className="h-full w-full" />
      </button>
    );
  };

  const showEmptyBoxes = (boxes) => {
    return boxes.map((box, index) => (
      <div
        key={index}
        className="bg-gray-300 w-6 h-6 sm:w-8 sm:h-8 lg:9 lg:9 xl:h-10 xl:w-10 2xl:w-11 2xl:h-11  items-center m-1 rounded-sm object-cover"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(index)}
      >
        {box ? renderButton(box) : ""}
      </div>
    ));
  };

  const increaseBoxSize = () => {
    if (boxSizeTemp >= 20) {
      setShowPopUp(true);
      setPopUpDesc("20 button is enough to win this game!");
      setPopUpStatus("Stuck");
      return;
    } 
    setBoxes(boxes.concat(new Array(1).fill(null)));
    setBoxSizeTemp(boxSizeTemp + 1);
  };

  return (
    <div className="w-full sticky">
      <div className="bg-blue-600 px-1 sm:px-6 py-2 sm:py-4 lg:py-5 xl:py-6 2xl:py-7">
        <div className="flex sm:pb-2 sm:pt-1">
          <h1 className=" text-white text-lg xl:text-2xl 2xl:text-4xl">Logic Panel</h1>
          <button
            className="ml-5 px-2 w-6 h-6 xl:w-8 xl:h-8 rounded-sm text-blue-600 text-bold text-xl flex justify-center bg-yellow-500 "
            onClick={() => {
              increaseBoxSize();
            }}
          >
            +
          </button>
          <button
            className="ml-5 px-2 w-6 h-6 xl:w-8 xl:h-8 rounded-sm text-blue-600 text-bold text-xl flex justify-center bg-yellow-500"
            onClick={() => {
              setBoxes((prevBoxes) => {
                const updatedBoxes = [...prevBoxes];
                updatedBoxes.pop(); // Remove the last element
                return updatedBoxes;
              });
              setBoxSizeTemp(boxSizeTemp - 1);
            }}
          >
            -
          </button>
        </div>

        <div className="flex flex-wrap">{showEmptyBoxes(boxes)}</div>
      </div>

      <div className="flex h-full bg-blue-950 py-3 sm:py-4 2xl:py-7  px-1 sm:px-6 ">
        <div className="flex justify-between h-screen w-full">
            <div className="flex flex-wrap">
              {buttons.map((button) => renderButton(button))}
              <div className="flex">
              <button
                className="bg-yellow-500 px-2 text-bold h-7 w-12 sm:h-9 sm:w-20 pt-1 flex justify-between mx-2 text-blue-600"
                onClick={() =>
                  playButton===false ? changeCarPosition(
                    boxSizeTemp,
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
                    setShowPopUp,
                    setPopUpStatus,
                    setPopUpDesc,
                    obstaclePosition,
                    endPosition,
                    coins,
                    setCoins,
                    setPlayButton
                  ) : ''
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
                    carInitialHealth,
                    boxSize,
                    setBoxSizeTemp,
                    setBoxIndex,
                    setCoins,
                    setPlayButton
                  )
                }
              >
                <img src={Reset} className="h-6 w-7" />
              </button>
            </div>
            </div>
            <div>
            <button
              onClick={
                ()=>setCurrentSlide(previousSlide(currentSlide , slideLength))
              }
              className="px-1 sm:px-3 sm:py-2 mx-2 bg-yellow-500 text-blue-600 text-bold hover:bg-yellow-600"
            >
              &lt; Previous
            </button>
            <button
              onClick={()=>setCurrentSlide(nextSlide(currentSlide,slideLength))}
              className="px-1 sm:px-3 sm:py-2 bg-yellow-500 text-blue-600 text-bold hover:bg-yellow-600"
            >
              Next &gt;
            </button>
          </div>
      </div>
      </div>
    </div>
  );
}

export default DragDropButtonComponent;