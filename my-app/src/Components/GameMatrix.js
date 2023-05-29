import React from 'react';

const GameMatrix = ({row, col, carPosition, rotateCarClockWise, rotateCarAntiClockWise, image}) => {
    return Array.from({ length: row }, (_, rowIndex) =>
      Array.from({ length: col }, (_, colIndex) => {
        if (colIndex === carPosition?.x && rowIndex === carPosition?.y) {
          return (
            <div key={`${rowIndex}-${colIndex}`} className="border border-blue-500 w-20 h-20">
              <img
               className={`h-full w-full object-cover ${rotateCarClockWise ? "rotate-90" : rotateCarAntiClockWise ? "rotate-270" : ''}`}
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
  };

export default GameMatrix
