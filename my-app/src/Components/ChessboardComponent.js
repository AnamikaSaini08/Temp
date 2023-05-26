import React, { useState } from 'react';
import GameInstructions from './GameInstructions';

function ChessboardComponent() {
  const [x, setX] = useState(4);
  const [y, setY] = useState(4);
  const [code, setCode] = useState('');

  const moveLeft = () => {
    setX(Math.max(1, x - 1));
  };

  const moveRight = () => {
    setX(Math.min(8, x + 1));
  };

  const moveUp = () => {
    setY(Math.max(1, y - 1));
  };

  const moveDown = () => {
    setY(Math.min(8, y + 1));
  };

  const generateCode = () => {
    let generatedCode = 'var pos = [4,4]\n';
    if (x !== 4) {
      if (x > 4) {
        const steps = x - 4;
        if (steps === 1) {
          generatedCode += 'moveRight() (pos[0]++);\n';
        } else {
          generatedCode += `for (let i = 0; i < ${steps}; i++) moveRight() (pos[0]++);\n`;
        }
      } else {
        const steps = 4 - x;
        if (steps === 1) {
          generatedCode += 'moveLeft() (pos[0]--);\n';
        } else {
          generatedCode += `for (let i = 0; i < ${steps}; i++) moveLeft() (pos[0]--);\n`;
        }
      }
    }
    if (y !== 4) {
      if (y > 4) {
        const steps = y - 4;
        if (steps === 1) {
          generatedCode += 'moveUp() (pos[1]--);\n';
        } else {
          generatedCode += `for (let i = 0; i < ${steps}; i++){\n  moveUp();\n}\n`;
        }
      } else {
        const steps = 4 - y;
        if (steps === 1) {
          generatedCode += 'moveDown() (pos[1]++);\n';
        } else {
          generatedCode += `for (let i = 0; i < ${steps}; i++) moveDown() (pos[1]++);\n`;
        }
      }
    }
    setCode(generatedCode);
    console.log(x,y)
    if(x===1 && y===8){
      alert("You won the game");
    }
  };
  

  const renderBlocks = () => {
    const blocks = [];

    for (let i = 8; i >= 1; i--) {
      for (let j = 1; j <= 8; j++) {
        blocks.push(
          <div key={`${i},${j}`} style={{ width: '50px', height: '50px', backgroundColor: (i + j) % 2 === 0 ? 'white' : 'brown', position: 'absolute', left: `${(j - 1) * 50}px`, top: `${(8 - i) * 50}px` }}>
            {`${i},${j}`}
          </div>
        );
      }
    }

    return blocks;
  };

  return (
    <div className='flex text-white'>
       <div className='relative w-1/3 flex-shrink-0 px-4 h-screen flex items-center justify-center'>
       <GameInstructions/>
       </div> 
      <div className=''>
        <div className='mt-10'  style={{ width: '400px', height: '400px', backgroundColor: 'brown', position: 'relative' }}>
          {renderBlocks()}
          <div style={{ width: '50px', height: '50px', backgroundColor: 'black', text:"Car", position: 'absolute', left: `${(x - 1) * 50}px`, top: `${(8 - y) * 50}px` }} />
        </div>

        <div className='flex flex-wrap justify-center my-5 text-white'>
          <button className='mx-2 rounded-md text-2xl px-6 py-2 bg-red-600 text-bold ' onClick={moveLeft}>&larr;</button>
          <button className='mx-2 rounded-md text-2xl px-6 py-2 bg-red-600 text-bold ' onClick={moveRight}>&rarr;</button>
          <div>
            <button className='mx-2 rounded-md text-2xl px-7 py-2 bg-red-600 text-bold ' onClick={moveDown}>&uarr;</button>
            <button className='mx-2 rounded-md text-2xl px-7 py-2 bg-red-600 text-bold ' onClick={moveUp}>&darr;</button>
          </div>
        </div>


      <div className='flex justify-center'>
      <button className='flex justify-center items-center text-white rounded-md text-2xl px-7 py-2 bg-green-800  ' onClick={generateCode}>Run</button>
      </div>
      </div>
      <div className='ml-10 text-black text-bold px-4 mt-80'>{code}</div>
    </div>
  );
}

export default ChessboardComponent;
