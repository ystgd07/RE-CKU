import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Err from 'assets/images/404.png';

const Image = styled.img`
    width: 80%;
    height: 80%;
`;
const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1280;
    margin: 2% auto 0;
    text-align: center;
    align-items: center;
    opacity: 0.8;
    border-radius: 10px;
`;
const H1 = styled.h1`
    margin: 20px;
    font-size: 64px;
    font-weight: bold;
`;
const H2 = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;

const Err404 = () => {
    return (
        <Div>
            <H1>404 not found</H1>
            <Image src={Err} />
            <Link to="/">
                <H2>Home</H2>
            </Link>
        </Div>
    );
};

export default Err404;
