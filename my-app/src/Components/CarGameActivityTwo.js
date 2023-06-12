import React, { useState } from 'react';
import GameInstructions from './GameInstructions';
import DragDropButtonComponent from './DragDropButtonComponent';
import GameMatrix from './GameMatrix';
import LogicOutput from './LogicOutput';


function CarGameActivityTwo({row,col ,image}) {
  const [carPosition , setCarPosition] = useState({x:0 , y:0});
  const [rotateCarClockWise , setRotateCarClockWise] = useState(false);
  const [rotateCarAntiClockWise , setRotateCarAntiClockWise] = useState(false);
  const endPosition =  {x:row , y:col};
  const [boxes, setBoxes] = useState([]);
  const [robotDirection , setRobotDirection] = useState([]);

  
  const handleRotateCarClockWise = ()=>{
    setRotateCarClockWise(true);
  }
  const handleRotateCarAntiClockWise = ()=>{
    setRotateCarAntiClockWise(true);
  }
  
  
  return (
    <div>
      <div className='flex h-full '>
          <div className='w-1/3 overflow-y-auto h-screen'>
            <GameInstructions/>
          </div>
          <div className='w-full h-screen'>
            <div className='w-full h-14 bg-blue-950'></div>
            <div className='flex justify-around py-5 h-[55%] bg-blue-900'>
                <div className={`h-[55%] grid grid-cols-${col}`} >
                                  <GameMatrix row={row}
                                    col={col}
                                    carPosition = {carPosition}
                                    rotateCarClockWise = {rotateCarClockWise}
                                    rotateCarAntiClockWise = {rotateCarAntiClockWise}
                                    image = {image}
                                    endPosition = {endPosition}
                                  />
                      </div>  
                      <div className='bg-blue-950 ml-2 sm:ml-5 md:ml-7 w-1/2 overflow-y-auto relative h-full'>
                        <LogicOutput robotDirection={robotDirection}/>
                      </div>
                </div>
                <div className='w-full sticky h-full'>
                  <DragDropButtonComponent
                    boxes={boxes}
                    robotDirection = {robotDirection}
                    setRobotDirection = {setRobotDirection}
                    setBoxes = {setBoxes}
                      row={row}
                      col={col}
                      boxSize={14}
                      setCarPosition={setCarPosition}
                      buttons={["left","right","top","bottom"]}
                      handleRotateCarClockWise={handleRotateCarClockWise}
                      handleRotateCarAntiClockWise = {handleRotateCarAntiClockWise}
                  />
                </div>
                
          </div>
      </div>
    </div>
  );
}

export default CarGameActivityTwo;
