import React from "react";
import boundary from '../utils/images/Boundary.png';

const GameMatrix = ({
  row,
  col,
  carPosition,
  rotateCarClockWise,
  rotateCarAntiClockWise,
  image,
  endPosition,
  filterBatteryPosition,
  obstaclePosition
}) => {
  return Array.from({ length: row }, (_, rowIndex) =>
    Array.from({ length: col }, (_, colIndex) => {
      const adjustedRowIndex = rowIndex + 1;
      const adjustedColIndex = colIndex + 1;
      
      const rowGreaterFive = row > 5 || col > 5;
      const rowGraterSeven = row > 7 || col > 7;
      const gridBlockSize = rowGreaterFive ? ( rowGraterSeven ? ('h-6 w-6 sm:h-7 sm:w-7 xl:h-10 xl:w-10 2xl:h-16 2xl:w-16') : ('h-7 w-7 sm:h-7 sm:w-7 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16')): ('h-12 w-12 xl:h-16 xl:w-16 2xl:h-24 2xl:w-24');
  
      if (adjustedColIndex === carPosition?.x && adjustedRowIndex === carPosition?.y) {
        return (
          <div
            key={`${adjustedRowIndex}-${adjustedColIndex}`}
            className={`border border-gray-600 bg-yellow-400 ${gridBlockSize} p-0 m-0`}
          >
            <img
              className={`h-full w-full object-cover ${
                rotateCarClockWise
                  ? "rotate-90"
                  : rotateCarAntiClockWise
                  ? "rotate-270"
                  : ""
              }`}
              src={image}
              alt="Car"
            />
          </div>
        );
      } else if (
        adjustedColIndex === endPosition.x &&
        adjustedRowIndex === endPosition.y
      ) {
        return (
          <div
            key={`${adjustedRowIndex}-${adjustedColIndex}`}
            className={`border border-gray-600 bg-red-500 ${gridBlockSize} p-0 m-0`}
          ></div>
        );
      } else if (
        filterBatteryPosition &&
        filterBatteryPosition.some(
          (coord) => coord[0] === adjustedColIndex && coord[1] === adjustedRowIndex
        )
      ) {
        return (
          <div
            key={`${adjustedRowIndex}-${adjustedColIndex}`}
            className={`border border-gray-600 ${gridBlockSize} p-0 m-0`}
          >
            <img
              src="https://i.pinimg.com/originals/21/e5/2f/21e52f1ee0fd10cafd99331a61a382bd.gif"
              alt="Battery"
              className="h-full w-full object-cover"
            />
          </div>
        );
      } else if (obstaclePosition && obstaclePosition.some(
        (coord) => coord[0] === adjustedColIndex && coord[1] === adjustedRowIndex
      )) {
        return (
          <div
            key={`${adjustedRowIndex}-${adjustedColIndex}`}
            className={`border border-gray-600 bg-yellow-400 ${gridBlockSize} p-0 m-0`}
          >
            <img
              src={boundary}
              alt="obstacle"
              className="h-full w-full object-cover"
            />
          </div>
        );
      } else {
        return (
          <div
            key={`${adjustedRowIndex}-${adjustedColIndex}`}
            className={`border border-gray-600 bg-yellow-400 ${gridBlockSize} p-0 m-0`}
          ></div>
        );
      }
    })
  );
};

export default GameMatrix;