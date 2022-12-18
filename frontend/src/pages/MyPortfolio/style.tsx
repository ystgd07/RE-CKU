import styled from '@emotion/styled';

export const Layout = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    width: -webkit-calc(100% - 20px);
    & > div {
        height: 190px;
        width: -webkit-calc(100% - 20px);
        margin-bottom: 20px;
        margin-right: 20px;
        position: relative;
        border: 1px solid #dbdbdb;
        background-color: #fff;
        padding: 1rem;
        margin: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        border-radius: 6px;
        background-color: white;
        cursor: pointer;

        & > h3 {
            font-size: 18px;
            font-weight: 600;
            line-height: 1.33;
            max-height: 46px;
            max-width: 100%;
            letter-spacing: normal;
            text-align: left;
            color: #333;
            overflow: hidden;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            border: none;
        }
        & > p {
            color: #999;
            margin-top: 5px;
        }
        & div {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            & div {
                background-color: #36f;
                color: #fff;
                width: 74px;
                height: 74px;
                margin: 0 auto;
                border-radius: 50%;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-pack: center;
                justify-content: center;
                -ms-flex-align: center;
                align-items: center;
                font-size: 26px;
                & i {
                    speak: none;
                    font-style: normal;
                    font-weight: normal;
                    font-variant: normal;
                    text-transform: none;
                    line-height: 1;
                    -webkit-font-smoothing: antialiased;
                }
            }
            & p {
                font-size: 16px;
                font-weight: 600;
                letter-spacing: normal;
                text-align: center;
                color: #333;
                margin: 20px 0 0;
            }
        }
    }
`;
export const Alert = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & > p {
    }
`;
// export const Layout2 = styled.div`
//   height: 190px;
//   width: -webkit-calc(100% - 20px);
//   margin-bottom: 20px;
//   margin-right: 20px;
//   position: relative;
//   border: 1px solid #dbdbdb;
//   background-color: #fff;
//   & > div {
//     padding: 6px 20px;
//     font-size: 16px;
//     font-weight: 500;
//     letter-spacing: normal;
//     text-align: left;
//     &h3 {
//       font-size: 18px;
//       font-weight: 600;
//       line-height: 1.33;
//       max-height: 46px;
//       max-width: 100%;
//       letter-spacing: normal;
//       text-align: left;
//       color: #333;
//       overflow: hidden;
//       word-break: break-all;
//       display: -webkit-box;
//       -webkit-line-clamp: 2;
//       -webkit-box-orient: vertical;
//       border: none;
//     }
//     &p {
//       color: #999;
//       margin-top: 5px;
//     }
//   }
// `;

// export const MyPortfolios = styled.div`
//   width: 252px;
//   height: 140px;
//   border-style: solid;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 20px;

//   & button {
//     position: fixed;
//   }
// `;

// export const PortfolioLists = styled.ul`
//   display: flex;
//   flex-direction: column;
//   padding: 1rem;
//   margin: 1rem;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
//   border-radius: 6px;
//   background-color: white;
//   width: 368px;
//   & div {
//     height: 190px;
//     width: calc(25%-20px);
//     margin-bottom: 20px;
//     margin-right: 20px;
//     position: relative;

//     & button {
//       background-color: white;
//       cursor: pointer;
//       -webkit-transition-duration: 0.5s;
//       transition-duration: 0.5s;
//       &:hover {
//         background-color: #d3d3d3;
//       }
//     }
//   }
// `;
