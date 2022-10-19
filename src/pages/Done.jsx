// 파이팅!
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getToDo } from "../store/modules/toDoList";
import "../style.css";
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
const DoneText = styled.div`
    font-size: 24px;
    text-decoration: line-through #FF3E3E;
`
const Done = () => {
    const { id } = useParams();
    const uid = Number(id);
    const dispatch = useDispatch();
    useEffect(() => {
        const getTodo = async () => {
            dispatch(getToDo(["DONE", (await axios.get("http://localhost:3001/DONE")).data]));
        };
        getTodo();
    }, [])
    
    const getAll = useSelector(state => state.toDoList.value);
    const getTODO = getAll["DONE"];
    
    console.log(getTODO);
    return (
        <BgImg>
            <DivPosition>
                    <PostIt>
                    <Link to={"/todoList"} style={{color:"Black", textDecoration:"none"}}>DONE</Link>
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
            <Link to={"/todoList/DONE/"+ props.id} style={{color:"Black", textDecoration:"none"}}>
                <DoneText>{props.title}</DoneText>
            </Link>
            <hr />
        </div>
    )
}

export default Done;
