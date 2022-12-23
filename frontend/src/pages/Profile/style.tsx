import styled from '@emotion/styled';

export const Bar = styled.div`
    position: relative;
    margin-top: calc(48px + 33.3333vw);
    text-decoration: none;
    background: rgb(255, 255, 255);
    border-top: 1px solid rgb(221, 223, 224);
    border-bottom: 1px solid rgb(221, 223, 224);

    & > div {
        max-width: 1200px;
        padding: 0 16px;
        margin: 0 auto;
        & > div {
            position: absolute;
            left: 16px;
            top: -60px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            transition: filter 0.2s ease 0s;
            filter: drop-shadow(rgba(157, 73, 0, 0.6) 0px 4px 8px);
        }
    }
    & > div {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        & > span {
            font-size: 2rem;
            font-weight: bold;
            vertical-align: middle;
            word-break: break-all;
            overflow-wrap: break-word;
        }
        & > div {
            display: block;
            height: 16px;
        }
        & > div {
            position: relative;
            height: 24px;
            overflow: hidden;
            vertical-align: top;
            background: transparent;
            & > div {
                position: relative;
                height: 100%;
                width: 100%;
                overflow: hidden;
                border-radius: 4px;
                background: rgb(11, 19, 27);
                & > div {
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    height: 100%;
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    overflow: hidden;
                    background: linear-gradient(
                        to right,
                        rgb(173, 86, 0) 0%,
                        rgb(232, 77, 11) 100%
                    );
                    width: 63.3333%;
                }
            }
        }
    }
`;
export const Layout = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
`;
// & > div {
//     width: 50%;
//     position: absolute;
//     left: 0px;
//     top: 0px;
//     height: 100%;
//     border-top-right-radius: 4px;
//     border-bottom-right-radius: 4px;
//     overflow: hidden;
//     background: linear-gradient(to right, rgb(173, 86, 0) 0%, rgb(232, 77, 11) 100%);
// }
