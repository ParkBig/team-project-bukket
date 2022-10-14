import styled from "styled-components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { useSelector, useDispatch } from "react-redux";
import TodoDraggable from "./TodoDraggable";
import Form from "./Form";

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
    const toDos = useSelector(state=>state.toDoList.value["TO_DO"]);
    const doings = useSelector(state=>state.toDoList.value["DOING"]);
    const done = useSelector(state=>state.toDoList.value["DONE"]);
    const onDragEnd = () => {}
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}> 
                <Wrap>
                    <div style={{display:"block"}}>
                        <Form />
                        <Boards>
                            <UpperDroppable>
                                <Title>TODO</Title>
                                <Droppable droppableId="TODO">
                                    {(magic) => (
                                        <UnderDroppable ref={magic.innerRef} {...magic.droppableProps}>
                                            {toDos.map((prop, ind) => <TodoDraggable key={ind} dragId={prop.id+""} index={ind} />)}
                                            {magic.placeholder}
                                        </UnderDroppable>
                                    )}
                                </Droppable>
                            </UpperDroppable>
                            <UpperDroppable>
                                <Title>DOING...</Title>
                                <Droppable droppableId="DOING...">
                                    {(magic) => (
                                        <UnderDroppable ref={magic.innerRef} {...magic.droppableProps}>
                                            {doings.map((prop, ind) => <TodoDraggable key={ind} dragId={prop.id+""} index={ind} />)}
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
                                            {done.map((prop, ind) => <TodoDraggable key={ind} dragId={prop.id+""} index={ind} />)}
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
