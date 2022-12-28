import styled from '@emotion/styled';

export const ResumeFrame = styled.section`
    max-width: 128rem;
    margin: 0 auto;
    padding-top: 6rem;

    & p {
        text-align: start;
        padding: 0px 30px;
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
`;

export const BorderDiv = styled.div`
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;

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
    width: 100%;
    border-bottom: 3px solid black;
`;

export const TopSection = styled.section`
    background-color: #4169e1;
    max-width: 100%;

    & h1 {
        font-size: 3rem;
        padding: 1rem 0 1rem 0;
        border-bottom: 2px solid #fff;
    }

    & .infoWrap {
        padding-left: 6rem;

        & label {
            font-size: 3rem;
            font-weight: 600;
            line-height: 1.6;
        }

        & div {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            gap: 3rem;
            padding: 1rem 0 2rem 0;

            & img {
                height: 160px;
            }

            & dl {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                & dt {
                    font-size: 2.2rem;
                }
            }
        }
    }
`;
