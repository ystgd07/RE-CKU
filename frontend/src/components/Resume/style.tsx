import styled from "@emotion/styled";

export const ResumeContainer = styled.section`
    background-color: #f9fafb;;
    display: flex;
    justify-content: center;

    
`

export const ResumeFrame = styled.section`
    
    max-width: 80rem;
    background-color: #fff;
    border: 1px solid #d7e2eb;
    margin: 6% auto 0;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    margin: 1.25rem;

    @media all and (max-width: 1280px){
        display: unset;
    }
    
   
`

export const UserInfo = styled.div`

    @media all and (max-width: 1280px){
        padding: 2rem;

        & .userFlex{
            display: flex;
            gap: 4em;
            border: 1px solid #d3d3d3;
            border-radius: 10px;
            padding: 2rem;

            & ul{

                & li{
                    line-height: 1.4;
                    text-indent: 10px;

                    & small,input{
                        font-size: 1rem;
                    }
                    
                }

                & li:first-of-type{
                    text-indent: 0;
                    line-height: 3;
                    font-size: unset;
                    & input{
                        font-size: 2.6em;
                        font-weight: 900;
                    }
                }

                & li:last-of-type{
                    margin-top: 0.5rem;
                    & textarea{
                        width: 100%;
                        border: 1px solid #e9ecf3;
                        border-radius: 10px;
                        padding-top: 0.5rem;
                        height: 60px;
                        text-indent: 14px;
                    }
                }
            }
            
            & div{

                & article{
                    width: 160px;
                    height: 160px;
                    overflow: hidden;
                    border-radius: 50%;
                    border: 1px solid transparent;
                    
                    & img{
                        width: 100%;
                        height: 100%;
                    }
                }     
            }
            
        }
        
        
        
    }


`

export const InputForm = styled.div`
    padding: 2rem;

    & .inputFlex{
        border: 1px solid #d3d3d3;
        border-radius: 10px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        box-sizing: border-box;


        & section:first-of-type{

            & label{
                font-size: 1.2rem;
                font-weight: 600;
            }

            & form{
                margin-top: 0.5rem;
                min-height: 2.5rem;
                & p{
                    height: 40px;
                    background-color: #FBFBFD;
                    border: 1px solid #D7E2EB;
                    border-radius: 0.25rem;
                    & input{
                        height: inherit;
                        background-color: #FBFBFD;
                        padding-left: 0.9rem;
                        box-sizing: border-box;
                    }
                }
            }
        }

        & section:nth-of-type(2){
            & form{
                margin-top: 1.6em;
                & div{
                    border: 1px solid #D7E2EB;
                    border-radius: 0.25rem;
                    padding: 2rem;
                    & ul{
                        line-height: 2rem;
                        padding-bottom: 2rem;
                        & li{
                            display: flex;
                            & dl{
                                width: 33.3333333%;
                                & dt{
                                    font-size: 1.1rem;
                                    font-weight: 400;
                                }

                                & dd{
                                    height: 3rem;
                                    & input{
                                        border: 1px solid #B0E0E6;
                                        height: inherit;
                                        font-size: 0.8rem;
                                        border-radius: 0.25rem;
                                        box-sizing: border-box;
                                        width: 90%;
                                        padding-left: 0.9rem;
                                    }
                                }
                            }

                            & .noneDevelop{
                                display: flex;
                                align-items: center;
                                gap: 1rem;
                                
                                & dt{
                                    padding-left: 1rem;
                                    width: 26px;
                                    height: 26px;
                                    & input[type="checkbox"]{
                                        width: 26px;
                                        height: 26px;
                                        padding: 0;
                                        margin: 0;

                                    }
                                    
                                }

                                & dd{
                                    padding-left: 1rem;
                                    border-left: 1px solid #B0E0E6;
                                    height: unset;
                                    & label{
                                        font-size: 1.2rem;
                                    }
                                }

                                
                            }
                        }
                    }

                    & ul:last-of-type{
                        padding-bottom: 0;
                    }
                }
            }
            
        }
    }
`

export const FormTitle = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 1rem;
    border: 1px solid #D7E2EB;
    border-radius: 0.25rem;
    align-items: center;
    padding: 1rem;

    & label{
        font-size: 1.2rem;
        font-weight: 600;
    }

    & span{
        width: 32px;
        height: 32px;
        cursor: pointer;
        & svg{
            font-size: 1.55rem;
        }
    }

`



