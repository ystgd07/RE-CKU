import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Layout from 'components/Layout';
import { calcElapsed } from 'utils/format';
import { Skeleton, Carousel, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { LikeOutlined, CommentOutlined, RightOutlined } from '@ant-design/icons';
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
    gap: 1rem;
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
    :last-child {
        margin-top: 5rem;
    }
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

const QuestWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const QuestText = styled.p`
    font-size: 1.8rem;
    margin: 1rem 0;
`;

const Quest = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 20rem;
    border: 1px solid #fffbe3;
    background-color: #fffbe3;
    border-radius: 1rem;
    font-size: 10rem;
    cursor: pointer;
    :hover {
        border-color: #ccb94c;
    }
    h3 {
        font-size: 4rem;
    }
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

interface IQuestData {
    boardId: number;
    chance: number;
}

const Main = () => {
    const [latestBoardList, setLatestBoardList] = useState<IBoardList[]>([]);
    const [hotLikesBoardList, setHotLikesBoardList] = useState<IBoardList[]>([]);
    const [hotCommentBoardList, setHotCommentBoardList] = useState<IBoardList[]>([]);
    const [questData, setQuestData] = useState<IQuestData | null>(null);
    const navigate = useNavigate();

    const fetchLatestBoard = async () => {
        try {
            const res = await API.get('/board', '?filter=created&perPage=4');
            setLatestBoardList(res.boardList);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchHotLikesBoard = async () => {
        try {
            const res = await API.get('/board', '?filter=likeCnt&perPage=4');
            setHotLikesBoardList(res.boardList);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchHotCommentBoard = async () => {
        try {
            const res = await API.get('/board', '?filter=commentCnt&perPage=4');
            setHotCommentBoardList(res.boardList);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchQuestData = async () => {
        try {
            const res = await API.get('/board/random');
            setQuestData(res);
        } catch (err) {
            console.log(err);
        }
    };

    const handleQuestClick = async () => {
        if (questData?.chance === 0) {
            openNotification(
                'bottomRight',
                `금일 잔여 횟수를 모두 소진했습니다. 내일 다시 시도해주세요.`,
            );
            return;
        }
        try {
            await API.get('/users/point');
            fetchQuestData();
        } catch (err) {
            console.log(err);
        }
        navigate(`/post/${questData?.boardId}`);
    };

    useEffect(() => {
        fetchLatestBoard();
        fetchHotLikesBoard();
        fetchHotCommentBoard();
        fetchQuestData();
    }, []);

    const onChange = (currentSlide: number) => {};

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement, message: string) => {
        api.info({
            message: message,
            placement,
        });
    };
    // \[?(!)(?'alt'\[[^\]\[]*\[?[^\]\[]*\]?[^\]\[]*)\]\((?'url'[^\s]+?)(?:\s+(["'])(?'title'.*?)\4)?\)

    return (
        <Layout>
            {contextHolder}
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

                <Title>일일 퀘스트</Title>
                <QuestWrapper>
                    <QuestText>{`오늘 잔여 횟수 : ${
                        questData === null ? '' : questData?.chance
                    }`}</QuestText>
                    <Quest onClick={handleQuestClick}>
                        <h3>이력서 보고 포인트 얻기!</h3>
                    </Quest>
                </QuestWrapper>
            </Wrapper>
        </Layout>
    );
};

export default Main;
