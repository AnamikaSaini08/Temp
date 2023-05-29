import React, { useState } from 'react';
import GameInstructions from './GameInstructions';
import DragDropButtonComponent from './DragDropButtonComponent';
import GameMatrix from './GameMatrix';


function ChessboardComponent({row,col ,image}) {
  const [carPosition , setCarPosition] = useState({x:0 , y:0});
  const [rotateCarClockWise , setRotateCarClockWise] = useState(false);
  const [rotateCarAntiClockWise , setRotateCarAntiClockWise] = useState(false);
  const [endPosition , setEndPosition] = useState({x:row , y:col})

  
  const handleRotateCarClockWise = ()=>{
    setRotateCarClockWise(true);
  }
  const handleRotateCarAntiClockWise = ()=>{
    setRotateCarAntiClockWise(true);
  }
  
  
  return (
    <div className='flex overflow-x-auto sm:overflow-x-hidden'>

       <div className='shadow-lg w-1/4 h-full hidden sm:block'>
       <GameInstructions/>
       </div> 

       <div className='max-w-full'>
          <div className='my-8 sm:m-8 md:mx-16'>
              <h1 className='text-blue-950  sm:text-2xl text-bold mb-5'>Activity 1: Logic Building</h1>
              <p className='text-sm'>1. Build a logic to move a car to the green box.</p>
          </div>

          <div className='flex flex-wrap '>
                <div className='flex-shrink-0 mx-2 sm:mx-10 sm:mt-16 mt-0 md:mx-16'>
                      <div className={`grid grid-cols-${col}`} >
                          <GameMatrix row={row}
                            col={col}
                            carPosition = {carPosition}
                            rotateCarClockWise = {rotateCarClockWise}
                            rotateCarAntiClockWise = {rotateCarAntiClockWise}
                            image = {image}
                          />
                      </div>  
                </div> 
                <div className='flex-shrink-0 '>
                    <DragDropButtonComponent
                      boxSize={5}
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

export default ChessboardComponent;
