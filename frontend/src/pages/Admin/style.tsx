import styled from '@emotion/styled';

export const Image = styled.img`
    width: 80%;
    height: 80%;
`;
export const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1280p;
    margin: 2% auto 0;
    text-align: center;
    align-items: center;
    opacity: 0.8;
    border-radius: 10px;

    /* & div {
        width: 100%;
        display: flex;
        flex-direction: row;
        border: 1px solid black;
        & div {
            display: flex;
            flex-direction: column;
        }
    } */
`;
export const H1 = styled.h1`
    margin: 20px;
    font-size: 64px;
    font-weight: bold;
`;
export const H2 = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;

export const Nav = styled.div`
    border: 1px solid black;
    padding: 10px;
    width: 20%;
    display: flex;
    flex-direction: column;
    & div {
        font-size: 15px;
        font-weight: bold;
        margin: 10px 20px;
    }
`;
export const Content = styled.div`
    border: 1px solid black;
    padding: 20px;
    width: 80%;
    display: flex;
    flex-direction: column;
    text-align: start;
    & div {
        font-size: 16px;
        font-weight: bold;
        margin: 10px 20px;
    }
`;
export const RowDiv = styled.div`
    border: 1px solid black;
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    height: 50vh;
`;
