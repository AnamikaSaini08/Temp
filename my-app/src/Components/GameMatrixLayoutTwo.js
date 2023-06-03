import React from 'react';

const GameMatrixLayoutTwo = ({row, col, carPosition, rotateCarClockWise, rotateCarAntiClockWise, image , endPosition}) => {
    return Array.from({ length: row }, (_, rowIndex) =>
      Array.from({ length: col }, (_, colIndex) => {
        if (colIndex === carPosition?.x && rowIndex === carPosition?.y) {
          return (
            <div key={`${rowIndex}-${colIndex}`} className="border border-blue-500 h-24 w-24">
              <img
               className={`h-full w-full object-cover ${rotateCarClockWise ? "rotate-90" : rotateCarAntiClockWise ? "rotate-270" : ''}`}
                src={image}
                alt="Car"
              />
            </div>
          );
        } else if(colIndex === endPosition.x-1 && rowIndex === endPosition.y-1){
          return (
            <div key={`${rowIndex}-${colIndex}`} className="border border-blue-500 bg-green-300 h-24 w-24"></div>
          );
        }
        else{
          return(
            <div key={`${rowIndex}-${colIndex}`} className="border border-blue-500 bg-gray-100 h-24 w-24"></div>
          )
        }
      })
    );
  };

export default GameMatrixLayoutTwo
