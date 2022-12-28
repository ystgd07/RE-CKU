import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './style';
import Logo from 'assets/images/logo.png';
import { useForm } from 'react-hook-form';

const FindPw = () => {
    // const [Email, setEmail] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    interface FormData {
        email: string;
    }

    const onSubmitHandler = async (data: FormData) => {
        // e.preventDefault();
        try {
            const res = await axios.post('/users/eamil/password', data);
            console.log(res, '성공');

            alert('비밀번호를 메일로 보냈습니다.');
            navigate('/login');
        } catch (err: any) {
            console.error(err.stack);
        }
    };

    return (
        <S.Div>
            <S.MobileDiv>
                <p>
                    <Link to="/join">
                        {' '}
                        <S.Image src={Logo} alt="로고" />
                    </Link>
                </p>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div style={{ width: '400px', minWidth: '320px', textAlign: 'center' }}>
                        <h1>임시 비밀번호 보내기</h1>
                        <div style={{ height: '30px' }}></div>
                        <p>이메일</p>
                        <input
                            {...register('email', {
                                required: '이메일을 입력해주세요',
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: '이메일 형식만 가능합니다.',
                                },
                            })}
                            placeholder="이메일 입력"
                            // autoComplete="off"
                        />
                        <label>{errors?.email?.message}</label>
                        <button formAction="">이메일로 임시 비밀번호 보내기</button>
                    </div>
                </form>
            </S.MobileDiv>
        </S.Div>
    );
};

export default FindPw;
