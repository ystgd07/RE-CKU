import styled from '@emotion/styled';

export const ComunityFrame = styled.section`
    max-width: 100%;
    height: 100%;

    & .comuNav {
        display: flex;
        flex-direction: row;
        justify-content: center;

        & ul {
            justify-content: center;
            border: 1px solid #d3d3d3;
            display: flex;
            gap: 2rem;
            padding: 2rem 10rem;
            & li {
                font-size: 2rem;
                font-weight: 600;
            }
        }
    }

    & .postWrap {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 2rem;
        grid-row-gap: 4rem;
    }
`;

export const Post = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 28rem;
    height: 21rem;
    border-radius: 1rem;
    background-color: #fffbe3;
    border: 0.1rem solid #fffbe3;
    padding: 1rem;
    cursor: pointer;
    &:hover {
        border-color: #ccb94c;
    }

    & strong {
    }
`;
