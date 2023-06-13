import React, { useState } from "react";
import GameInstructions from "./GameInstructions";
import DragDropButtonComponent from "./DragDropButtonComponent";
import GameMatrix from "./GameMatrix";
import LogicOutput from "./LogicOutput";

function CarGameActivityTwo({
  row,
  col,
  image,
  carPosition,
  setCarPosition,
  endPosition,
  boxSize,
  boxes,
  setBoxes,
  robotDirection,
  setRobotDirection,
  buttons,
  batteryPosition,
  setBatteryPosition
}) {
  const [rotateCarClockWise, setRotateCarClockWise] = useState(false);
  const [rotateCarAntiClockWise, setRotateCarAntiClockWise] = useState(false);

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
          <div className="w-full h-14 bg-blue-950"></div>
          <div className="flex justify-around py-5 bg-blue-900 h-[50%] xl:h-[55%] ">
          <div className={`grid grid-cols-${col} gap-0`} >
              <GameMatrix
                row={row}
                col={col}
                carPosition={carPosition}
                rotateCarClockWise={rotateCarClockWise}
                rotateCarAntiClockWise={rotateCarAntiClockWise}
                image={image}
                endPosition={endPosition}
                batteryPosition = {batteryPosition}
              />
            </div>
            <div className="bg-blue-950 ml-2 sm:ml-5 md:ml-7 w-1/2 overflow-y-auto  h-full">
              <LogicOutput robotDirection={robotDirection} />
            </div>
          </div>
          <div className="w-full sticky h-fit">
            <DragDropButtonComponent
              boxes={boxes}
              setRobotDirection={setRobotDirection}
              setBoxes={setBoxes}
              row={row}
              col={col}
              boxSize={boxSize}
              setCarPosition={setCarPosition}
              buttons={buttons}
              handleRotateCarClockWise={handleRotateCarClockWise}
              handleRotateCarAntiClockWise={handleRotateCarAntiClockWise}
              batteryPosition = {batteryPosition}
              setBatteryPosition = {setBatteryPosition}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarGameActivityTwo;
