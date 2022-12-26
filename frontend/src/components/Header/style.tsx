import styled from '@emotion/styled';

export const HContainer = styled.section`
    max-width: 100%;
    margin-bottom: 5rem;
`;

export const HHeader = styled.header`
    display: flex;
    justify-content: space-around;
    padding: 1.9rem;
    align-items: center;
    font-size: 2rem;
    border-bottom: 1px solid #b0e0e6;
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
        gap: 4.8rem;

        & nav {
            & ul {
                display: flex;
                gap: 1.9rem;
            }
        }

        & .util {
            display: flex;
            gap: 1.9rem;
            li:last-child {
                cursor: pointer;
            }
        }
    }
`;
