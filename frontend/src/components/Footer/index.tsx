import styled from '@emotion/styled';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 1.4rem;
    padding: 5rem 0;
    color: #666;
`;

const Footer = () => {
    const year = new Date(Date.now()).getFullYear();
    return <Container>Copyrigh {year}. RE-CHU All rights reserved</Container>;
};

export default Footer;
