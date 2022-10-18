import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { addToDo, addDone, addDoing, getToDo } from "../store/modules/toDoList"

const UpperForms = styled.div`
    width: 40%;
    margin: auto;
`;
const Forms = styled.form`
    display: flex;
    gap: 5px;
    margin-bottom: 40px;
`;
const Wrap = styled.div`
    display: flex;
    gap: 5px;
    margin: 5px;
`;
const Span = styled.span`
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    text-align: center;
    width: 25%;
    border: 0.5px solid;
    background-color: #DADFE9;
`;
const Input = styled.input`
    width: 400px;
    border-radius: 7px;
    text-align: center;
`;
const Button = styled.button`
    border-radius: 10px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    text-align: center;
    width: 40px;
    height: 80px;
    margin: auto;
    background-color: #DADFE9;
`;
const Div = styled.div`
    flex-direction: column;
`;

// 제목, 내용, 작성자, 시간을 객체에 담아 addToDo만 한다.
const Form = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue } = useForm();
    const onValid = async (data) => {
        await axios.post(`http://localhost:3001/TO_DO`,({"title":data.title, "writer":data.writer, "content":data.content, "id":Date.now()}))
        dispatch(getToDo(["TO_DO", await axios.get(`http://localhost:3001/TO_DO`).then(res=>res.data)]))
        setValue("writer", "");
        setValue("title", "");
        setValue("content", "");
    }
    return (
        <UpperForms>
            <Forms onSubmit={handleSubmit(onValid)}>
                <Div>
                    <Wrap>
                        <Span>작성자</Span>
                        <Input {...register("writer", { required: "작성자를 적어주세요..." })} placeholder="작성자를 적어주세요..." />
                    </Wrap>
                    <Wrap>
                        <Span>제목</Span>
                        <Input {...register("title", { required: "제목을 적어주세요...", maxLength:16 })} placeholder="제목을 적어주세요... ( 16자제한. )" />
                    </Wrap>
                    <Wrap>
                        <Span>내용</Span>
                        <Input {...register("content", { required: "내용을 적어주세요..." })} placeholder="내용을 적어주세요..." />
                    </Wrap>
                </Div>
                <Button>Go!</Button>
            </Forms>
        </UpperForms>
    );
}

export default Form;
