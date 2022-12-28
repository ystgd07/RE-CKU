import styled from '@emotion/styled';

export const FindPwFrame = styled.section`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 10%;

    .block {
        display: block;
        color: red;
        font-size: 1.4rem;
        text-align: start;
    }

    .none {
        display: none;
    }

    & form {
        max-width: 46rem;
        width: 100%;

        & div {
            width: 100%;

            & h1 {
                font-size: 4rem;
                padding-bottom: 2rem;
            }

            & ul {
                display: flex;
                flex-direction: column;
                gap: 2rem;

                & li {
                    & input {
                        padding: 1.6rem 2rem;
                        border: 1px solid #c9cacc;
                        border-radius: 0.4rem;
                        font-size: 1.4rem;
                        line-height: 2.2rem;
                        color: #7d7e80;
                        width: calc(100% - 9%);
                    }

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
    }
`;
