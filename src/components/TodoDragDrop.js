import styled from "styled-components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { useSelector, useDispatch } from "react-redux";
import TodoDraggable from "./TodoDraggable";
import Form from "./Form";
import { deleteValue, getToDo, insertValue } from "../store/modules/toDoList";
import trashImg from "../img/icons8-trash-64.png"
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Wrap = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, rgb(0, 224, 201), rgb(168, 139, 168));
`;
const Boards = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: 20px;
`;
const UpperDroppable = styled.div`
    width: 400px;
    height: 500px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #DADFE9;
`;
const Title = styled.div`
    width: 90%;
    border-radius: 15px;
    box-shadow: -1px 5px 15px 2px ${(prop)=>prop.bgColor};
    text-align: center;
    padding: 10px;
    margin: auto;
    background-color: ${(prop)=>prop.bgColor};
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bolder;
`;
const UnderDroppable = styled.div`
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    margin: auto;
    margin-top: 10px;
    padding: 10px 20px 10px 20px;
    overflow: scroll;
    background-color: transparent;
    border-radius: 15px;
    width: 88%;
    &::-webkit-scrollbar {
        width: 8px;
        height: 0;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #424242;
        border-radius: 50px;
    }
`;
const TrashWrap = styled.div`
    width: 150px;
    height: 150px;
    margin: auto;
    margin-top: 50px;
    background-color: #DADFE9;
    border-radius: 30px;
    align-items: center;
    text-align: center;
`;
const TrashImg = styled.img`
    width: 100px;
    height: 100px;
    margin: 25px;
`;

const TodoDragDrop = () => {
    useEffect(() => {
        const getTodo = async () => {
            dispatch(getToDo(["DOING", (await axios.get("https://week5-assign.herokuapp.com/DOING")).data]));
            dispatch(getToDo(["TO_DO", (await axios.get("https://week5-assign.herokuapp.com/TO_DO")).data]));
            dispatch(getToDo(["DONE", (await axios.get("https://week5-assign.herokuapp.com/DONE")).data]));
        };
        getTodo();
      }, []);
    const dispatch = useDispatch();
    const getAll = useSelector(state=>state.toDoList.value);
    const onDragEnd = async (info) => {
        if (!info.destination) return;
        if (info.destination.droppableId === "trash") {
            await axios.delete(`https://week5-assign.herokuapp.com/${info.source.droppableId}/${info.draggableId}`);
            return dispatch(deleteValue([info.source.droppableId, info.source.index]));
        }
        await axios.delete(`https://week5-assign.herokuapp.com/${info.source.droppableId}/${info.draggableId}`);
        dispatch(deleteValue([info.source.droppableId, info.source.index]));
        await axios.post(`https://week5-assign.herokuapp.com/${info.destination.droppableId}`,(getAll[info.source.droppableId][info.source.index]))
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
                                <Link to={"/todoList/TODO"} style={{textDecoration:"none"}}><Title bgColor="rgba(104, 142, 207, 1)">TODO</Title></Link>
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
                                <Link to={"/todoList/DOING"} style={{textDecoration:"none"}}><Title bgColor="rgba(207, 137, 104, 1)">DOING...</Title></Link>
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
                                <Link to={"/todoList/DONE"} style={{textDecoration:"none"}}><Title bgColor="rgba(104, 207, 156, 1)">DONE</Title></Link>
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
                        <TrashWrap>
                            <Droppable droppableId="trash">
                                {(magic)=> (
                                    <div ref={magic.innerRef} {...magic.droppableProps}>
                                        <TrashImg src={trashImg} />
                                        {magic.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </TrashWrap>
                    </div>
                </Wrap>
                
            </DragDropContext>
        </>
    );
}

export default TodoDragDrop;
