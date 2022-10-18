import styled from "styled-components";
import GotoList from "../components/GotoList";
import Summary from "../components/Summary";

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #DADFE9;
`;
const UnderDiv = styled.div`
    display: block;
`;

const Main = () => {
    return (
        <>
            <Div>
                <UnderDiv>
                    <GotoList/>
                    <Summary/>
                </UnderDiv>
            </Div>
        </>
    );
}

export default Main;
