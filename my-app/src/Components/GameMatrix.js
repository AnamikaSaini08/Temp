import React from "react";

const GameMatrix = ({
  row,
  col,
  carPosition,
  rotateCarClockWise,
  rotateCarAntiClockWise,
  image,
  endPosition,
  filterBatteryPosition,
}) => {
  return Array.from({ length: row }, (_, rowIndex) =>
    Array.from({ length: col }, (_, colIndex) => {
      const rowGreaterFive = row > 5 || col > 5;
      const rowGraterSeven = row > 7 || col > 7;
      const gridBlockSize = rowGreaterFive ? ( rowGraterSeven ? ('h-6 w-6 sm:h-7 sm:w-7 xl:h-9 xl:w-9 2xl:h-15 2xl:w-15') : ('h-7 w-7 sm:h-7 sm:w-7 xl:h-11 xl:w-11 2xl:h-11 2xl:w-11')): ('h-12 w-12 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20');

      if (colIndex === carPosition?.x && rowIndex === carPosition?.y) {
        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`border border-gray-600 ${gridBlockSize} p-0 m-0`}
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
        colIndex === endPosition.x - 1 &&
        rowIndex === endPosition.y - 1
      ) {
        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`border border-gray-600 bg-red-500 ${gridBlockSize} p-0 m-0`}
          ></div>
        );
      } else if (
        filterBatteryPosition &&
        filterBatteryPosition.some(
          (coord) => coord[0] === colIndex + 1 && coord[1] === rowIndex + 1
        )
      ) {
        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`border border-gray-600 ${gridBlockSize} p-0 m-0`}
          >
            <img
              src="https://media.istockphoto.com/id/1319183574/photo/battery-icon-simple-3d-render-illustration-on-red-pastel-background-in-light-studio.webp?b=1&s=170667a&w=0&k=20&c=oONO_lVDJ61ikKVD-o6LElTo30dD0nrj_xmaek9MDaQ="
              alt="Battery"
              className="h-full w-full object-cover"
            />
          </div>
        );
      } else {
        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`border border-gray-600 bg-yellow-400 ${gridBlockSize} p-0 m-0`}
          ></div>
        );
      }
    })
  );
};

export default GameMatrix;
