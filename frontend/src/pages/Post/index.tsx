import { useParams, useLocation, Outlet, useMatch, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
interface IPostData {
    alreadyLikes: boolean;
    boardInfo: {
        content: string;
        fixed: number;
        hasResumeId: string | null;
        hashTags: string;
        ownUserId: number;
        title: string;
    };
    comments: string | null;
    resumeInfo: string | null;
}
const Post = () => {
    const [postData, setPostData] = useState<IPostData | null>(null);
    const { postId } = useParams<{ postId: string }>();
    const { state } = useLocation() as RouteState;
    console.log(state);
    console.log('postId = ', postId);
    // 더미 데이터
    const data = {
        title: '이력서 좀 봐주세요',
        content: '# hi\n   hello\n   > 마크다운 문법을 지원합니다.',
        hashTags: '',
        resumeId: 0,
    };
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
                console.log(post.data.data);
                setPostData(post.data.data);

                return post.data.data;
            } catch (err) {
                console.log(err);
                return;
            }
        };
        const data = fetchPostData();
        console.log(data);
    }, [postId]);
    console.log('POST = ', postData);
    return (
        <Container>
            <Wrapper>
                <Title>{data.title}</Title>
                <Profile>유저 프로필 이미지 + email + 1일 전</Profile>
                <Contents>
                    <Viewer initialValue={data.content} />
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
