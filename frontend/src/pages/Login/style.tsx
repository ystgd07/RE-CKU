import styled from '@emotion/styled';

export const Div = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;

    .block {
        display: block;
        color: red;
        font-size: 1rem;
        text-align: start;
        padding: 0px 3rem;
    }

    .none {
        display: none;
    }
`;

export const MobileDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    margin: 0 auto;
    text-align: center;
    align-items: center;
    border-radius: 0.4rem;

    & form {
        max-width: 28rem;
        width: 100%;
        & p {
            display: flex;
            justify-content: center;
            padding: 0px 3rem;

            & a {
                width: 200px;

                & img {
                    width: 200px;
                }
            }
        }

        & div {
            display: flex;
            flex-direction: column;
            gap: 2rem;

            & h1 {
                text-align: center;
                font-weight: bold;
                font-size: 3.2rem;
                padding-bottom: 1rem;
            }

            & input {
                padding: 2rem;
                border: 1px solid #c9cacc;
                border-radius: 0.4rem;
                font-size: 1.4rem;
                line-height: 2.2rem;
                color: #7d7e80;
                width: calc(100% - 4rem);
            }

            & article {
                & ul {
                    & li {
                        font-size: 1.4rem;

                        & .loginBtn {
                            padding: 2rem;
                            border: 1px solid #c9cacc;
                            border-radius: 0.4rem;
                            font-size: 1.4rem;
                            line-height: 2.2rem;
                            width: 100%;
                            background-color: none;
                            outline: none;
                            apperance: none;
                        }
                    }
                }
            }
        }
    }
`;
