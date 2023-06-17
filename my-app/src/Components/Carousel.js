import React, { useEffect, useState } from "react";
import QuizGame from "./QuizGame";
import CarGameActivityTwo from "./CarGameActivityTwo";
import RobotImg from "../utils/images/robot.png";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
    //1st Activity
  const [carPosition, setCarPosition] = useState({ x: 0, y: 0 });
  const [boxes, setBoxes] = useState([]);
  const [robotDirection, setRobotDirection] = useState([]);
  const endPosition = { x: 5, y: 5 };
  const slideLength = 7;
  const [boxSize, setBoxSize] = useState(12);

  //2nd Activity
    const [carPosition2, setCarPosition2] = useState({ x: 0, y: 0 });
  const [boxes2, setBoxes2] = useState([]);
  const [robotDirection2, setRobotDirection2] = useState([]);
  const endPosition2 = { x: 7, y: 7};
  const [batteryPosition2, setBatteryPosition2] = useState([
    [1, 5],
    [4, 3],
  ]);
  const [filterBatteryPosition2, setFilterBatteryPosition2] = useState([
    [1, 5],
    [4, 3],
  ]);
  const [boxSize2, setBoxSize2] = useState(12);
  const [carHealth2, setCarHealth2] = useState(5);
  const carInitialHealth2 = 5;
  const [carouselFlag, setCarouselFlag] = useState(true);

  const nextSlide = () => {
    setCarouselFlag(!carouselFlag);
    setCurrentSlide((currentSlide + 1) % slideLength);
  };

  const previousSlide = () => {
    setCarouselFlag(!carouselFlag);
    setCurrentSlide((currentSlide - 1 + slideLength) % slideLength);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="relative overflow-x-hidden overflow-y-hidden w-full h-full">
        <div
          className="flex transition-transform duration-300 h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <img
            className="w-full flex-shrink-0 px-4 h-full flex items-center justify-center"
            src="https://media.istockphoto.com/id/1421080285/photo/colored-books-on-light-background-education-school.jpg?b=1&s=170667a&w=0&k=20&c=_azu_R-5-a26wGlrtusK_CWPuYXa9vtPg4nREZQpQu0="
            alt="Image description"
          />
          <iframe
            className="w-full flex-shrink-0 px-4 h-full flex items-center justify-center"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/QwuQESNEb6w"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <embed
            className="w-full flex-shrink-0 px-4 h-full flex items-center justify-center"
            src="https://www.africau.edu/images/default/sample.pdf"
            type="application/pdf"
          />

          {<div className="w-full flex-shrink-0 h-full">
            <CarGameActivityTwo
              row={8}
              col={8}
              image={RobotImg}
              carPosition={carPosition}
              setCarPosition={setCarPosition}
              endPosition={endPosition}
              boxSize={boxSize}
              setBoxSize={setBoxSize}
              boxes={boxes}
              setBoxes={setBoxes}
              robotDirection={robotDirection}
              setRobotDirection={setRobotDirection}
              buttons={["left", "right", "top", "bottom"]}
            />
          </div>}

          { <div className="w-full flex-shrink-0 h-full">
            <CarGameActivityTwo
              row={5}
              col={5}
              image={RobotImg}
              carPosition={carPosition2}
              setCarPosition={setCarPosition2}
              endPosition={endPosition2}
              boxSize={boxSize2}
              setBoxSize={setBoxSize2}
              initialBoxSize={12}
              boxes={boxes2}
              setBoxes={setBoxes2}
              robotDirection={robotDirection2}
              setRobotDirection={setRobotDirection2}
              buttons={["left", "right", "top", "bottom"]}
              batteryPosition={batteryPosition2}
              filterBatteryPosition={filterBatteryPosition2}
              setFilterBatteryPosition={setFilterBatteryPosition2}
              carHealth={carHealth2}
              setCarHealth={setCarHealth2}
              carInitialHealth={carInitialHealth2}
            />
          </div>}

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
