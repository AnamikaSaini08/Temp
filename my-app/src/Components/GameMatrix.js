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
      if (colIndex === carPosition?.x && rowIndex === carPosition?.y) {
        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="border border-gray-600 w-12 h-12 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20"
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
            className="border border-gray-600 bg-red-500 w-12 h-12 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20"
          ></div>
        );
      } else if (
        filterBatteryPosition.some(
          (coord) => coord[0] === colIndex + 1 && coord[1] === rowIndex + 1
        )
      ) {
        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="border border-gray-600 w-12 h-12 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20"
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
            className="border border-gray-600 bg-yellow-400 w-12 h-12 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20"
          ></div>
        );
      }
    })
  );
};

export default GameMatrix;
