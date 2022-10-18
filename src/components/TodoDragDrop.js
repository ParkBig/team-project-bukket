import styled from "styled-components";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { useSelector, useDispatch } from "react-redux";
import TodoDraggable from "./TodoDraggable";
import Form from "./Form";
import { deleteValue, getToDo, insertValue } from "../store/modules/toDoList";
import trashImg from "../img/icons8-trash-64.png"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getData } from "../api";
import axios from "axios";

const Wrap = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(168, 153, 143, 0.43);
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
          const todo = await axios.get("http://localhost:3001/TO_DO");
          dispatch(getToDo(["TO_DO", (todo.data)]));
          const doing = await axios.get("http://localhost:3001/DOING");
          dispatch(getToDo(["DOING", (doing.data)]));
          const done = await axios.get("http://localhost:3001/DONE");
          dispatch(getToDo(["DONE", (done.data)]));
        };
        getTodo();
      }, []);
    const dispatch = useDispatch();
    const getAll = useSelector(state=>state.toDoList.value);
    const onDragEnd = async (info) => {
        if (!info.destination) return;
        if (info.destination.droppableId === "trash") {
            await axios.delete(`http://localhost:3001/${info.source.droppableId}/${info.draggableId}`);
            return dispatch(deleteValue([info.source.droppableId, info.source.index]));
        }
        await axios.delete(`http://localhost:3001/${info.source.droppableId}/${info.draggableId}`);
        dispatch(deleteValue([info.source.droppableId, info.source.index]));
        await axios.post(`http://localhost:3001/${info.destination.droppableId}`,(getAll[info.source.droppableId][info.source.index]))
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
                                <Title bgColor="rgba(104, 142, 207, 1)">TODO</Title>
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
                                <Title bgColor="rgba(207, 137, 104, 1)">DOING...</Title>
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
                                <Title bgColor="rgba(104, 207, 156, 1)">DONE</Title>
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
