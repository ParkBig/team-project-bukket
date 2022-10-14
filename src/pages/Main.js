import styled from "styled-components";
import GotoList from "../components/GotoList";

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 400px;
`;

const Main = () => {
    return (
        <>
            <Div>
                <GotoList/>
            </Div>
        </>
    );
}

export default Main;
