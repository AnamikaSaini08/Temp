import React, { useState } from 'react';

const quizData = [
  {
    type: "image",
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Rome'],
    correctOptionIndex: 0,
    imageUrl:  <img
          src='https://media.istockphoto.com/id/1436430810/photo/paris-eiffel-tower.webp?b=1&s=170667a&w=0&k=20&c=Qm33k45p4AGKtbNcqkx5hhfP7IRo8RYIpW_VdgE2bDU='
          alt="Quiz Image"
          className="max-w-64 h-auto"
        />
  },
  {
    question: 'What is the capital of India?',
    options: ['Delhi', 'Chennai', 'Kolkata', 'Mumbai'],
    correctOptionIndex: 0,
  },
  {
    type: "image",
    question: 'What is below animal?',
    options: ['Cat', 'Dog', 'Cow', 'Horse'],
    correctOptionIndex: 3,
    imageUrl: <img
                src='https://media.istockphoto.com/id/1358464636/photo/horses-free-run-in-sandy-dust.webp?b=1&s=170667a&w=0&k=20&c=vvgtaqRmK8933x8QzFOvCS5TN_fwmtB0ukfScd4pnoU='
                alt="Quiz Image"
                className="max-w-64 h-auto"
              />
  },
  {
    type: "video",
    question: 'Below video related to which?',
    options: ['Library', 'School', 'Friends', 'Game'],
    correctOptionIndex: 0,
    videoUrl : <iframe width="560" height="315" src="https://www.youtube.com/embed/SwPNhB57iQ4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
  },
  {
    type: "matching",
    question: 'Match the countries with their corresponding flags:',
    items: [
      { text: 'France', option: 'A' },
      { text: 'United Kingdom', option: 'B' },
      { text: 'Germany', option: 'C' },
    ],
    options: [
      { text: 'Option A', value: 'A' },
      { text: 'Option B', value: 'B' },
      { text: 'Option C', value: 'C' },
    ],
    correctMatches: [
      { item: 'France', option: 'A' },
      { item: 'United Kingdom', option: 'B' },
      { item: 'Germany', option: 'C' },
    ],
  }
];

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState({});

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);

    if (optionIndex === quizData[currentQuestion].correctOptionIndex) {
      setScore(score + 1);
    }

    // Move to the next question after a short delay (adjust as needed)
    setTimeout(() => {
      setSelectedOption(null);
      setCurrentQuestion(currentQuestion + 1);
    }, 1000);
  };

  const renderOptions = () => {
    return quizData[currentQuestion].options.map((option, index) => (
      <button
        key={index}
        className={`w-full p-4 rounded-md ${
          selectedOption === index
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-blue-200'
        }`}
        onClick={() => handleOptionSelect(index)}
        disabled={selectedOption !== null}
      >
        {option}
      </button>
    ));
  };
  const handleMatchSelect = (itemId, optionValue) => {
    setMatches({ ...matches, [itemId]: optionValue });
  };

  return (
    <div className="container mx-auto">
      {currentQuestion < quizData.length ? (
        <div>
          <h1 className="text-2xl font-bold my-4">
            Question {currentQuestion + 1}
          </h1>
          <p className="mb-4">{quizData[currentQuestion].question}</p>
          {quizData[currentQuestion].type === "image" && <div className="mb-4">
            {quizData[currentQuestion].imageUrl}
          </div>}
          {
            quizData[currentQuestion].type === "video" && <div className="mb-4">
           { quizData[currentQuestion].videoUrl}
          </div>
          }


          {quizData[currentQuestion].type === "matching" ?
          quizData[currentQuestion].items.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <p>{item.text}</p>
          <select
            className="px-2 py-1 rounded-md bg-gray-200 text-gray-800"
            value={matches[item.text]}
            onChange={(e) => handleMatchSelect(item.text, e.target.value)}
            disabled={selectedOption !== null}
          >
            <option value="">Select</option>
            {quizData[currentQuestion].options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      )) :
      <div className="grid gap-4 grid-cols-2">{renderOptions()}</div>
          } 
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Quiz Completed</h1>
          <p>Your score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
