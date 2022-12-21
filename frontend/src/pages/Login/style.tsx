import styled from '@emotion/styled';

export const MobileDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    max-width: 1280px;
    margin: 6% auto 0;
    text-align: center;
    align-items: center;
    background-color: #d2eafb;
    background-image: linear-gradient(139deg, #d2eafb 0%, #beb2e0 100%);
    opacity: 0.8;
    border-radius: 10px;

    & h1 {
        margin: 80px 0 30px 0;
        text-align: center;
        font-weight: bold;
        font-size: 32px;
    }

    & input {
        margin: 20px;
        padding: 20px;
        border: 1px solid #c9cacc;
        border-radius: 10px;
        height: 30px;
        width: 80%;
        font-size: 14px;
        line-height: 22px;
        color: #7d7e80;
    }

    & button {
        margin: 30px;
        padding: 20px;
        border: 1px none #c9cacc;
        border-radius: 10px;
        width: 80%;
        font-size: 14px;
        line-height: 22px;
        background-color: rgba(0, 0, 0, 0.08);
        font-size: 16px;
    }
    & label {
        color: red;
        font-size: 10px;
        text-align: start;
        padding: 0px 30px;
    }
    & form {
        & p {
            display: flex;
            width: 200px;
            text-align: center;
*6          padding: 0px 30px;
        }
    }
    & div {
      text-align: center;
    }
`;

export const PassButton = styled.button`
    margin: 40px;
`;

export const Div = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
`;
