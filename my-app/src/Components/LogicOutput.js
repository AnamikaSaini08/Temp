import React from 'react'

const LogicOutput = ({robotDirection}) => {
 
   return {robotDirection} && (
    <div className=''>
          <h1 className='flex justify-center py-2 text-white bg-blue-600'>Instructions Implemented</h1>
          <div className='flex flex-wrap flex-col bg-blue-950'>
            {robotDirection.map((box, ind) => (
              <h1 key={ind} className='text-white ml-2 text-lg'>{box}</h1>
            ))}
           
          </div>
    </div>
  )
}

export default LogicOutput
