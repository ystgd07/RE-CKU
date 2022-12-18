import styled from '@emotion/styled';

export const HContainer = styled.section`
    max-width: 100%;
    margin-bottom: 5rem;
`;

export const HHeader = styled.header`
    display: flex;
    justify-content: space-around;
    padding: 1.2rem;
    align-items: center;
    font-size: 1.2rem;
    border-bottom: 1px solid #6495ed;
    box-sizing: border-box;
    font-weight: 600;
    width: 100%;

    & h1 {
        height: 100px;
        cursor: pointer;

        & img {
            width: 100%;
            height: 100%;
        }
    }

    & div {
        display: flex;
        gap: 3rem;

        & nav {
            & ul {
                display: flex;
                gap: 1.2rem;
            }
        }

        & .util {
            display: flex;
            gap: 1.2rem;
        }
    }
`;
