import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HContainer, HDiv, HLogo } from './style';

const Header = () => {
    const navigate = useNavigate();
    return (
        <HContainer>
            <HDiv>
                <div>
                    <div onClick={() => navigate('/')}>
                        <HLogo>RECHU</HLogo>
                    </div>
                </div>
            </HDiv>
        </HContainer>
    );
};

export default Header;
