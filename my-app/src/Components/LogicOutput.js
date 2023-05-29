import React from 'react'

const LogicOutput = ({boxes}) => {
  return (
    <div className='mt-1'>
          <h1 className='flex justify-center py-1 text-white bg-blue-950'>Program Panel</h1>
          <div className='flex flex-wrap flex-col bg-blue-500 h-32'>
            {boxes.map((box, ind) => (
              <h1 key={ind} className='text-white ml-2 text-lg'>{box}</h1>
            ))}
          </div>
    </div>
  )
}

export default LogicOutput
