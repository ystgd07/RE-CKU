import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
<<<<<<< HEAD
import axios from 'axios';
=======
import Header from 'components/Header';
import API from 'utils/api';
import TestProfileImg from 'assets/images/logo-header.png';
import { LikeOutlined, CommentOutlined, LikeFilled } from '@ant-design/icons';
import { Button, Typography, Input } from 'antd';
const { Title, Text } = Typography;

// 본인 게시물일 경우 수정/삭제 버튼 생성
// 좋아요 누른 경우, 누르지 않은 경우 구분
// 댓글 좋아요도 마찬가지
>>>>>>> 54e6693e67d7f68cd45c60e8585b6b211d31cc43

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 25px;
    width: 100%;
    align-self: center;
    padding: 25px 25px;
    margin: 20px auto;
    margin-right: auto;
    margin-left: auto;
    max-width: 1280px;
    box-sizing: border-box;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const Profile = styled.div`
    width: 100%;
    margin: 10px 0;
    display: flex;
    align-items: center;
`;
const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    background-color: #ea8532;
    border-radius: 50%;
`;
const ProfileInfo = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
`;
const ProfileInfoName = styled.p`
    font-size: 18px;
`;
const Contents = styled.div`
    padding: 20px;
    box-sizing: border-box;
`;
const PostStates = styled.div`
    display: flex;
    button {
        margin-left: 10px;
    }
`;
const CommentWrapper = styled(Wrapper)`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 10px 0;
    border: 1px solid black;
    border-radius: 10px;
`;
const CommentHeader = styled.h1`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding-left: 30px;
    button {
        margin-right: 20px;
    }
`;
const CommentProfile = styled.div`
    width: 100px;
`;
const CommentLikes = styled.div`
    width: 100px;
    background-color: yellowgreen;
`;
const CommentBody = styled.div`
    width: 100%;
    font-size: 14px;
    padding: 10px;
    box-sizing: border-box;
`;

interface IPostData {
    alreadyLikesThisBoard: boolean;
    boardInfo: {
        avatarUrl: string;
        boardCreated: Date;
        commentCnt: number;
        content: string;
        email: string;
        fixed: number;
        hasResumeId: string | null;
        id: number;
        hashTags: string;
        likeCnt: number;
        ownUserId: number;
        title: string;
    };
    ownThisNotice: boolean;
    resumeInfo: IResumeInfo | null;
    // comments: ICommentData[];
}

interface IResumeInfo {
    id: number;
    name: string;
    usedUserId: number;
    projects: Array<IProjects> | null;
    career: Array<ICareer> | null;
    // position: string;
    // information: null;
    // updatedAt: Date;
}

interface IProjects {
    id: number;
    projectName: string;
    link1: string;
    link2: string;
    usedResumeId: number;
    year: string; // ?
    information: null; // ?
    name: string;
    usedUserId: number;
    updatedAt: Date;
}

interface ICareer {
    id: number;
    company: string;
    reward: string;
    position: string;
    usedResumeId: number;
    notDevelop: number;
    workNow: number;
    startDate: number;
    endDate: number;
    name: string;
    usedUserId: number;
    information: null;
    updatedAt: Date;
}

interface ICommentData {
    MARK: string;
    alreadyLikes: boolean;
    avatarUrl: string;
    commentCreated: Date;
    commentId: number;
    fixed: number;
    fromUserId: number;
    likes: number;
    myComment: boolean;
    text: string;
    username: string;
}

const Post = () => {
    const [postData, setPostData] = useState<IPostData | null>(null);
    const [commentData, setCommentData] = useState<ICommentData[] | []>([]);
    const [comment, setComment] = useState<string>('');
    const { postId } = useParams<{ postId: string }>();

    const viewerRef = useRef<Viewer>(null);

    const updateViewerContent = (content: string) => {
        viewerRef.current?.getInstance().setMarkdown(content);
    };

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const res = await API.get(
                    `/board/${postId}`,
                    `?lifeIsGood=${localStorage.getItem('userId')}`,
                );
                console.log(res);
                setPostData(res);
                // const content = data.boardInfo.content;
                // updateViewerContent(content);
            } catch (err) {
                console.log(err);
                return;
            }
        };
        fetchPostData();
    }, [postId]);

    const handlePostLike = async () => {
        try {
            const data = {
                likesStatus: false,
            };
            const res = await API.patch(`/board/like/${postId}`, '', data);
            console.log(res);
        } catch (err) {
            console.log('ERROR:', err);
        }
    };
    const handleSubmitComment = async () => {
        console.log(comment);
        const data = {
            text: comment,
        };
        try {
            const res = await API.post(`/board/${postId}/comments`, data);
            // 화면의 게시물 좋아요 상태 갱신 필요
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleMoreComment = () => {
        // try {
        //     const mark = postData?.comments.slice(-1)[0].MARK;
        //     const res = API.get(
        //         `/board/${postId}/comments/pagenation`,
        //         `?lifeIsGood=${localStorage.getItem('userId')}&mark=${mark}&count=5`,
        //     );
        //     console.log(res);
        // } catch (err) {
        //     console.log(err);
        // }
    };

    return (
        <>
            <Header />
            <Container>
                <Wrapper>
                    <Title level={2}>{postData?.boardInfo.title}</Title>
                    <Profile>
                        <ProfileImg src={TestProfileImg}></ProfileImg>
                        <ProfileInfo>
                            <ProfileInfoName>{postData?.boardInfo.email}</ProfileInfoName>
                            <Text>1일 전</Text>
                        </ProfileInfo>
                    </Profile>
                    <Contents>
                        <Viewer initialValue={postData?.boardInfo.title} ref={viewerRef} />
                    </Contents>
                    <PostStates>
                        <Button
                            type="primary"
                            icon={
                                postData?.alreadyLikesThisBoard ? <LikeFilled /> : <LikeOutlined />
                            }
                            size={'large'}
                            onClick={handlePostLike}
                        >
                            {String(postData?.boardInfo.likeCnt)}
                        </Button>
                        <Button icon={<CommentOutlined />} size={'large'}>
                            {String(postData?.boardInfo.commentCnt)}
                        </Button>
                    </PostStates>
                </Wrapper>
                <Wrapper>
                    <>
                        <Title level={4}>댓글</Title>
                        <div>
                            댓글 작성
                            <Input value={comment} onChange={onChange} />
                            <Button onClick={handleSubmitComment}>작성</Button>
                        </div>
                        {commentData.map((item, index) => (
                            <CommentWrapper key={index}>
                                <CommentHeader>
                                    <Profile>
                                        <ProfileImg src={item.avatarUrl}></ProfileImg>
                                        <ProfileInfo>
                                            <ProfileInfoName>{item.username}</ProfileInfoName>
                                            <Text>1일 전</Text>
                                        </ProfileInfo>
                                    </Profile>

                                    <Button
                                        type="link"
                                        icon={item.alreadyLikes ? <LikeFilled /> : <LikeOutlined />}
                                        size={'large'}
                                    >
                                        {String(item.likes)}
                                    </Button>
                                </CommentHeader>
                                <CommentBody>{item.text}</CommentBody>
                            </CommentWrapper>
                        ))}
                    </>
                    <Button type="link" onClick={handleMoreComment}>
                        더보기
                    </Button>
                </Wrapper>
            </Container>
        </>
    );
};

export default Post;
