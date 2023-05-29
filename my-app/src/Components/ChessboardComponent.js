import React, { useState } from 'react';
import GameInstructions from './GameInstructions';
import DragDropButtonComponent from './DragDropButtonComponent';


function ChessboardComponent({row,col ,image}) {
  const [carPosition , setCarPosition] = useState({x:0 , y:0});

  const matrix = Array.from({ length: row }, (_, rowIndex) =>
    Array.from({ length: col }, (_, colIndex) => {
      if (colIndex === carPosition.x && rowIndex === carPosition.y) {
        return (
          <div key={`${rowIndex}-${colIndex}`} className="border border-blue-500 w-20 h-20">
            <img
              className="h-full w-full object-cover"
              src={image}
              alt="Car"
            />
          </div>
        );
      } else {
        return (
          <div key={`${rowIndex}-${colIndex}`} className="border border-blue-500 bg-gray-200 w-20 h-20"></div>
        );
      }
    })
  );
  
  
  return (
    <div className='flex overflow-x-auto sm:overflow-x-hidden'>

       <div className='shadow-lg w-1/4 h-full hidden sm:block'>
       <GameInstructions/>
       </div> 

       <div className='max-w-full'>
          <div className='my-8 sm:m-8'>
              <h1 className='text-blue-950  sm:text-2xl text-bold mb-5'>Activity 1: Logic Building</h1>
              <p className='text-sm'>1. Build a logic to move a car to the green box.</p>
          </div>

          <div className='flex flex-wrap '>
                <div className='flex-shrink-0 mx-2 sm:mx-10 sm:mt-16 mt-0'>
                      <div className={`grid grid-cols-${col}`} >
                          {matrix}
                      </div>  
                </div> 
                <div className='flex-shrink-0 '>
                    <DragDropButtonComponent
                      boxSize={5}
                      setCarPosition={setCarPosition}
                      buttons={["left","right","top","bottom","turn-left","turn-right"]}
                    />
                </div>
          </div>
  
       </div>

      </div>  
   
  );
}

export default ChessboardComponent;
