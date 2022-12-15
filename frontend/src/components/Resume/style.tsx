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
                        border: 1px solid #B0E0E6;
                        border-radius: 10px;
                        padding-top: 0.5rem;
                        height: 60px;
                        text-indent: 10px;
                        background-color: #fff;
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
        
        
        


`

export const InputForm = styled.div`
    padding: 2rem;

    @media all and (max-width: 1280px){}
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

            & div{
                margin-top: 0.5rem;
                border: 1px solid #D7E2EB;
                min-height: 1rem;
                border-radius: 0.25rem;
                padding: 1rem;

                & select{
                    width: 100%;
                    height: inherit;
                    font-size: 1.2rem;
                    font-weight: 600;

                    & option{
                        
                    }
                }
            }
           
        }

        & section:nth-of-type(2){
            & form{
                margin-top: 1.6em;
                & .formWrap{
                    border: 1px solid #D7E2EB;
                    border-radius: 0.25rem;
                    padding: 2rem;
                    & ul{
                        line-height: 2rem;
                        padding-bottom: 2rem;
                        & li{
                            display: flex;
                            & dl{
                                width: 50%;
                                & dt{
                                    font-size: 1.1rem;
                                    font-weight: 400;

                                    & label{
                                        font-size: 1.1rem;
                                    }
    
                                    & small{
                                        padding-left: 1.2rem;
                                        font-size: 0.9rem;
                                    }

                                    & .switch{
                                        position: relative;
                                        display: inline-block;
                                        width: 60px;
                                        height: 24px;
                                        font-size: unset;
                                        vertical-align: middle;

                                        & input[type="checkbox"]{
                                            opacity: 0;
                                            width: 0;
                                            height: 0;

                                            &:checked + .slider{
                                                background-color: #2196F3;
                                            }

                                            &:checked + .slider::before{
                                                transform: translateX(34px);
                                                background-color: #fff;
                                            }
                                        }

                                        & .slider{
                                            position: absolute;
                                            cursor: pointer;
                                            background-color: #B2C0CC;
                                            border-radius: 25px;
                                            top: 0;
                                            right: 0;
                                            bottom: 0;
                                            left: 0;
                                            transition: background-color 0.4s ease;

                                            &::before{
                                                position: absolute;
                                                content: "";
                                                height: 18px;
                                                width: 18px;
                                                left: 4px;
                                                bottom: 4px;
                                                background-color: white;
                                                border-radius: 50%;
                                                transition: transform 0.4s ease;
                                            }
                                        }
                                       
                                    }
                                }

                                & dd{
                                    height: 3rem;

                                    .ant-picker{
                                        & input{
                                            border: 0;
                                        }
                                        border: 1px solid #B0E0E6;
                                        height: inherit;
                                        font-size: 0.8rem;
                                        border-radius: 0.25rem;
                                        box-sizing: border-box;
                                        width: 90%;
                                        padding-left: 0.9rem;
                                    }

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
                                    min-width: 5.2rem;
                                    & label{
                                        font-size: 1.1rem;
                                    }
                                }

                                
                            }
                        }
                    }

                    & ul:last-of-type{
                        padding-bottom: 0;
                        
                        & label{
                            font-size: 1.1rem;
                        }

                        & textarea{
                            border: 1px solid #B0E0E6;
                            background-color: #fff;
                            resize: vertical;
                            width: 100%;
                            padding-left: 1rem;
                            border-radius: 10px;
                            padding-top: 0.5rem;
                            height: 60px;
                        }
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



