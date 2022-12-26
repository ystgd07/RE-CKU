import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Layout from 'components/Layout';
import API from 'utils/api';
import { LikeOutlined, CommentOutlined, LikeFilled } from '@ant-design/icons';
import { Button, Typography, Input, Card, Modal, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { calcElapsed } from 'utils/format';
import ResumeComponent from 'components/Resume';

const { Title, Text } = Typography;
const { TextArea } = Input;

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
    margin: 10px 0;
`;
const ButtonWrapper = styled.div`
    margin-left: auto;
    width: 144px;
    display: flex;
    justify-content: space-evenly;
`;
const CommentForm = styled.div`
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
`;
const CommentButtonWrapper = styled.div`
    display: inline-block;
    margin-right: 1rem;
`;

const ResumeWrapper = styled.div``;

interface IBoardInfo {
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
}

interface IResumeInfo {
    resumeId: number;
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
    // 신고
}

const Post = () => {
    // const [postData, setPostData] = useState<IPostData | null>(null);
    const [boardData, setBoardData] = useState<IBoardInfo | null>(null);
    const [resumeData, setResumeData] = useState<IResumeInfo | null>(null);
    const [commentData, setCommentData] = useState<ICommentData[] | []>([]);
    const [alreadyLike, setAlreadyLike] = useState<boolean>(false);
    const [ownBoard, setOwnBoard] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('');
    const [editComment, setEditComment] = useState<string>('');

    // 모달 제어
    const [modalOpen, setModalOpen] = useState(false);
    const { postId } = useParams<{ postId: string }>();

    const viewerRef = useRef<Viewer>(null);

    const navigate = useNavigate();

    // 마크다운 뷰어 내용 업데이트
    const updateViewerContent = (content: string) => {
        viewerRef.current?.getInstance().setMarkdown(content);
    };

    // 게시물 데이터 가져오기
    const fetchBoardData = async () => {
        try {
            const res = await API.get(
                `/board/${postId}`,
                `?lifeIsGood=${localStorage.getItem('userId')}`,
            );
            setBoardData(res.boardInfo);
            setResumeData(res.resumeInfo);
            setAlreadyLike(res.alreadyLikesThisBoard);
            setOwnBoard(res.ownThisNotice);
            const content = res.boardInfo.content;
            updateViewerContent(content);
        } catch (err) {
            console.log('해당 게시물이 존재하지 않습니다.');
            navigate('/');
            return;
        }
    };

    // 댓글 목록 가져오기 (최초 페이지 로딩 시)
    const fetchCommentData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const res = await API.get(
                `/board/${postId}/comments`,
                `?mark=&firstRequest=1&count=4&lifeIsGood=${userId}`,
            );
            setCommentData(res);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    // 게시물 좋아요 동작
    const handleBoardLike = async () => {
        try {
            const data = {
                likesStatus: alreadyLike,
            };
            await API.patch(`/board/${postId}/like`, '', data);
            // Refresh
            fetchBoardData();
        } catch (err) {
            openNotification('bottomRight', `문제가 발생했습니다 : ${err}`);
        }
    };

    // 댓글 작성
    const handleCommentSubmit = async () => {
        const data = {
            text: comment,
        };
        try {
            await API.post(`/board/${postId}/comments`, data);
            setComment('');
            fetchBoardData();
            fetchCommentData();
        } catch (err) {
            console.log(err);
        }
    };

    // 댓글 좋아요
    const handleCommentLike = async (id: number, likesStatus: boolean) => {
        try {
            const data = {
                likesStatus,
            };
            console.log('LIKESTSTUS =', likesStatus);
            await API.patch(`/comments/${id}/like`, '', data);

            const newCommentData = commentData.map(item => {
                if (item.commentId === id) {
                    if (item.alreadyLikes) {
                        item.likes = item.likes - 1;
                        item.alreadyLikes = false;
                    } else {
                        item.likes = item.likes + 1;
                        item.alreadyLikes = true;
                    }
                }
                return item;
            });
            setCommentData(newCommentData);
        } catch (err) {
            openNotification('bottomRight', `문제가 발생했습니다 : ${err}`);
        }
    };

    const handleOnChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    // 댓글 더 불러오기
    const handleMoreComment = async () => {
        try {
            const mark = commentData?.slice(-1)[0].MARK;
            const res = await API.get(
                `/board/${postId}/comments`,
                `?firstRequest=0&lifeIsGood=${localStorage.getItem('userId')}&mark=${mark}&count=4`,
            );
            setCommentData([...commentData, ...res]);
        } catch (err) {
            openNotification('bottomRight', `문제가 발생했습니다 : ${err}`);
        }
    };

    // 게시물 수정하기
    const handleBoardEdit = async () => {
        const data = {
            title: boardData?.title,
            content: boardData?.content,
            hashTags: boardData?.hashTags,
        };
        navigate(`/post/${postId}/edit`, { state: data });
    };

    // 게시물 삭제
    const handleBoardRemove = async () => {
        try {
            await API.delete(`/board/${postId}`);
            navigate('/');
        } catch (err) {
            setModalOpen(false);
            openNotification('bottomRight', `문제가 발생했습니다 : ${err}`);
        }
    };

    // 댓글 삭제
    const handleCommentDelete = async (commentId: number) => {
        try {
            await API.delete(`/board/${postId}/comments/${commentId}`);
            fetchBoardData();
            fetchCommentData();
        } catch (err) {
            openNotification('bottomRight', `문제가 발생했습니다 : ${err}`);
        }
    };

    // 댓글 수정
    const handleCommentEdit = (e: any) => {
        console.log('hi');
        console.log(e.target.value);
    };

    // 알림 메세지
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement, message: string) => {
        api.info({
            message: message,
            placement,
        });
    };

    useEffect(() => {
        fetchBoardData();
        fetchCommentData();
    }, []);

    return (
        <>
            <Modal
                title="게시물을 삭제하시겠습니까?"
                centered
                open={modalOpen}
                onOk={handleBoardRemove}
                onCancel={() => setModalOpen(false)}
            ></Modal>
            <Layout>
                {contextHolder}
                <Wrapper>
                    <Title level={2}>{boardData?.title}</Title>
                    <Profile>
                        <ProfileImg src={boardData?.avatarUrl}></ProfileImg>
                        <ProfileInfo>
                            <ProfileInfoName>{boardData?.email}</ProfileInfoName>
                            <Text>{calcElapsed(boardData?.boardCreated)} 전</Text>
                        </ProfileInfo>
                        {ownBoard ? (
                            <ButtonWrapper>
                                <Button type="primary" size="large" onClick={handleBoardEdit}>
                                    수정
                                </Button>
                                <Button danger size="large" onClick={() => setModalOpen(true)}>
                                    삭제
                                </Button>
                            </ButtonWrapper>
                        ) : (
                            ''
                        )}
                    </Profile>
                    {resumeData !== null && (
                        <ResumeWrapper>
                            <ResumeComponent resumeId={resumeData.resumeId} />
                        </ResumeWrapper>
                    )}
                    <Contents>
                        <Viewer initialValue={boardData?.title} ref={viewerRef} />
                    </Contents>
                    <PostStates>
                        <Button
                            type={alreadyLike ? 'primary' : 'default'}
                            icon={alreadyLike ? <LikeFilled /> : <LikeOutlined />}
                            size="large"
                            onClick={handleBoardLike}
                        >
                            {String(boardData?.likeCnt)}
                        </Button>
                        <Button icon={<CommentOutlined />} size="large">
                            {String(boardData?.commentCnt)}
                        </Button>
                    </PostStates>
                </Wrapper>
                <Wrapper>
                    <Title level={4}>댓글</Title>
                    <CommentForm>
                        <TextArea rows={3} value={comment} onChange={handleOnChangeComment} />
                        <Button onClick={handleCommentSubmit} size="large">
                            작성
                        </Button>
                    </CommentForm>
                    {commentData.map((item, index) => (
                        <CommentWrapper key={index}>
                            <Card
                                size="small"
                                title={
                                    <Profile>
                                        <ProfileImg src={item.avatarUrl}></ProfileImg>
                                        <ProfileInfo>
                                            <ProfileInfoName>{item.username}</ProfileInfoName>
                                            <Text>{calcElapsed(item.commentCreated)} 전</Text>
                                        </ProfileInfo>
                                    </Profile>
                                }
                                extra={
                                    <>
                                        {item.myComment && (
                                            <CommentButtonWrapper>
                                                <Button
                                                    type="link"
                                                    onClick={() => setEditComment(item.text)}
                                                >
                                                    수정
                                                </Button>
                                                <Button
                                                    type="link"
                                                    danger
                                                    onClick={() =>
                                                        handleCommentDelete(item.commentId)
                                                    }
                                                >
                                                    삭제
                                                </Button>
                                            </CommentButtonWrapper>
                                        )}

                                        <Button
                                            type={item.alreadyLikes ? 'primary' : 'default'}
                                            icon={
                                                item.alreadyLikes ? (
                                                    <LikeFilled />
                                                ) : (
                                                    <LikeOutlined />
                                                )
                                            }
                                            size="large"
                                            onClick={() =>
                                                handleCommentLike(item.commentId, item.alreadyLikes)
                                            }
                                        >
                                            {String(item.likes)}
                                        </Button>
                                    </>
                                }
                                style={{ width: '100%' }}
                            >
                                <Text>{item.text}</Text>
                                {editComment !== '' && (
                                    <Input
                                        name="editComment"
                                        value={editComment}
                                        onChange={handleCommentEdit}
                                    />
                                )}
                            </Card>
                        </CommentWrapper>
                    ))}

                    {boardData?.commentCnt && boardData?.commentCnt > commentData.length ? (
                        <Button type="link" onClick={handleMoreComment}>
                            더보기
                        </Button>
                    ) : (
                        ''
                    )}
                </Wrapper>
            </Layout>
        </>
    );
};

export default Post;
