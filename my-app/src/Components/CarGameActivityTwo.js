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
  carInitialHealth
}) {
  const [rotateCarClockWise, setRotateCarClockWise] = useState(false);
  const [rotateCarAntiClockWise, setRotateCarAntiClockWise] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleRotateCarClockWise = () => {
    setRotateCarClockWise(true);
  };
  const handleRotateCarAntiClockWise = () => {
    setRotateCarAntiClockWise(true);
  };

  return (
    <div>
      <div className="flex h-screen ">
        <div className="w-1/3 overflow-y-auto h-screen hidden sm:block">
          <GameInstructions />
        </div>
        <div className="w-full h-screen">
          <div className="w-full h-14 bg-blue-950">
            {carHealth && <h1 className="text-bold text-white flex justify-end px-5 py-3 text-lg">Robot Health: {carHealth}</h1>}
          </div>
          <div className={`flex justify-around bg-blue-900 ${row>8 ? 'py-0' : 'py-5'} h-[50%] xl:h-[55%] `}>
          <div className={`grid grid-cols-${col} gap-0`} >
              <GameMatrix
                row={row}
                col={col}
                carPosition={carPosition}
                rotateCarClockWise={rotateCarClockWise}
                rotateCarAntiClockWise={rotateCarAntiClockWise}
                image={image}
                endPosition={endPosition}
                filterBatteryPosition = {filterBatteryPosition}
              />
            </div>
            { showPopUp && (
        <div className="fixed z-10 w-1/3 ">
          <GamePopUp
            status="Fail"
            desc="You Fail! Robot went out of boundary."
            setShowPopUp={setShowPopUp}
          />
        </div>
      )}
            <div className="bg-blue-950 ml-2 sm:ml-5 md:ml-7 w-1/2 overflow-y-auto  h-full">
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
              showPopUp = {showPopUp}
              setShowPopUp = {setShowPopUp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarGameActivityTwo;
