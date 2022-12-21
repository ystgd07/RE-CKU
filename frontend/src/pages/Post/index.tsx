import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Header from 'components/Header';
import API from 'utils/api';
import TestProfileImg from 'assets/images/logo-header.png';
import { LikeOutlined, CommentOutlined, LikeFilled } from '@ant-design/icons';
import { Button, Typography, Input } from 'antd';
const { Title, Text } = Typography;

// 본인 게시물일 경우 수정/삭제 버튼 생성
// 좋아요 누른 경우, 누르지 않은 경우 구분
// 댓글 좋아요도 마찬가지

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
        likeCnt: number;
        commentCnt: number;
        email: string;
    };
    comments: ICommentData[];
    resumeInfo: IResumeData | null;
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
    const [comment, setComment] = useState<string>('');
    const { postId } = useParams<{ postId: string }>();
    const { state } = useLocation() as RouteState;
    console.log('State =', state);
    const viewerRef = useRef<Viewer>(null);

    const updateViewerContent = (content: string) => {
        viewerRef.current?.getInstance().setMarkdown(content);
    };

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const data = await API.get(
                    `/board/${postId}`,
                    `?lifeIsGood=${localStorage.getItem('userId')}`,
                );
                setPostData(data);
                const content = data.boardInfo.content;
                updateViewerContent(content);
            } catch (err) {
                console.log(err);
                return;
            }
        };
        fetchPostData();
    }, [postId]);

    const handleSubmitComment = async () => {
        console.log(comment);
        const data = {
            text: comment,
        };
        try {
            const res = await API.post(`/board/${postId}/comments`, data);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setComment(e.target.value);
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
                        {/* <LikeFilled /> 좋아요 누른 상태일 경우 채워진 아이콘으로 */}
                        <Button type="primary" icon={<LikeOutlined />} size={'large'}>
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
                        {postData?.comments.map((item, index) => (
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
                    <Button type="link">더보기</Button>
                </Wrapper>
            </Container>
        </>
    );
};

export default Post;
