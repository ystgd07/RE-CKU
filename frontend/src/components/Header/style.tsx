import styled from '@emotion/styled';

export const HContainer = styled.header`
    max-width: 100%;
    height: 200px;
`;

export const HDiv = styled.div`
    display: flex;
    min-height: 32px;
    height: auto;
    width: 100%;
    padding: 23px 0 23px 0;

    [hlogo]: {
        width: 100%;
        height: 100%;
        background: url('assets/images/logo.png') 0 0 no-repeat;
        background-size: auto 100%;
        text-indent: -9999px;
        margin-left: 20px;
        margin-top: 4px;
        cursor: pointer;
    }
`;

export const HLogo = styled.h1`
    width: 140px;
    height: 23px;

    text-indent: -9999px;
    margin-left: 20px;
    margin-top: 4px;
    cursor: pointer;
`;
