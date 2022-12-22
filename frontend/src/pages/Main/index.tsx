import React from 'react';
import { Link } from 'react-router-dom';
import { MContainer, MFrame } from './style';
import Layout from 'components/Layout';

const Main = () => {
    const post = {
        id: 2,
        title: '게시글 제목',
    };
    return (
        <Layout>
            <MContainer>
                <MFrame>
                    <div>This is Main</div>
                    <Link to="/resume">이력서 페이지 가기</Link>
                    <div>
                        <Link to={`/post/create`} state={post}>
                            게시물 생성하기
                        </Link>
                    </div>
                    <div>
                        <Link to={`/post/${post.id}`} state={post}>
                            게시물 상세 페이지
                        </Link>
                    </div>
                    <div>
                        <Link to="/login">로그인</Link>
                    </div>
                    <div>
                        <Link to="/myportfolio">포폴</Link>
                    </div>
                </MFrame>
            </MContainer>
        </Layout>
    );
};

export default Main;
