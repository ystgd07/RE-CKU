export {};
// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState, useRef } from 'react';
// import styled from '@emotion/styled';
// import { Viewer } from '@toast-ui/react-editor';
// import '@toast-ui/editor/dist/toastui-editor-viewer.css';
// import Header from 'components/Header';
// import API from 'utils/api';
// import TestProfileImg from 'assets/images/logo-header.png';
// import { LikeOutlined, CommentOutlined, LikeFilled } from '@ant-design/icons';
// import { Button, Typography, Input, Card } from 'antd';
// import { calcElapsed } from 'utils/format';
// const { Title, Text } = Typography;
// const { TextArea } = Input;

// // 본인 게시물일 경우 수정/삭제 버튼 생성
// // 좋아요 누른 경우, 누르지 않은 경우 구분
// // 댓글 좋아요도 마찬가지

// const Container = styled.div`
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     gap: 25px;
//     width: 100%;
//     align-self: center;
//     padding: 25px 25px;
//     margin: 20px auto;
//     margin-right: auto;
//     margin-left: auto;
//     max-width: 1280px;
//     box-sizing: border-box;
// `;
// const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 100%;
// `;
// const Profile = styled.div`
//     width: 100%;
//     margin: 10px 0;
//     display: flex;
//     align-items: center;
// `;
// const ProfileImg = styled.img`
//     width: 50px;
//     height: 50px;
//     background-color: #ea8532;
//     border-radius: 50%;
// `;
// const ProfileInfo = styled.div`
//     height: 70%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     margin-left: 15px;
// `;
// const ProfileInfoName = styled.p`
//     font-size: 18px;
// `;
// const Contents = styled.div`
//     padding: 20px;
//     box-sizing: border-box;
// `;
// const PostStates = styled.div`
//     display: flex;
//     button {
//         margin-left: 10px;
//     }
// `;
// const CommentWrapper = styled(Wrapper)`
//     margin: 10px 0;
// `;
// const CommentHeader = styled.h1`
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     font-size: 16px;
//     padding-left: 30px;
//     button {
//         margin-right: 20px;
//     }
// `;
// const CommentProfile = styled.div`
//     width: 100px;
// `;
// const CommentLikes = styled.div`
//     width: 100px;
//     background-color: yellowgreen;
// `;
// const CommentBody = styled.div`
//     width: 100%;
//     font-size: 14px;
//     padding: 10px;
//     box-sizing: border-box;
// `;
// const ButtonWrapper = styled.div`
//     margin-left: auto;
//     width: 144px;
//     display: flex;
//     justify-content: space-evenly;
// `;

// const CommentForm = styled.div`
//     height: 150px;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: space-around;
// `;

// interface IBoardInfo {
//     avatarUrl: string;
//     boardCreated: Date;
//     commentCnt: number;
//     content: string;
//     email: string;
//     fixed: number;
//     hasResumeId: string | null;
//     id: number;
//     hashTags: string;
//     likeCnt: number;
//     ownUserId: number;
//     title: string;
// }

// interface IResumeInfo {
//     id: number;
//     name: string;
//     usedUserId: number;
//     projects: Array<IProjects> | null;
//     career: Array<ICareer> | null;
//     // position: string;
//     // information: null;
//     // updatedAt: Date;
// }

// interface IProjects {
//     id: number;
//     projectName: string;
//     link1: string;
//     link2: string;
//     usedResumeId: number;
//     year: string; // ?
//     information: null; // ?
//     name: string;
//     usedUserId: number;
//     updatedAt: Date;
// }

// // interface ICareer {
// //     id: number;
// //     company: string;
// //     reward: string;
// //     position: string;
// //     usedResumeId: number;
// //     notDevelop: number;
// //     workNow: number;
// //     startDate: number;
// //     endDate: number;
// //     name: string;
// //     usedUserId: number;
// //     information: null;
// //     updatedAt: Date;
// // }

