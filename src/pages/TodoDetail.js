import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getToDo } from "../store/modules/toDoList";



const TodoDetail = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        const getTodo = async () => {
            dispatch(getToDo(["TO_DO", (await axios.get("http://localhost:3001/TO_DO")).data]))
        };
        getTodo();
    }, []);
    const toDoData = (useSelector(state=>state.toDoList.value))["TO_DO"];
    return (
        <div>
            hi
        </div>
    )
}
export default TodoDetail;
