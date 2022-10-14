import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


const TodoDraggable = ({dragId , index}) => {
    return (
        <Draggable draggableId={dragId} index={index}>
            {(magic) => <div ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>test!</div>}
        </Draggable>
    );
}

export default TodoDraggable;
