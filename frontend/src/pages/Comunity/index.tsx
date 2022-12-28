import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from 'components/Layout';
import API from 'utils/api';
import { calcElapsed } from 'utils/format';
import { Skeleton, Tabs, Button } from 'antd';
import { LikeOutlined, CommentOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-size: 1.6rem;
    :last-child {
        margin-bottom: 5rem;
    }
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Posts = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 2rem;
    grid-row-gap: 4rem;
    padding-bottom: 4rem;
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

interface BoardResume {
    MARK: string;
    commentCount: number;
    createdAt: Date;
    hasResume: number;
    likeCount: number;
    position: string;
    postDescription: string;
    postId: number;
    postTitle: string;
    userId: number;
    userProfileSrc: string;
    username: string;
}

const Comunity = () => {
    const [boardList, setBoardList] = useState<BoardResume[]>([]);
    const [isResumeTopic, setIsResumeTopic] = useState<boolean>(false);
    const [boardNumber, setBoardNumber] = useState<number | null>(null);
    const navigate = useNavigate();

    const fetchBoardList = async (mode: boolean) => {
        try {
            let url;
            if (mode) {
                url = `/board/resumes`;
            } else {
                url = `/board/community`;
            }
            const res = await API.get(url, `?firstRequest=1&type=created&count=16&mark=`);
            console.log(res);
            // setBoardList(res.boardList);
            // setBoardNumber(res.boardCount);
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = () => {
        setBoardList([]);
        setBoardNumber(null);
        setIsResumeTopic(prev => !prev);
        fetchBoardList(!isResumeTopic);
    };

    const handleMoreBoard = async () => {
        let url;
        if (isResumeTopic) {
            url = `/board/resumes`;
        } else {
            url = `/board/community`;
        }
        console.log('URL =', url);
        try {
            const mark = boardList.slice(-1)[0].MARK;
            const res = await API.get(
                url,
                `?firstRequest=0&type=created&count=8&mark=${mark}&position=ALL`,
            );
            console.log(res);
            setBoardList([...boardList, ...res.boardList]);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBoardList(isResumeTopic);
    }, []);

    return (
        <Layout>
            <Wrapper>
                <Header>
                    <Tabs
                        size="large"
                        onChange={onChange}
                        items={[
                            {
                                label: `자유 토론 게시판`,
                                key: '1',
                            },
                            {
                                label: `이력서 토론 게시판`,
                                key: '2',
                            },
                        ]}
                    />
                    <Button onClick={() => navigate('/post/create')}>게시물 작성하기</Button>
                </Header>
            </Wrapper>
            <Wrapper>
                <Title>{isResumeTopic ? '이력서 토론 게시물' : '자유 주제 게시물'}</Title>
                <Posts>
                    {boardList.length === 0 ? (
                        <SkeletonPosts />
                    ) : (
                        boardList.map((item, index) => (
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
                {boardNumber !== null && boardList.length < boardNumber ? (
                    <Button type="link" onClick={handleMoreBoard}>
                        더보기
                    </Button>
                ) : (
                    ''
                )}
            </Wrapper>
        </Layout>
    );
};

export default Comunity;
