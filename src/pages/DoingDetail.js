// 파이팅!
import "../style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
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
    background-color: #FFE16F;
`;
const UserCommentsCollections = styled.div`
    align-items: flex-start;
`;
const DoingDetail = () => {
    const { id } = useParams();
    const uid = Number(id);
    const dispatch = useDispatch();
    useEffect(() => {
        const getTodo = async () => {
            dispatch(getToDo(["DOING", (await axios.get("https://week5-assign.herokuapp.com/DOING")).data]));
        };
        getTodo();
    }, []);
    
    const getAll = useSelector(state => state.toDoList.value);
    const getTODO = getAll["DOING"];
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
                            <hr />
                            <div>{getContent}</div>
                            
                        </div>
                    </div>
                    <CommandForm>
                        <hr width="100%" size="30" color="white" />
                        <hr />
                        닉네임<input />
                        댓글<input />
                    </CommandForm>
                    <hr color="#FEF16F" size="3"></hr>
                    <UserCommentsCollections>
                        <UserComment id={'ㅇㅇ'} comments={'못할거같으면 개추ㅋㅋ'} />
                        <UserComment id={'ㅇㅇ'} comments={'일단 나부터ㅋㅋㅋ'} />
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

export default DoingDetail;
