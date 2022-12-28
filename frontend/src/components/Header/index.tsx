import { useCallback, useEffect, useState } from 'react';
import Logo from 'assets/images/logo.png';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { HContainer, HHeader } from './style';
import API from 'utils/api';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const [isAdmin, setIsAdmin] = useState<boolean>(localStorage.getItem('isAdmin') ? true : false);

    const userInfo = async () => {
        try {
            const res = await API.get(`/users/individuals`);
            setIsAdmin(res.role);
            console.log(isAdmin);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    useEffect(() => {
        userInfo();
    }, [token]);

    const logout = useCallback(() => {
        try {
            axios.patch(`/users/sign-out`, {}, { headers: { authorization: `Bearer ${token}` } });

            localStorage.clear();
            window.location.replace('/');
        } catch (err: unknown) {
            console.log(err);
        }
    }, []);

    return (
        <HContainer>
            <HHeader>
                <h1 onClick={() => navigate('/')}>
                    <img src={Logo} alt="logo" />
                </h1>

                <div>
                    <nav>
                        <ul>
                            {isAdmin === true && (
                                <li>
                                    <Link to="/admin">관리자</Link>
                                </li>
                            )}

                            <li>
                                <Link to="/comunity">커뮤니티</Link>
                            </li>

                            <li>
                                <Link to="/resume/list">이력서</Link>
                            </li>
                            <li>
                                <Link to="/match">상점</Link>
                            </li>
                        </ul>
                    </nav>

                    <ul className="util">
                        {token ? (
                            <>
                                <li>
                                    <Link to="/profile">마이페이지</Link>
                                </li>
                                <li onClick={logout}>로그아웃</li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login">로그인</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </HHeader>
        </HContainer>
    );
};

export default Header;
