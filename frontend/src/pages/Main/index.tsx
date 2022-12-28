import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Layout from 'components/Layout';
import { calcElapsed } from 'utils/format';
import { Link } from 'react-router-dom';
import { Skeleton, Carousel } from 'antd';
import { LikeOutlined, CommentOutlined, LikeFilled } from '@ant-design/icons';
import API from 'utils/api';
import carousel1 from 'assets/images/carousel1.png';
import carousel2 from 'assets/images/carousel2.png';
import carousel3 from 'assets/images/carousel3.png';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-size: 1.6rem;
`;

const Posts = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 2rem;
    grid-row-gap: 4rem;
    @media screen and (min-width: 580px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (min-width: 990px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (min-width: 1280px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const Post = styled.div`
    display: flex;
    flex-direction: column;
    width: 24rem;
    height: 16rem;
    border-radius: 1rem;
    background-color: #fffbe3;
    border: 0.1rem solid #fffbe3;
    padding: 3rem;
    gap: 0.5rem;
    cursor: pointer;
    &:hover {
        border-color: #ccb94c;
    }
`;

const Title = styled.h2`
    width: 100%;
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
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

const PostsProfile = styled.div`
    margin: 1rem 0;
    display: flex;
`;

const PostsProfileImg = styled.img`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
`;

const PostsProfileInfoWrapper = styled.div`
    display: flex;
    margin-left: 1.5rem;
    flex-direction: column;
`;

const PostsCreated = styled.p`
    font-size: 1.4rem;
    margin-top: 0.6rem;
    color: #666;
`;

const PostsIconWrapper = styled.div`
    bottom: 0;
    display: flex;
    align-items: center;
`;

const PostsIcon = styled.span`
    width: 5rem;
    display: flex;
    justify-content: space-evenly;
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

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '28rem',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Main = () => {
    const [latestBoardList, setLatestBoardList] = useState<IBoardList[]>([]);
    const [hotLikesBoardList, setHotLikesBoardList] = useState<IBoardList[]>([]);
    const [hotCommentBoardList, setHotCommentBoardList] = useState<IBoardList[]>([]);

    const navigate = useNavigate();

    const fetchLatestBoard = async () => {
        try {
            const res = await API.get('/board', '?filter=created&perPage=4');
            setLatestBoardList(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchHotLikesBoard = async () => {
        try {
            const res = await API.get('/board', '?filter=likeCnt&perPage=4');
            setHotLikesBoardList(res);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchHotCommentBoard = async () => {
        try {
            const res = await API.get('/board', '?filter=commentCnt&perPage=4');
            setHotCommentBoardList(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchLatestBoard();
        fetchHotLikesBoard();
        fetchHotCommentBoard();
    }, []);

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    // \[?(!)(?'alt'\[[^\]\[]*\[?[^\]\[]*\]?[^\]\[]*)\]\((?'url'[^\s]+?)(?:\s+(["'])(?'title'.*?)\4)?\)

    return (
        <Layout>
            <Carousel autoplay afterChange={onChange}>
                <div>
                    <img src={carousel1} alt="carousel" />
                </div>
                <div>
                    <img src={carousel2} alt="carousel" />
                </div>
                <div>
                    <img src={carousel3} alt="carousel" />
                </div>
            </Carousel>
            <Wrapper>
                <Title>최근 등록된 게시물</Title>
                <Posts>
                    {latestBoardList.length === 0 ? (
                        <SkeletonPosts />
                    ) : (
                        latestBoardList.map((item, index) => (
                            <Post key={index} onClick={() => navigate(`/post/${item.postId}`)}>
                                <PostTitle>{item.postTitle}</PostTitle>
                                <PostContents>{item.postDescription}</PostContents>
                                <PostsProfile>
                                    <PostsProfileImg src={item.userProfileSrc} />
                                    <PostsProfileInfoWrapper>
                                        <p>{item.username}</p>
                                        <PostsCreated>
                                            {calcElapsed(item.createdAt)} 전
                                        </PostsCreated>
                                    </PostsProfileInfoWrapper>
                                </PostsProfile>
                                <PostsIconWrapper>
                                    <PostsIcon>
                                        <LikeOutlined />
                                        {item.likeCount}
                                    </PostsIcon>
                                    <PostsIcon>
                                        <CommentOutlined />
                                        {item.commentCount}
                                    </PostsIcon>
                                </PostsIconWrapper>
                            </Post>
                        ))
                    )}
                </Posts>

                <Title>인기 게시물</Title>
                <Posts>
                    {hotLikesBoardList.length === 0 ? (
                        <SkeletonPosts />
                    ) : (
                        hotLikesBoardList.map((item, index) => (
                            <Post key={index} onClick={() => navigate(`/post/${item.postId}`)}>
                                <PostTitle>{item.postTitle}</PostTitle>
                                <PostContents>{item.postDescription}</PostContents>
                                <PostsProfile>
                                    <PostsProfileImg src={item.userProfileSrc} />
                                    <PostsProfileInfoWrapper>
                                        <p>{item.username}</p>
                                        <PostsCreated>
                                            {calcElapsed(item.createdAt)} 전
                                        </PostsCreated>
                                    </PostsProfileInfoWrapper>
                                </PostsProfile>
                                <PostsIconWrapper>
                                    <PostsIcon>
                                        <LikeOutlined />
                                        {item.likeCount}
                                    </PostsIcon>
                                    <PostsIcon>
                                        <CommentOutlined />
                                        {item.commentCount}
                                    </PostsIcon>
                                </PostsIconWrapper>
                            </Post>
                        ))
                    )}
                </Posts>

                <Title>가장 토론이 활발한 게시물</Title>
                <Posts>
                    {hotCommentBoardList.length === 0 ? (
                        <SkeletonPosts />
                    ) : (
                        hotCommentBoardList.map((item, index) => (
                            <Post key={index} onClick={() => navigate(`/post/${item.postId}`)}>
                                <PostTitle>{item.postTitle}</PostTitle>
                                <PostContents>{item.postDescription}</PostContents>
                                <PostsProfile>
                                    <PostsProfileImg src={item.userProfileSrc} />
                                    <PostsProfileInfoWrapper>
                                        <p>{item.username}</p>
                                        <PostsCreated>
                                            {calcElapsed(item.createdAt)} 전
                                        </PostsCreated>
                                    </PostsProfileInfoWrapper>
                                </PostsProfile>
                                <PostsIconWrapper>
                                    <PostsIcon>
                                        <LikeOutlined />
                                        {item.likeCount}
                                    </PostsIcon>
                                    <PostsIcon>
                                        <CommentOutlined />
                                        {item.commentCount}
                                    </PostsIcon>
                                </PostsIconWrapper>
                            </Post>
                        ))
                    )}
                </Posts>

                <Title></Title>
            </Wrapper>
        </Layout>
    );
};

export default Main;
