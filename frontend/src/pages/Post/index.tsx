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

const { confirm } = Modal;
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
    cursor: pointer;
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

const ResumeWrapper = styled.div`
    padding-bottom: 2rem;
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.1);
    h3 {
        margin-left: 4rem;
    }
`;

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
    year: string;
    information: null;
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
    const [boardData, setBoardData] = useState<IBoardInfo | null>(null);
    const [resumeData, setResumeData] = useState<IResumeInfo | null>(null);
    const [commentData, setCommentData] = useState<ICommentData[] | []>([]);
    const [alreadyLike, setAlreadyLike] = useState<boolean>(false);
    const [ownBoard, setOwnBoard] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('');
    const [editComment, setEditComment] = useState<string>('');
    const [isEditComment, setIsEditComment] = useState<number>(0);
    const [reportReason, setReportReason] = useState<string>('');
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

    // 댓글 수정 변수
    const handleCommentEdit = (e: any) => {
        setEditComment(e.target.value);
    };

    // 알림 메세지
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement: NotificationPlacement, message: string) => {
        api.info({
            message: message,
            placement,
        });
    };

    const handleSubmitEditComment = async () => {
        const data = {
            text: editComment,
        };
        try {
            await API.patch(`/comments/${isEditComment}`, '', data);
            setIsEditComment(0);
            setEditComment('');
            const newData = commentData.map(item => {
                if (item.commentId === isEditComment) {
                    item.text = editComment;
                }
                return item;
            });
            setCommentData(newData);
        } catch (err) {
            openNotification('bottomRight', `문제가 발생했습니다 : ${err}`);
        }
    };

    useEffect(() => {
        fetchBoardData();
        fetchCommentData();
    }, []);

    const reportComfirm = async () => {
        try {
            const data = {
                defendantUserId: boardData?.ownUserId,
                reason: reportReason,
            };
            const res = await API.post('/users/report', data);
            console.log(res);
            setModalOpen(false);
        } catch (err) {
            openNotification('bottomRight', `문제가 발생했습니다 : ${err}`);
        }
    };

    const showReportCancel = () => {
        confirm({
            title: '이미 신고한 유저입니다. 신고를 취소하시겠습니까?',
            onOk() {
                console.log('hello');
            },
            onCancel() {
                console.log('CANCEL');
            },
            okText: '신고 취소하기',
            cancelText: '취소',
        });
    };

    const showBoardDeleteConfirm = () => {
        confirm({
            title: '게시물을 삭제하시겠습니까?',
            onOk() {
                handleBoardRemove();
            },
            onCancel() {
                console.log('CANCEL');
            },
            okText: '삭제',
            cancelText: '취소',
        });
    };

    const checkReportBoardUser = async () => {
        // 본인 프로필 클릭 시 신고 버튼 동작 방지
        const user = Number(localStorage.getItem('userId'));
        const boardCreator = boardData?.ownUserId;
        if (boardCreator === user) {
            return;
        }

        try {
            const res = await API.get('/users/report', `?defendantUserId=${boardData?.id}`);
            console.log(res);
            if (res.reported) {
                // 신고 취소 모달창
                showReportCancel();
            } else {
                // 신고 모달창
                setModalOpen(true);
                // showReportComfirm();
            }
        } catch (err) {
            openNotification('bottomRight', `문제가 발생했습니다 : ${err}`);
        }
    };

    const handleReportReason = (e: any) => {
        setReportReason(e.target.value);
    };

    return (
        <>
            <Modal
                title="이 사용자를 정말로 신고하시겠습니까? 신고 사유를 입력해주세요."
                centered
                open={modalOpen}
                onOk={reportComfirm}
                onCancel={() => setModalOpen(false)}
                okText="신고하기"
                cancelText="취소"
            >
                <Input value={reportReason} onChange={handleReportReason} />
            </Modal>
            <Layout>
                {contextHolder}
                <Wrapper>
                    <Title level={2}>{boardData?.title}</Title>
                    <Profile>
                        <ProfileImg
                            src={boardData?.avatarUrl}
                            onClick={checkReportBoardUser}
                        ></ProfileImg>
                        <ProfileInfo>
                            <ProfileInfoName>{boardData?.email}</ProfileInfoName>
                            <Text>{calcElapsed(boardData?.boardCreated)} 전</Text>
                        </ProfileInfo>
                        {ownBoard ? (
                            <ButtonWrapper>
                                <Button type="primary" size="large" onClick={handleBoardEdit}>
                                    수정
                                </Button>
                                <Button danger size="large" onClick={showBoardDeleteConfirm}>
                                    삭제
                                </Button>
                            </ButtonWrapper>
                        ) : (
                            ''
                        )}
                    </Profile>
                    {resumeData !== null && (
                        <ResumeWrapper>
                            <Title level={3}>첨부 이력서</Title>
                            <ResumeComponent resumeId={resumeData.resumeId} type={'post'} />
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
                                                    onClick={() => {
                                                        setIsEditComment(item.commentId);
                                                        setEditComment(item.text);
                                                    }}
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
                                {isEditComment !== item.commentId ? (
                                    <Text>{item.text}</Text>
                                ) : (
                                    <CommentForm>
                                        <TextArea
                                            rows={3}
                                            name="editComment"
                                            value={editComment}
                                            onChange={handleCommentEdit}
                                        />
                                        <ButtonWrapper>
                                            <Button
                                                type="primary"
                                                onClick={handleSubmitEditComment}
                                            >
                                                확인
                                            </Button>
                                            <Button
                                                danger
                                                onClick={() => {
                                                    setIsEditComment(0);
                                                    setEditComment('');
                                                }}
                                            >
                                                취소
                                            </Button>
                                        </ButtonWrapper>
                                    </CommentForm>
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
