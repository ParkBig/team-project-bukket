import { Link } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Button = styled.button`
    width: 500px;
    height: 200px;
    border-radius: 15px;
    background-color: transparent;
    box-shadow: 5px 10px 15px 5px gray;
    border: 0;
`;
const Title = styled.div`
    color: black;
    text-align: center;
    padding: 80px 0 80px 0;
    font-size: 30px;
`;

const GotoList = () => {
    return (
        <Div>
            <Button>
                <Link to={"/todoList"} style={{textDecoration:"none"}}>
                    <Title>
                        Start My Goal
                    </Title>
                </Link>
            </Button>
        </Div>
    );
}

export default GotoList;
