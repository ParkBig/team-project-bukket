// 파이팅!
import "../style.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getToDo } from "../store/modules/toDoList";

const DivPosition = styled.div`
    width: 50%;
    
    justify-content: center;
    align-items: center;
`;
const MainForm = styled.div`
    
`;
const CommandForm = styled.div`
    display: column-reverse;
    
`;
const Title = styled.div`
    font-size: 36px;
    text-align: left;
    background-color: #FFE16F
`;
const UserCommentsCollections = styled.div`
    align-items: flex-start;
`;
const DoneDetail = () => {
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
    const getIndex = getTODO.findIndex(obj => obj.id === uid);
    
    
    const getTitle = getTODO[getIndex]?.title;
    const getWriter = getTODO[getIndex]?.writer;
    const getContent = getTODO[getIndex]?.content;

    return (
        <>
            <DivPosition>
                <MainForm>
                    <div>
                        <div >
                            <Title >{getTitle}</Title>
                        </div>
                        <div>
                            <hr width="100%" size="5" color="white" />
                            <div>작성자 : {getWriter}</div>
                        </div>
                        <div>
                            <hr></hr>
                            <div>{getContent}</div>

                        </div>
                    </div>
                    <CommandForm>
                        <hr width="100%" size="30" color="white" />
                        닉네임<input />
                        댓글<input />
                    </CommandForm>
                    <hr color="#FEF16F" size="3"></hr>
                    <UserCommentsCollections>
                        <UserComment id={'ㅇㅇ'} comments={'어케했노'} />
                        <UserComment id={'ㅇㅇ'} comments={'이걸하네 ㄷㄷ'} />
                    </UserCommentsCollections>
                </MainForm>
            </DivPosition>
        </>
    )
}

const UserComment = (props) =>{
    return (
        <div>
            {props.id}: {props.comments}
            <hr />
        </div>
    )
}

export default DoneDetail;
