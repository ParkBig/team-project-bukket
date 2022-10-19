// 파이팅!
import "../style.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getToDo } from "../store/modules/toDoList";
import BackgroundImg from "../img/borad.jpg"
const BgImg = styled.div`
    background-image: url(${BackgroundImg})
`
const DivPosition = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    display: column;
    align-items: center;
    justify-content: center;
`;
const PostIt = styled.div`
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border: 1px solid black;
    background-color: #fff8b7;
`
const ToDoText = styled.div`
    font-size: 24px;
    font-weight: bold;
`
const Todo = () => {
    const { id } = useParams();
    const uid = Number(id);
    const dispatch = useDispatch();
    useEffect(() => {
        const getTodo = async () => {
            dispatch(getToDo(["TO_DO", (await axios.get("http://localhost:3001/TO_DO")).data]));
        };
        getTodo();
    }, [])
    
    const getAll = useSelector(state => state.toDoList.value);
    const getTODO = getAll["TO_DO"];
    
    console.log(getTODO);
    return (
        <BgImg>
            <DivPosition>
                    <PostIt>
                    <Link to={"/todoList"} style={{color:"Black", textDecoration:"none"}}>TODO</Link>
                    <hr />
                    {
                        getTODO.map((todo, index) =>(
                        <TodoList title = {getTODO[index].title} id = {getTODO[index].id}/>
                        ))
                    }
                    </PostIt>
            </DivPosition>
        </BgImg>
    )
}

const TodoList = (props) =>{
  return (
    <div>
        {/*  <Link to={"/todoList"} style={{textDecoration:"none"}}> */}
        <Link to={"/todoList/TODO/"+ props.id} style={{color:"Black", textDecoration:"none"}}>
            <ToDoText>{props.title}</ToDoText>
        </Link>
        <hr />
    </div>
)
}

export default Todo;
