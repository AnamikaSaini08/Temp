import React, { useState } from "react";
import QuizGame from "./QuizGame";
import CarGameActivityTwo from "./CarGameActivityTwo";
import RobotImg from "../utils/images/robot.png";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = 15;

  const carGames = [
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 2, y: 1 },
      boxSize: useState(12),
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 4, y: 1 },
      boxSize: useState(12),
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 5, y: 5 },
      boxSize: useState(12),
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 5, y: 5 },
      batteryPosition: useState([[3, 1]]),
      filterBatteryPosition: useState([[3, 1]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 5, y: 5 },
      batteryPosition: useState([[3, 4]]),
      filterBatteryPosition: useState([[3, 4]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 5, y: 5 },
      batteryPosition: useState([[1, 3],[1,4]]),
      filterBatteryPosition: useState([[1, 4],[3,4]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 5, y: 5 },
      batteryPosition: useState([[1, 3],[1,4]]),
      filterBatteryPosition: useState([[1, 3],[1,4]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 5, y: 5 },
      batteryPosition: useState([[3,2],[1, 3],[1,4]]),
      filterBatteryPosition: useState([[3,2],[1, 4],[3,4]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 5, y: 5 },
      batteryPosition: useState([[1,4],[3,4]]),
      filterBatteryPosition: useState([[1,4],[3,4]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
      obstaclePosition : [[2,1],[2,2],[2,3],[2,4]]
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 5, y: 5 },
      batteryPosition: useState([[5,3],[4,5]]),
      filterBatteryPosition: useState([[5,3],[4,5]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
      obstaclePosition : [[2,1],[2,2],[4,3],[4,4]]
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1}),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 5, y: 5 },
      batteryPosition: useState([[1,4],[3,4]]),
      filterBatteryPosition: useState([[1,4],[3,4]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
      obstaclePosition : [[2,1],[2,2],[4,3],[4,4]]
    },
    {
      row: 5,
      col: 5,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 5, y: 5 },
      batteryPosition: useState([[2,2],[3,3],[4,4]]),
      filterBatteryPosition: useState([[2,2],[3,3],[4,4]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
    },
    {
      row: 6,
      col: 6,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 6, y: 6 },
      batteryPosition: useState([[2,2],[3,3],[4,4],[5,5]]),
      filterBatteryPosition: useState([[2,2],[3,3],[4,4],[5,5]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
    },
     {
      row: 8,
      col: 8,
      carPosition: useState({ x: 1, y: 1 }),
      boxes: useState([]),
      robotDirection: useState([]),
      endPosition: { x: 8, y: 8 },
      batteryPosition: useState([[1,3],[3,3],[5,5],[3,5],[5,7],[7,7]]),
      filterBatteryPosition: useState([[1,3],[3,3],[5,5],[3,5],[5,7],[7,7]]),
      boxSize: useState(12),
      carHealth: useState(10),
      carInitialHealth: 10,
    },
    
  ];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slideLength);
  };

  const previousSlide = () => {
    setCurrentSlide((currentSlide - 1 + slideLength) % slideLength);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="relative overflow-x-hidden overflow-y-hidden w-full h-full">
        <div
          className="flex transition-transform duration-300 h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carGames.map((game, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              <CarGameActivityTwo
                row={game.row}
                col={game.col}
                image={RobotImg}
                carPosition={game.carPosition[0]}
                setCarPosition={game.carPosition[1]}
                endPosition={game.endPosition}
                boxSize={game.boxSize[0]}
                setBoxSize={game.boxSize[1]}
                boxes={game.boxes[0]}
                setBoxes={game.boxes[1]}
                robotDirection={game.robotDirection[0]}
                setRobotDirection={game.robotDirection[1]}
                buttons={["left", "right", "top", "bottom"]}
                batteryPosition={game.batteryPosition && game.batteryPosition[0]}
                filterBatteryPosition={game.filterBatteryPosition && game.filterBatteryPosition[0]}
                setFilterBatteryPosition={game.filterBatteryPosition && game.filterBatteryPosition[1]}
                carHealth={game.carHealth && game.carHealth[0]}
                setCarHealth={game.carHealth && game.carHealth[1]}
                carInitialHealth={game.carInitialHealth}
                obstaclePosition={game.obstaclePosition}
              />
            </div>
          ))}
          
          <div className="w-full flex-shrink-0 px-4 h-full flex items-center justify-center bg-gradient-to-r from-violet-300 to-fuchsia-500 ">
            <QuizGame />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={previousSlide}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          &lt; Previous
        </button>
        <button
          onClick={nextSlide}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
