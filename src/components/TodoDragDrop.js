import styled from "styled-components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { useSelector, useDispatch } from "react-redux";
import TodoDraggable from "./TodoDraggable";
import Form from "./Form";
import { deleteValue, insertValue } from "../store/modules/toDoList";

const Wrap = styled.div`
    display: flex;
    width: 100vw;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: gray;
`;
const Boards = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
`;
const UpperDroppable = styled.div`
    width: 400px;
    height: 500px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 10px;
`;
const Title = styled.div`
    width: 400px;
    height: 50px;
    border-radius: 15px;
    box-shadow: 5px 10px 15px 5px gray;
    text-align: center;
    padding-top: 20px;
`;
const UnderDroppable = styled.div`
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

// 폼 작성후 드로파블 아래 내용 수정하기
const TodoDragDrop = () => {
    const dispatch = useDispatch();
    const getAll = useSelector(state=>state.toDoList.value);
    const onDragEnd = (info) => {
        dispatch(deleteValue([info.source.droppableId, info.source.index]))
        dispatch(insertValue([info.destination.droppableId, info.destination.index, getAll[info.source.droppableId][info.source.index]]));
    }
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}> 
                <Wrap>
                    <div style={{display:"block"}}>
                        <Form />
                        <Boards>
                            <UpperDroppable>
                                <Title>TODO</Title>
                                <Droppable droppableId="TO_DO">
                                    {(magic) => (
                                        <UnderDroppable ref={magic.innerRef} {...magic.droppableProps}>
                                            {getAll["TO_DO"].map((prop, ind) => <TodoDraggable key={prop.id+""} dragId={prop.id+""} index={ind} dropName="TO_DO"/>)}
                                            {magic.placeholder}
                                        </UnderDroppable>
                                    )}
                                </Droppable>
                            </UpperDroppable>
                            <UpperDroppable>
                                <Title>DOING...</Title>
                                <Droppable droppableId="DOING">
                                    {(magic) => (
                                        <UnderDroppable ref={magic.innerRef} {...magic.droppableProps}>
                                            {getAll["DOING"].map((prop, ind) => <TodoDraggable key={prop.id+""} dragId={prop.id+""} index={ind} dropName="DOING"/>)}
                                            {magic.placeholder}
                                        </UnderDroppable>
                                    )}
                                </Droppable>
                            </UpperDroppable>
                            <UpperDroppable>
                                <Title>DONE</Title>
                                <Droppable droppableId="DONE">
                                    {(magic) => (
                                        <UnderDroppable ref={magic.innerRef} {...magic.droppableProps}>
                                            {getAll["DONE"].map((prop, ind) => <TodoDraggable key={prop.id+""} dragId={prop.id+""} index={ind} dropName="DONE"/>)}
                                            {magic.placeholder}
                                        </UnderDroppable>
                                    )}
                                </Droppable>
                            </UpperDroppable>
                        </Boards>
                    </div>
                </Wrap>
            </DragDropContext>
        </>
    );
}

export default TodoDragDrop;
