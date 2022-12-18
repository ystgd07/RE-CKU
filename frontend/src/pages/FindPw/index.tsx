import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from './style';
import Logo from 'assets/images/logo.png';

const FindPw = () => {
    const [Email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('이동?');
        if (localStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, [navigate]);

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post('/');
            console.log(res, '성공');

            alert('회원가입이 완료되었습니다.');
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
                <form onSubmit={onSubmitHandler}>
                    <div style={{ width: '400px', minWidth: '320px', textAlign: 'center' }}>
                        <h1>임시 비밀번호 보내기</h1>
                        <div style={{ height: '30px' }}></div>
                        <p>이메일</p>
                        <input
                            type="email"
                            value={Email}
                            placeholder="이메일 입력"
                            onChange={e => {
                                setEmail(e.currentTarget.value);
                            }}
                        />

                        <button formAction="">이메일로 임시 비밀번호 보내기</button>
                    </div>
                </form>
            </S.MobileDiv>
        </S.Div>
    );
};

export default FindPw;
