import styled from '@emotion/styled';

export const ComunityFrame = styled.section`
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
`;
