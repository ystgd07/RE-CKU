import styled from '@emotion/styled';

export const MobileDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
    max-width: 128rem;
    margin: 2% auto 0;
    text-align: center;
    align-items: center;

    .block {
        display: block;
        color: red;
        font-size: 1rem;
        text-align: start;
        margin-top: 1rem;
    }

    .none {
        display: none;
    }

    & form {
        max-width: 46rem;
        width: 100%;

        & h1 {
            font-family: 'Viga', sans-serif;
            text-align: center;
            font-weight: 900;
            font-size: 4rem;
        }

        & .signWrap {
            margin-top: 2rem;
            & ul {
                & li {
                    margin-bottom: 2rem;

                    & label {
                        display: block;
                        text-align: left;
                        font-size: 1.4rem;
                        font-weight: 600;
                        padding-bottom: 1rem;
                    }

                    & input {
                        padding: 1.6rem 2rem;
                        border: 1px solid #c9cacc;
                        border-radius: 0.4rem;
                        font-size: 1.4rem;
                        line-height: 2.2rem;
                        color: #7d7e80;
                        width: calc(100% - 4rem);
                    }

                    & button[type='button'] {
                        border: 1px none #c9cacc;
                        border-radius: 0.4rem;
                        font-size: 1.4rem;
                        width: 100%;
                        line-height: 2.2rem;
                        background-color: rgba(0, 0, 0, 0.08);
                        padding: 1.6rem 2rem;
                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                & li:nth-of-type(3) {
                    display: flex;
                    gap: 1rem;

                    & input {
                        width: 70%;
                    }

                    & button[type='button'] {
                        padding: 1rem;
                        width: calc(100% - 70%);
                    }
                }
            }

            & div {
                padding: 2rem 0;

                & button {
                    padding: 1.6rem 2rem;
                    border: 0;
                    background-color: #d3d3d3;
                    border-radius: 0.4rem;
                    font-size: 1.4rem;
                    line-height: 2.2rem;
                    width: 100%;
                    font-weight: 600;

                    &:hover {
                        cursor: pointer;
                        background-color: gray;
                    }
                }
            }
        }
    }
`;
