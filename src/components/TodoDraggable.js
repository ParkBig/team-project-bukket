import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
    height: 40px;
    border: 1px solid;
    margin: 13px auto;
    text-align: center;
    font-size: larger;
    border-radius: 10px;
`;

//요기서는 제목만 보이게 하자.
const TodoDraggable = ({dragId , index}) => {
    const dispatch = useDispatch();
    const toDo = useSelector(state=>state.toDoList.value["TO_DO"])[index];
    return (
        <Draggable draggableId={dragId} index={index}>
            {(magic) =>
                <Wrapper ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
                    {toDo["title"]}
                </Wrapper>
            }
        </Draggable>
    );
}

export default TodoDraggable;
