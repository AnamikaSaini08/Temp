import React, { useState } from 'react';
import GameInstructions from './GameInstructions';
import DragDropButtonComponent from './DragDropButtonComponent';
import { useSelector } from 'react-redux';


function ChessboardComponent() {
  const [carPosition , setCarPosition] = useState({x:0 , y:0});
  const gridLength = 9;

  const matrix = Array.from({ length: gridLength }, (_, index) => {
    const x = index % 3; // Calculate x-coordinate
    const y = Math.floor(index / 3); // Calculate y-coordinate
  
    if (x === carPosition.x && y === carPosition.y) {
      return (
        <div key={index} className="border border-blue-500 bg-gray-200">
          <img className='truncate' src="https://media.istockphoto.com/id/1042273960/photo/small-cute-blue-car.webp?b=1&s=170667a&w=0&k=20&c=rnleg3GIo-mBjCt1QvyKpvjqxT4pzsupWvVkohkZMnw=" alt="Car" />
        </div>
      );
    } else {
      return (
        <div key={index} className="border border-blue-500 bg-gray-200 p-10"></div>
      );
    }
  });
  
  
  return (
    <div className='flex text-white'>

       <div className='w-[25%] shadow-lg flex-shrink-0'>
       <GameInstructions/>
       </div> 

       <div className='flex justify-center w-[50%]'>
            <DragDropButtonComponent size={5} carPosition={carPosition} setCarPosition={setCarPosition}/>
        </div>

        <div className='w-[100%] flex items-center justify-center'>
              <div className="grid grid-cols-3">
                   {matrix}
              </div>  
        </div> 
      </div>  
   
  );
}

export default ChessboardComponent;
