import React from 'react';
import Logo from 'assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { HContainer, HHeader } from './style';

const Header = () => {
    const navigate = useNavigate();
    return (
        <HContainer>
            <HHeader>
                <h1 onClick={() => navigate('/')}>
                    <img src={Logo} alt="logo" />
                </h1>

                <nav></nav>
            </HHeader>
        </HContainer>
    );
};

export default Header;
