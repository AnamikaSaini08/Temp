import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const MatchingQuizComponent = () => {
  return (
    <div>
      <Droppable droppableId='fitToBox'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className='w-20 h-12 bg-gray-500'></div>
          </div>
        )}
      </Droppable>

      <Droppable droppableId='dragButton'>
        {(provided) => (
          <div className='mt-10' ref={provided.innerRef} {...provided.droppableProps}>
            <Draggable draggableId='left' index={0}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <button className='mx-2 px-5 py-2 bg-sky-500'>Left</button>
                </div>
              )}
            </Draggable>
            <Draggable draggableId='right' index={1}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <button className='mx-2 px-5 py-2 bg-sky-500'>Right</button>
                </div>
              )}
            </Draggable>
            <Draggable draggableId='top' index={2}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <button className='mx-2 px-5 py-2 bg-sky-500'>Top</button>
                </div>
              )}
            </Draggable>
            <Draggable draggableId='bottom' index={3}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <button className='mx-2 px-5 py-2 bg-sky-500'>Bottom</button>
                </div>
              )}
            </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default MatchingQuizComponent;
