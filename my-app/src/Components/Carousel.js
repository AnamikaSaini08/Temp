import React, { useState } from "react";
import CarGameActivity from "./CarGameActivity";
import QuizGame from './QuizGame';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = 6;

  const nextSlide = () => {
      setCurrentSlide((currentSlide + 1) % slideLength);
  };

  const previousSlide = () => {
    setCurrentSlide((currentSlide - 1 + slideLength) % slideLength);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="relative overflow-x-hidden w-full h-full">
        <div
          className="flex transition-transform duration-300 h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >

          <img className="w-full flex-shrink-0 px-4 h-full flex items-center justify-center" src="https://media.istockphoto.com/id/1421080285/photo/colored-books-on-light-background-education-school.jpg?b=1&s=170667a&w=0&k=20&c=_azu_R-5-a26wGlrtusK_CWPuYXa9vtPg4nREZQpQu0=" alt= "Image description" />
          <iframe className="w-full flex-shrink-0 px-4 h-full flex items-center justify-center" width="560" height="315" src="https://www.youtube.com/embed/QwuQESNEb6w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <embed  className="w-full flex-shrink-0 px-4 h-full flex items-center justify-center" src="https://www.africau.edu/images/default/sample.pdf" type="application/pdf" />
          
          <div className="w-full flex-shrink-0 h-full">
            <CarGameActivity row={3} 
                                 col={3} 
                                 image={"https://media.istockphoto.com/id/1222528432/photo/car-small-cartoon-side.webp?b=1&s=170667a&w=0&k=20&c=HV06yu5flDeRvNFDtvkwP8wIXgr9kXHL-8H-x5bYEAI="}

            />
          </div>

          <div className="w-full flex-shrink-0 px-4 h-full flex items-center justify-center bg-gradient-to-r from-violet-300 to-fuchsia-500 " >
          <QuizGame/>
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
