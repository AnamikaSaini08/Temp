import React, { useState } from 'react';
import GameInstructions from './GameInstructions';
import DragDropButtonComponent from './DragDropButtonComponent';
import GameMatrix from './GameMatrix';


function CarGameActivityTwo({row,col ,image}) {
  const [carPosition , setCarPosition] = useState({x:0 , y:0});
  const [rotateCarClockWise , setRotateCarClockWise] = useState(false);
  const [rotateCarAntiClockWise , setRotateCarAntiClockWise] = useState(false);
  const endPosition =  {x:row , y:col};
  const carRoute = [["right","right","right","turn-right","bottom","bottom","bottom"] , 
                    ["turn-right","bottom","bottom","bottom","right","right","right"] ,
                   ]

  
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

       <div className='max-w-full '>
          <div className='my-8 sm:m-8 md:mx-16'>
              <h1 className='text-blue-950  sm:text-2xl text-bold mb-5 2xl:text-4xl'>Activity 1: Logic Building</h1>
              <p className='text-sm 2xl:text-2xl'>1. Build a logic to move a car to the green box.</p>
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
                            endPosition = {endPosition}
                          />
                      </div>  
                </div> 
                <div className='flex-shrink-0 '>
                    <DragDropButtonComponent
                      carRoute = {carRoute}
                      row={row}
                      col={col}
                      boxSize={7}
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

export default CarGameActivityTwo;
