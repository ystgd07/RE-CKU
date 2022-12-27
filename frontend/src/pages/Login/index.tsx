import React from 'react';
import * as S from './style';
import Logo from 'assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Layout from 'components/Layout';

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
            navigate('/');
        } catch (err: any) {
            console.error(err.stack);
            alert('아이디 혹은 비밀번호가 틀렸습니다');
        }
    };

    const LoginByKakao = async () => {
        try {
            const baseUrl = 'https://kauth.kakao.com/oauth/authorize?';
            const zz = `client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`;
            const finalUrl = `${baseUrl}${zz}`;
            window.location.href = finalUrl;
        } catch (err: any) {
            console.error(err.stack);
        }
    };
    return (
        <Layout>
            <S.Div>
                <S.MobileDiv>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <div>
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

                            <label className={`${errors.email ? 'block' : 'none'}`}>
                                {errors?.email?.message}
                            </label>

                            <input
                                {...register('password', {
                                    required: '비밀번호를 입력해주세요',
                                })}
                                type="password"
                                placeholder="비밀번호 입력"
                                autoComplete="new-password"
                            />

                            <article>
                                <ul>
                                    <li>
                                        <Link to="/join">회원가입 </Link>
                                    </li>
                                    <li>
                                        <Link to="/find-pw">비밀번호를 잊으셨나요?</Link>
                                    </li>
                                    <li>
                                        <button type="submit" className="loginBtn">
                                            로그인
                                        </button>
                                    </li>
                                </ul>
                            </article>

                            <ul>
                                <li>
                                    <button type="button" onClick={LoginByKakao}>
                                        카카오 로그인
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </form>
                </S.MobileDiv>
            </S.Div>
        </Layout>
    );
};

export default Login;
