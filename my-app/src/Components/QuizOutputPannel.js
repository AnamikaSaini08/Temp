import React from 'react'

const QuizOutputPannel = ({boxes}) => {
  return (
    <div>
      <div>
      {
            boxes.map((box, ind) => (
                <h1>{box}</h1>
            ))
      }

      </div>
    </div>
  )
}

export default QuizOutputPannel
