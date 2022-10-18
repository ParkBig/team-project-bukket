import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getToDo } from "../store/modules/toDoList";

const Wrap = styled.div`
    width: 600px;
    display: flex;
    margin-top: 300px;
    gap: 20px;
`;
const NameDiv = styled.div`
    text-align: center;
    margin: auto;
    font-family: fantasy;
`;
const LeftDiv = styled.div`
    margin: 10px;
`;


const Summary = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const getTodo = async() => {
            dispatch(getToDo(["TO_DO", (await axios.get("http://localhost:3001/TO_DO")).data]));
            dispatch(getToDo(["DOING", (await axios.get("http://localhost:3001/DOING")).data]));
            dispatch(getToDo(["DONE", (await axios.get("http://localhost:3001/DONE")).data]));
        };
        getTodo();
    }, [])
    const getAll = useSelector(state=>state.toDoList.value);
    const toDoLength = getAll["TO_DO"].length;
    const doingLength = getAll["DOING"].length;
    const doneLength = getAll["DONE"].length;
    return (
        <Wrap>
            <NameDiv>
                <LeftDiv>
                    Our_TO_DO_Left
                </LeftDiv>
                <LeftDiv>
                    {toDoLength}
                </LeftDiv>
            </NameDiv>
            <NameDiv>
                <LeftDiv>
                    We_Are_DOING
                </LeftDiv>
                <LeftDiv>
                    {doingLength}
                </LeftDiv>
            </NameDiv>
            <NameDiv>
                <LeftDiv>
                    We_Are_DONE
                </LeftDiv>
                <LeftDiv>
                    {doneLength}
                </LeftDiv>
            </NameDiv>
        </Wrap>
    )
}

export default Summary;
