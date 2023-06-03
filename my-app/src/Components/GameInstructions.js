import React from 'react'

const GameInstructions = () => {
  return (
    <div className='bg-blue-950 text-white to-fuchsia-300 sm:h-screen'>
     <div className='p-2'>
              <h1 className='text-bold text-xl pb-1'>Activity 1: Logic Building</h1>
              <p className='text-lg'>Build a logic to move a car to the green box.</p>
      </div>
      <ol type= "1" className='sm:px-5 sm:py-4 leading-5 sm:leading-7'>
        <li>1. The objective of the game is to move a car from the starting position to the end position on the game board.</li>
        <li>2. The starting position of the car is (4, 4) and the end position is (8, 1).</li>
        <li>3. The car can be moved in four directions: up, down, left, and right. Use the arrow keys or the provided controls to move the car in the desired direction.</li>
        <li>4. The car can only move one cell at a time.</li>
        <li>5. Try to reach the end position as quickly as possible while avoiding obstacles and making as few moves as possible.</li>
        <li>6. You win the game when you reach the end position at (8, 1).</li>
        <li>7. Good luck and have fun playing the game!</li>
      </ol>
    </div>
  )
}

export default GameInstructions
