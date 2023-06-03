import React, { useState } from 'react';
import GameInstructions from './GameInstructions';
import DragDropButtonComponent from './DragDropButtonComponent';
import GameMatrix from './GameMatrix';
import GameMatrixLayoutTwo from './GameMatrixLayoutTwo';
import DragDropButtonComponentLayoutTwo from './DragDropButtonComponentLayoutTwo';


function CarGameActivityLayoutTwo({row,col ,image}) {
  const [carPosition , setCarPosition] = useState({x:0 , y:0});
  const [rotateCarClockWise , setRotateCarClockWise] = useState(false);
  const [rotateCarAntiClockWise , setRotateCarAntiClockWise] = useState(false);
  const endPosition =  {x:row , y:col};
  const carRoute = [["right","right","turn-right","bottom","bottom"] , 
                    ["turn-right","bottom","bottom","right","right"] ,
                   ]
    const [boxSize , setBoxSize] = useState(5)

  
  const handleRotateCarClockWise = ()=>{
    setRotateCarClockWise(true);
  }
  const handleRotateCarAntiClockWise = ()=>{
    setRotateCarAntiClockWise(true);
  }
  
  
  return (
    <div className='flex overflow-x-auto sm:overflow-x-hidden overflow-y-hidden'>

       <div className='shadow-lg w-1/4 h-full hidden sm:block'>
       <GameInstructions/>
       </div> 

       <div className='w-full '>

          <div className=''>
                <div className='w-full flex justify-center mt-2'>
                      <div className={`grid grid-cols-${col}`} >
                          <GameMatrixLayoutTwo row={row}
                            col={col}
                            carPosition = {carPosition}
                            rotateCarClockWise = {rotateCarClockWise}
                            rotateCarAntiClockWise = {rotateCarAntiClockWise}
                            image = {image}
                            endPosition = {endPosition}
                          />
                      </div>  
                </div> 
                <div className='w-full flex justify-center'>
                    <DragDropButtonComponentLayoutTwo
                     carRoute ={carRoute}
                      row={row}
                      col={col}
                      initialBoxSize = {5}
                      boxSize = {boxSize}
                      setBoxSize = {setBoxSize}
                      setCarPosition={setCarPosition}
                      buttons={["left","right","top","bottom","turn-left","turn-right"]}
                      handleRotateCarClockWise={handleRotateCarClockWise}
                      handleRotateCarAntiClockWise = {handleRotateCarAntiClockWise}
                    />
                </div>
          </div>
  
       </div>

      </div>  
   
  );
}

export default CarGameActivityLayoutTwo;
