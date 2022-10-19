// 파이팅!
import "../style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getToDo } from "../store/modules/toDoList";
import BackgroundImg from "../img/borad.jpg"

const BgImg = styled.div`
    background-image: url(${BackgroundImg});
    height: 100vh;
    width: 100vw;
    background-size: cover;
`;
const DivPosition = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const PostIt = styled.div`
    width: 300px;
    height: 300px;
    margin: 0 auto;
    border: 1px solid black;
    background-color: #fff8b7;
`;
const ToDoText = styled.div`
    font-size: 20px;
    font-weight: bold;
`;
const Todo = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getTodo = async () => {
            dispatch(getToDo(["TO_DO", (await axios.get("http://localhost:3001/TO_DO")).data]));
        };
        getTodo();
    }, []);
    
    const getAll = useSelector(state => state.toDoList.value);
    const getTODO = getAll["TO_DO"];
    const TODOStyle = {
        color:"Black", 
        textDecoration:"none",
        fontSize : "36px"
    };
    return (
        <BgImg>
            <DivPosition>
                    <PostIt>
                    
                    <Link to={"/todoList"} style={TODOStyle}>📝 TODO 📝</Link>
                    <hr />
                    {
                        getTODO.map((todo, index) =>(
                        <TodoList key={getTODO[index].id} title = {getTODO[index].title} id = {getTODO[index].id} />
                        ))
                    }
                    </PostIt>
            </DivPosition>
        </BgImg>
    )
}

const TodoList = (props) =>{
    const TODOLISTStyle = {
        color:"Black",
        textDecoration: "none"
    }
    return (
    <div>
        
        <Link to={"/todoList/TODO/"+ props.id} style={TODOLISTStyle}>
            <ToDoText>{props.title}</ToDoText>
        </Link>
        <hr />
    </div>
)
}

export default Todo;
