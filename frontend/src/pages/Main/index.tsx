import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';
import {
    Button,
    Input,
    Switch,
    Typography,
    notification,
    Modal,
    Tag,
    Radio,
    Space,
    Skeleton,
} from 'antd';
import API from 'utils/api';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 1.6rem;
`;

const Posts = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 2rem;
    grid-row-gap: 4rem;
`;

const Post = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 28rem;
    height: 21rem;
    border-radius: 1rem;
    background-color: #fffbe3;
    border: 0.1rem solid #fffbe3;
    padding: 1rem;
    cursor: pointer;
    &:hover {
        border-color: #ccb94c;
    }
`;

const Title = styled.h2`
    font-size: 2.2rem;
    font-weight: 700;
    margin: 2rem 0;
`;

const PostTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: 600;
`;

const PostContents = styled.p`
    font-size: 1.8rem;
    background-color: yellowgreen;
`;

interface IBoardList {
    commentCount: number;
    createdAt: Date;
    hasResume: number;
    likeCount: number;
    postDescription: string;
    postId: number;
    postTitle: string;
    userId: number;
    userProfileSrc: string;
    username: string;
}

const SkeletonPosts = () => {
    return (
        <>
            <Post>
                <Skeleton active />
            </Post>
            <Post>
                <Skeleton active />
            </Post>
            <Post>
                <Skeleton active />
            </Post>
            <Post>
                <Skeleton active />
            </Post>
        </>
    );
};

const Main = () => {
    const [latestBoardList, setLatestBoardList] = useState<IBoardList[]>([]);
    const [hotLikesBoardList, setHotLikesBoardList] = useState<IBoardList[]>([]);
    const [hotCommentBoardList, setHotCommentBoardList] = useState<IBoardList[]>([]);

    const fetchLatestBoard = async () => {
        try {
            const res = await API.get('/board', '?filter=created&perPage=4');
            console.log(res);
            setLatestBoardList(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchHotLikesBoard = async () => {
        try {
            console.log('fetch');
        } catch (err) {
            console.log(err);
        }
    };

    const fetchHotCommentBoard = async () => {
        try {
            console.log('fetch');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchLatestBoard();
    }, []);
    // \[?(!)(?'alt'\[[^\]\[]*\[?[^\]\[]*\]?[^\]\[]*)\]\((?'url'[^\s]+?)(?:\s+(["'])(?'title'.*?)\4)?\)

    return (
        <Layout>
            <Wrapper>
                <Title>최근 등록된 게시물</Title>
                <Posts>
                    {latestBoardList.length === 0 ? (
                        <SkeletonPosts />
                    ) : (
                        latestBoardList.map((item, index) => (
                            <Post key={index}>
                                <PostTitle>{item.postTitle}</PostTitle>
                                <PostContents>{item.postDescription}</PostContents>
                            </Post>
                        ))
                    )}
                </Posts>

                <Title>인기 게시물</Title>
                <Posts>{hotLikesBoardList.length === 0 ? <SkeletonPosts /> : ''}</Posts>

                <Title>가장 토론이 활발한 게시물</Title>
                <Posts>{hotCommentBoardList.length === 0 ? <SkeletonPosts /> : ''}</Posts>

                <Title>일일 퀘스트</Title>
            </Wrapper>
            <div>
                <div>
                    <div>This is Main</div>
                    <Link to="/resume">이력서 페이지 가기</Link>
                    <div>
                        <Link to={`/post/create`}>게시물 생성하기</Link>
                    </div>
                    <div>
                        <Link to={`/post/76`}>게시물 상세 페이지</Link>
                    </div>
                    <div>
                        <Link to="/login">로그인</Link>
                    </div>
                    <div>
                        <Link to="/myportfolio">포폴</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Main;
