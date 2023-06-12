import React from 'react';

const GameMatrix = ({row, col, carPosition, rotateCarClockWise, rotateCarAntiClockWise, image , endPosition}) => {
    return Array.from({ length: row }, (_, rowIndex) =>
      Array.from({ length: col }, (_, colIndex) => {
        if (colIndex === carPosition?.x && rowIndex === carPosition?.y) {
          return (
            <div key={`${rowIndex}-${colIndex}`} className="border border-gray-600 w-10 h-10 md:w-14 md:h-14 lg:h-18 lg:w-18 2xl:h-20 2xl:w-20">
              <img
               className={`h-full w-full object-cover ${rotateCarClockWise ? "rotate-90" : rotateCarAntiClockWise ? "rotate-270" : ''}`}
                src={image}
                alt="Car"
              />
            </div>
          );
        } else if(colIndex === endPosition.x-1 && rowIndex === endPosition.y-1){
          return (
            <div key={`${rowIndex}-${colIndex}`} className="border border-gray-600 bg-red-500 w-10 h-10 md:w-14 md:h-14 lg:h-18 lg:w-18 2xl:h-20 2xl:w-20"></div>
          );
        }
        else{
          return(
            <div key={`${rowIndex}-${colIndex}`} className="border border-gray-600 bg-yellow-400 w-10 h-10 md:w-14 md:h-14 lg:h-18 lg:w-18 2xl:h-20 "></div>
          )
        }
      })
    );
  };

export default GameMatrix
