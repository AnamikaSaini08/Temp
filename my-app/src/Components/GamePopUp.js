import React from "react";
import Zoom from "react-reveal/Zoom";
import Oops from "../utils/images/Oops.png";

const GamePopUp = ({ status, desc, setShowPopUp }) => {
  return (
    <Zoom>
      <div className="bg-white rounded-lg">
        <div>
          {status === "Fail" ? (
            <div className="border border-gray-400">
              <img
                className="mx-auto my-auto w-28 h-32 2xl:w-36 2xl:h-36"
                src={Oops }
                alt="img"
              />
              <p className="text-2xl text-gray-700">{desc}</p>
              <div className="flex pt-8  text-white">
                <button
                  className="px-3 rounded-sm bg-yellow-400 w-1/2 text-bold py-3 2xl:py-5"
                  onClick={() => setShowPopUp(false)}
                >
                  Try again
                </button>
                <button
                  className="px-3 rounded-sm bg-red-600 w-1/2 text-bold py-3 2xl:py-5"
                  onClick={() => setShowPopUp(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-gray-400">
              <img className="mx-auto my-auto w-28 h-32 2xl:w-36 2xl:h-36" src="https://media.tenor.com/xYMLEZlJCXcAAAAj/trophy-uno.gif" alt="img" />
              <p className="text-2xl text-gray-700 py-5 2xl:py-10 2xl:text-3xl">{desc}</p>
                <button
                  className="w-full py-4 2xl:py-6 bg-blue-500 text-white  rounded-b-lg text-lg text-bold"
                  onClick={() => setShowPopUp(false)}
                >
                  Cancel
                </button>
            </div>
          )}
        </div>
      </div>
    </Zoom>
  );
};

export default GamePopUp;
