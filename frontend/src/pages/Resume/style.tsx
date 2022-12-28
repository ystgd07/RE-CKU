import styled from '@emotion/styled';

export const MobileDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    min-width: 320px;
    margin: 2% auto 0;
    text-align: start;
    align-items: center;
    opacity: 0.8;
    border-radius: 5px;

    & p {
        text-align: start;
        padding: 0px 30px;
    }
    & h1 {
        margin: 80px;
        font-weight: bold;
        font-size: 40px;
    }
    & h2 {
        font-size: 20px;
        font-weight: bold;
    }
    & h4 {
        font-size: 15px;
        font-weight: bold;
    }
    & img {
        margin: 0 10px 0 80px;
        width: 100px;
        height: 100px;
    }

    @media (max-width: 860px) {
        & h1 {
            font-size: 30px;
        }
    }
    @media (max-width: 640px) {
        & h1 {
            font-size: 20px;
        }
    }
`;

export const BorderDiv = styled.div`
    width: 90%;
    max-width: 1280px;
    margin: 0 0 30px 0;
    /* border-top: 2px solid gray; */
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    background-color: #ffffffc1;

    & div {
        display: flex;
        flex-direction: row;
        & div {
            flex-direction: column;
            & div {
                flex-direction: row;
            }
        }
    }

    @media (max-width: 640px) {
        & div {
            flex-direction: column;
        }
    }
`;

export const H2 = styled.h2`
    text-align: start;
`;

export const LineDiv = styled.div`
    width: 90%;
    border-bottom: 3px solid black;
`;
