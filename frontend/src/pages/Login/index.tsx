import React from 'react';
import * as S from './style';
import Logo from 'assets/images/logo.png';
import Kakao from 'assets/images/kakao_login_medium_wide.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    interface FormData {
        password: string;
        email: string;
    }

    const onSubmitHandler = async (data: FormData) => {
        const jsondata = {
            email: data.email,
            password: data.password,
        };
        try {
            console.log('jsondata', jsondata);
            const res = await axios.post('/users', jsondata);
            console.log(res, '성공');
            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;
            const userId = res.data.userId;
            const isAdmin = res.data.isAdmin;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', userId);
            localStorage.setItem('isAdmin', isAdmin);
            localStorage.setItem('email', data.email);
            navigate('/');
        } catch (err: any) {
            console.error(err.stack);
            alert('아이디 혹은 비밀번호가 틀렸습니다');
        }
    };

    const kakao = async () => {
        try {
            const baseUrl = 'https://kauth.kakao.com/oauth/authorize?';

            const zz = `client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`;
            const finalUrl = `${baseUrl}${zz}`;
            console.log('🔥 동의항목 얻었다');
            window.location.href = finalUrl;
        } catch (err: any) {
            console.error(err.stack);
        }
    };
    return (
        <S.Div>
            <S.MobileDiv>
                <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
                    <p>
                        <Link to="/">
                            {' '}
                            <S.Image src={Logo} alt="로고" />
                        </Link>
                    </p>
                    <div
                        style={{
                            width: '400px',
                            minWidth: '320px',
                            textAlign: 'center',
                            paddingBottom: '30px',
                        }}
                    >
                        <h1>로그인</h1>
                        <input
                            type="email"
                            {...register('email', {
                                required: '이메일을 입력해주세요',
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: '이메일 형식만 가능합니다.',
                                },
                            })}
                            placeholder="이메일 입력"
                            autoComplete="off"
                        />
                        <label>{errors?.email?.message}</label>
                        <input
                            {...register('password', {
                                required: '비밀번호를 입력해주세요',
                            })}
                            type="password"
                            placeholder="비밀번호 입력"
                            autoComplete="new-password"
                        />
                        <button type="submit">로그인</button>
                        <div onClick={kakao}>
                            <img src={Kakao} alt={'카카오로그인'}></img>
                        </div>

                        <Link
                            to="/join"
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                margin: '10px',
                            }}
                        >
                            회원가입{' '}
                        </Link>
                        <Link
                            to="/find-pw"
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                fontSize: '10px',
                                margin: '10px',
                            }}
                        >
                            비밀번호를 잊으셨나요?
                        </Link>
                    </div>
                </form>
            </S.MobileDiv>
        </S.Div>
    );
};

export default Login;
