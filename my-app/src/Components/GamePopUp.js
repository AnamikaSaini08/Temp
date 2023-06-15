import React from 'react';
import Zoom from 'react-reveal/Zoom';

const GamePopUp = ({status , desc , setShowPopUp}) => {
  return (
    <Zoom>
    <div  className='bg-blue-100 p-8'>
    <div>
            <h1 className='text-4xl text-bold text-gray-800 flex justify-center pb-8'>{status}</h1>
            <p className='text-2xl text-gray-700'>{desc}</p>
        </div>
        <div className='flex pt-8 justify-between text-white'>
            <button className='px-3 rounded-sm py-1 bg-blue-950' onClick={()=>setShowPopUp(false)}>Ok</button>
            <button className='px-3 rounded-sm py-1 bg-blue-950' onClick={()=>setShowPopUp(false)}>Cancel</button>
        </div>
    </div>  
    </Zoom>
  )
}

export default GamePopUp;
