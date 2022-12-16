import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import axios from 'axios';

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
    border: 1px solid black;
`;

const Title = styled.h1`
    font-size: 24px;
`;
const Profile = styled.div``;

const Contents = styled.div`
    border: 1px solid black;
    padding: 20px;
    box-sizing: border-box;
`;
const PostStates = styled.div``;

const CommentWrapper = styled(Wrapper)`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 10px 0;
`;

const CommentHeader = styled.h1`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
`;

const CommentProfile = styled.div`
    width: 100px;
    background-color: yellowgreen;
`;
const CommentLikes = styled.div`
    width: 100px;
    background-color: yellowgreen;
`;

const CommentBody = styled.div`
    width: 100%;
    font-size: 18px;
    padding: 20px;
    box-sizing: border-box;
`;

interface RouteState {
    state: {
        id: string;
        title: string;
    };
}

interface IProjectData {
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

interface IResumeData {
    id: number;
    name: string;
    position: string;
    usedUserId: number;
    information: null; // ???
    updatedAt: Date;
    projects: Array<IProjectData>;
    career: Array<ICareer>;
}

interface IPostData {
    alreadyLikes: boolean;
    boardInfo: {
        title: string;
        content: string;
        hashTags: string;
        boardCreated: Date;
        hasResumeId: string | null;
        fixed: number;
        ownUserId: number;
    };
    comments: {
        commentId: number;
        username: string;
        text: string;
        commentCreated: Date;
        userId: number;
        fixed: number;
    } | null;
    resumeInfo: IResumeData | null;
}
const Post = () => {
    const [postData, setPostData] = useState<IPostData | null>(null);
    const { postId } = useParams<{ postId: string }>();
    const { state } = useLocation() as RouteState;
    console.log(state);
    const viewerRef = useRef<Viewer>(null);

    const commentData = [
        {
            userProfile: '하하',
            likes: 7,
            comment: '좋은 이력서네요!',
        },
        {
            userProfile: '옐로',
            likes: 1,
            comment: '잘 쓰셨습니다 ㅎㅎ',
        },
        {
            userProfile: '그린',
            likes: 0,
            comment: '오타가 있군요?',
        },
    ];

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const post = await axios.get(`http://localhost:3001/board/${postId}`);
                const data = post.data.data;
                setPostData(data);
                const content = data.boardInfo.content;
                viewerRef.current?.getInstance().setMarkdown(content);
                return post.data.data;
            } catch (err) {
                console.log(err);
                return;
            }
        };
        fetchPostData();
    }, [postId]);
    return (
        <Container>
            <Wrapper>
                <Title>{postData?.boardInfo.title}</Title>
                <Profile>유저 프로필 이미지 + email + 1일 전</Profile>
                <Contents>
                    <Viewer initialValue={postData?.boardInfo.title} ref={viewerRef} />
                </Contents>
                <PostStates>좋아요: 10개, 댓글 수: 3개</PostStates>
            </Wrapper>
            <Wrapper>
                <Title>댓글</Title>
                {commentData.map((item, index) => (
                    <CommentWrapper key={index}>
                        <CommentHeader>
                            <CommentProfile>{item.userProfile}</CommentProfile>
                            <CommentLikes>좋아요 {item.likes}개</CommentLikes>
                        </CommentHeader>
                        <CommentBody>{item.comment}</CommentBody>
                    </CommentWrapper>
                ))}
            </Wrapper>
        </Container>
    );
};

export default Post;
