import styled from '@emotion/styled';
import Elice from 'assets/images/elice@2x.png';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 1.4rem;
    padding: 5rem 0;
    color: #666;
`;
const Img = styled.img`
    height: 17px;
    cursor: pointer;
`;
const Div = styled.div`
    margin: 0 10px;
`;

const Footer = () => {
    const year = new Date(Date.now()).getFullYear();
    return (
        <Container>
            Copyrigh {year}. RE-CHU All rights reserved with
            <Div>
                <Img src={Elice} onClick={() => window.location.replace('https://elice.io/')}></Img>
            </Div>
        </Container>
    );
};

export default Footer;
