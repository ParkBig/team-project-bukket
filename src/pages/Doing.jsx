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
const DoingText = styled.div`
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
`;
const Doing = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getTodo = async () => {
            dispatch(getToDo(["DOING", (await axios.get("https://week5-assign.herokuapp.com/DOING")).data]));
        };
        getTodo();
    }, []);
    
    const getAll = useSelector(state => state.toDoList.value);
    const getTODO = getAll["DOING"];
    const DOINGStyle = {
        color:"Black", 
        textDecoration:"none",
        fontSize : "36px"
    };
    return (
        <BgImg>
            <DivPosition>
                    <PostIt>
                    <Link to={"/todoList"} style={DOINGStyle}>🔥 DOING 🔥</Link>
                    <hr />
                    {
                        getTODO.map((todo, index) =>(
                        <TodoList 
                        key={getTODO[index].id} 
                        title = {getTODO[index].title} 
                        id = {getTODO[index].id}
                        />
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
            <Link to={"/todoList/DOING/"+ props.id} style={TODOLISTStyle}>
                <DoingText>{props.title}</DoingText>
            </Link>
            <hr />
        </div>
    )
}

export default Doing;
