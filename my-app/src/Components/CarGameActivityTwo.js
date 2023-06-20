import React, { useState } from "react";
import GameInstructions from "./GameInstructions";
import DragDropButtonComponent from "./DragDropButtonComponent";
import GameMatrix from "./GameMatrix";
import LogicOutput from "./LogicOutput";
import GamePopUp from "./GamePopUp";

function CarGameActivityTwo({
  row,
  col,
  image,
  carPosition,
  setCarPosition,
  endPosition,
  boxSize,
  setBoxSize,
  initialBoxSize,
  boxes,
  setBoxes,
  robotDirection,
  setRobotDirection,
  buttons,
  batteryPosition,
  filterBatteryPosition,
  setFilterBatteryPosition,
  carHealth,
  setCarHealth,
  carInitialHealth,
  obstaclePosition
}) {
  const [rotateCarClockWise, setRotateCarClockWise] = useState(false);
  const [rotateCarAntiClockWise, setRotateCarAntiClockWise] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpStatus , setPopUpStatus] = useState("");
  const [popUpDesc , setPopUpDesc] = useState("");

  const handleRotateCarClockWise = () => {
    setRotateCarClockWise(true);
  };
  const handleRotateCarAntiClockWise = () => {
    setRotateCarAntiClockWise(true);
  };

  return (
    <div>
      <div className={`flex h-screen ${showPopUp && 'opacity-40'}`}>
        <div className={`w-1/3 overflow-y-auto h-screen hidden sm:block`}>
          <GameInstructions />
        </div>
        <div className="w-full h-screen">
          <div className="w-full h-14 2xl:h-28 bg-blue-950">
            {carHealth && <h1 className="text-bold text-white flex justify-end px-5 py-3 text-lg">Robot Health: {carHealth}</h1>}
          </div>
          <div className={`flex justify-around text-center bg-blue-900 ${row>8 ? 'py-0' : 'py-5'} h-[57%] sm:h-[50%] xl:h-[58%] 2xl:h-[65%]`}>
          <div className={`grid grid-cols-${col} gap-0 mx-auto my-auto`} >
              <GameMatrix
                row={row}
                col={col}
                carPosition={carPosition}
                rotateCarClockWise={rotateCarClockWise}
                rotateCarAntiClockWise={rotateCarAntiClockWise}
                image={image}
                endPosition={endPosition}
                filterBatteryPosition = {filterBatteryPosition}
                obstaclePosition ={obstaclePosition}
              />
            </div>
            { showPopUp && (
        <div className={`fixed w-1/3`}>
          <GamePopUp
            status={popUpStatus}
            desc={popUpDesc}
            setShowPopUp={setShowPopUp}
          />
        </div>
      )}
            <div className="bg-blue-950 ml-2 sm:ml-5 md:ml-7 w-1/2 overflow-y-auto mx-auto my-auto h-[90%] 2xl:h-[70%]">
              <LogicOutput robotDirection={robotDirection} />
            </div>
          </div>
          <div className="w-full sticky h-screen">
            <DragDropButtonComponent
              boxes={boxes}
              setRobotDirection={setRobotDirection}
              setBoxes={setBoxes}
              row={row}
              col={col}
              boxSize={boxSize}
              setBoxSize = {setBoxSize}
              initialBoxSize = {initialBoxSize}
              setCarPosition={setCarPosition}
              buttons={buttons}
              handleRotateCarClockWise={handleRotateCarClockWise}
              handleRotateCarAntiClockWise={handleRotateCarAntiClockWise}
              batteryPosition = {batteryPosition}
              filterBatteryPosition = {filterBatteryPosition}
              setFilterBatteryPosition = {setFilterBatteryPosition}
              carHealth = {carHealth}
              setCarHealth = {setCarHealth}
              carInitialHealth={carInitialHealth}
              setShowPopUp = {setShowPopUp}
              setPopUpStatus = {setPopUpStatus}
              setPopUpDesc = {setPopUpDesc}
              obstaclePosition ={obstaclePosition}
              endPosition = {endPosition}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarGameActivityTwo;