// interface ICommentData {
//     MARK: string;
//     alreadyLikes: boolean;
//     avatarUrl: string;
//     commentCreated: Date;
//     commentId: number;
//     fixed: number;
//     fromUserId: number;
//     likes: number;
//     myComment: boolean;
//     text: string;
//     username: string;
//     // 신고
// }

// const Post = () => {
//     // const [postData, setPostData] = useState<IPostData | null>(null);
//     const [boardData, setBoardData] = useState<IBoardInfo | null>(null);
//     const [resumeData, setResumeData] = useState<IResumeInfo | null>(null);
//     const [commentData, setCommentData] = useState<ICommentData[] | []>([]);
//     const [alreadyLike, setAlreadyLike] = useState<boolean>(false);
//     const [ownBoard, setOwnBoard] = useState<boolean>(false);
//     const [comment, setComment] = useState<string>('');
//     const { postId } = useParams<{ postId: string }>();

//     const viewerRef = useRef<Viewer>(null);

//     const navigate = useNavigate();

//     // 마크다운 뷰어 내용 업데이트
//     const updateViewerContent = (content: string) => {
//         viewerRef.current?.getInstance().setMarkdown(content);
//     };

//     // 게시물 데이터 가져오기
//     const fetchBoardData = async () => {
//         try {
//             const res = await API.get(
//                 `/board/${postId}`,
//                 `?lifeIsGood=${localStorage.getItem('userId')}`,
//             );
//             setBoardData(res.boardInfo);
//             setResumeData(res.resumeInfo);
//             setAlreadyLike(res.alreadyLikesThisBoard);
//             setOwnBoard(res.ownThisNotice);
//             const content = res.boardInfo.content;
//             updateViewerContent(content);
//         } catch (err) {
//             console.log(err);
//             return;
//         }
//     };

//     // 댓글 목록 가져오기 (최초 페이지 로딩 시)
//     const fetchCommentData = async () => {
//         try {
//             const userId = localStorage.getItem('userId');
//             const res = await API.get(
//                 `/board/${postId}/comments`,
//                 `?mark=&firstRequest=1&count=4&lifeIsGood=${userId}`,
//             );
//             setCommentData(res);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     // 게시물 좋아요 동작
//     const handleBoardLike = async () => {
//         try {
//             const data = {
//                 likesStatus: alreadyLike,
//             };
//             await API.patch(`/board/${postId}/like`, '', data);
//             // Refresh
//             fetchBoardData();
//         } catch (err) {
//             console.log('ERROR:', err);
//         }
//     };

//     // 댓글 작성
//     const handleCommentSubmit = async () => {
//         const data = {
//             text: comment,
//         };
//         try {
//             await API.post(`/board/${postId}/comments`, data);
//             setComment('');
//             fetchBoardData();
//             fetchCommentData();
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     // 댓글 좋아요 동작
//     const handleCommentLike = async (id: number, likesStatus: boolean) => {
//         try {
//             const data = {
//                 likesStatus,
//             };
//             await API.patch(`/comments/${id}/like`, '', data);

//             const newCommentData = commentData.map(item => {
//                 if (item.commentId === id) {
//                     if (item.alreadyLikes) {
//                         item.likes = item.likes - 1;
//                         item.alreadyLikes = false;
//                     } else {
//                         item.likes = item.likes + 1;
//                         item.alreadyLikes = true;
//                     }
//                 }
//                 return item;
//             });
//             setCommentData(newCommentData);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleOnChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setComment(e.target.value);
//     };

//     const handleMoreComment = () => {
//         // try {
//         //     const mark = postData?.comments.slice(-1)[0].MARK;
//         //     const res = API.get(
//         //         `/board/${postId}/comments/pagenation`,
//         //         `?lifeIsGood=${localStorage.getItem('userId')}&mark=${mark}&count=5`,
//         //     );
//         //     console.log(res);
//         // } catch (err) {
//         //     console.log(err);
//         // }
//     };

//     useEffect(() => {
//         fetchBoardData();
//         fetchCommentData();
//     }, []);

//     const handleBoardEdit = async () => {
//         const data = {
//             title: boardData?.title,
//             content: boardData?.content,
//             hashTags: boardData?.hashTags,
//         };
//         navigate(`/post/${postId}/edit`, { state: data });
//     };

//     const handleBoardRemove = async () => {
//         // 함 물어보고 지우자
//         try {
//             await API.delete(`/board/${postId}`);
//             navigate('/');
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <>
//             <Header />
//             <Container>
//                 <Wrapper>
//                     <Title level={2}>{boardData?.title}</Title>
//                     <Profile>
//                         <ProfileImg src={TestProfileImg}></ProfileImg>
//                         <ProfileInfo>
//                             <ProfileInfoName>{boardData?.email}</ProfileInfoName>
//                             <Text>{calcElapsed(boardData?.boardCreated)} 전</Text>
//                         </ProfileInfo>
//                         {ownBoard ? (
//                             <ButtonWrapper>
//                                 <Button type="primary" size="large" onClick={handleBoardEdit}>
//                                     수정
//                                 </Button>
//                                 <Button danger size="large" onClick={handleBoardRemove}>
//                                     삭제
//                                 </Button>
//                             </ButtonWrapper>
//                         ) : (
//                             ''
//                         )}
//                     </Profile>
//                     <Contents>
//                         <Viewer initialValue={boardData?.title} ref={viewerRef} />
//                     </Contents>
//                     <PostStates>
//                         <Button
//                             type={alreadyLike ? 'primary' : 'default'}
//                             icon={alreadyLike ? <LikeFilled /> : <LikeOutlined />}
//                             size="large"
//                             onClick={handleBoardLike}
//                         >
//                             {String(boardData?.likeCnt)}
//                         </Button>
//                         <Button icon={<CommentOutlined />} size="large">
//                             {String(boardData?.commentCnt)}
//                         </Button>
//                     </PostStates>
//                 </Wrapper>
//                 <Wrapper>
//                     <Title level={4}>댓글</Title>
//                     <CommentForm>
//                         <TextArea rows={3} value={comment} onChange={handleOnChangeComment} />
//                         <Button onClick={handleCommentSubmit} size="large">
//                             작성
//                         </Button>
//                     </CommentForm>
//                     {commentData.map((item, index) => (
//                         <CommentWrapper key={index}>
//                             <Card
//                                 size="small"
//                                 title={
//                                     <Profile>
//                                         <ProfileImg src={item.avatarUrl}></ProfileImg>
//                                         <ProfileInfo>
//                                             <ProfileInfoName>{item.username}</ProfileInfoName>
//                                             <Text>{calcElapsed(item.commentCreated)} 전</Text>
//                                         </ProfileInfo>
//                                     </Profile>
//                                 }
//                                 extra={
//                                     <Button
//                                         type={item.alreadyLikes ? 'primary' : 'default'}
//                                         icon={item.alreadyLikes ? <LikeFilled /> : <LikeOutlined />}
//                                         size="large"
//                                         onClick={() =>
//                                             handleCommentLike(item.commentId, item.alreadyLikes)
//                                         }
//                                     >
//                                         {String(item.likes)}
//                                     </Button>
//                                 }
//                                 style={{ width: '100%' }}
//                             >
//                                 <Text>{item.text}</Text>
//                             </Card>
//                         </CommentWrapper>
//                     ))}

//                     {boardData?.commentCnt && boardData?.commentCnt > commentData.length ? (
//                         <Button type="link" onClick={handleMoreComment}>
//                             더보기
//                         </Button>
//                     ) : (
//                         ''
//                     )}
//                 </Wrapper>
//             </Container>
//         </>
//     );
// };

// // export default Post;
