export {};

// import styled from '@emotion/styled';
// //import MarkdownEditor from 'components/MarkdownEditor';
// import { useState, useRef, useEffect } from 'react';
// import { Editor } from '@toast-ui/react-editor';
// import 'tui-color-picker/dist/tui-color-picker.css';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// import '@toast-ui/editor/dist/i18n/ko-kr';
// import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// import axios from 'axios';

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

// const WrapperHeader = styled.h2``;

// const TitleInput = styled.input``;

// const ButtonWrapper = styled.div`
//     display: flex;
//     width: 100%;
// `;

// const TagInput = styled.input`
//     display: flex;
//     width: 100%;
// `;

// const Button = styled.button``;

// const ErrorMsg = styled.p`
//     font-size: 16px;
//     color: #f66;
// `;

// const ResumeSelectUI = styled.div`
//     width: 100%;
//     height: 80px;
//     background-color: yellowgreen;
// `;

// function CreatePost() {
//     // 마크다운 에디터 객체
//     const editorRef = useRef<Editor>(null);
//     // 이력서 첨부 여부 상태
//     const [isResume, setIsResume] = useState<boolean>(false);
//     // 폼 제출 시 에러 발생한 항목에 에러 메세지 출력을 위한 상태값
//     const [error, setError] = useState({
//         resume: false,
//         title: false,
//         contents: false,
//         // tags는 선택하지 않아도 됨
//     });
//     // 폼 입력 데이터
//     const [form, setForm] = useState({
//         title: '',
//         tags: '',
//     });
//     const { title, tags } = form;

//     const onToggleButton = () => {
//         setIsResume(prev => !prev);
//         console.log('Resume :', isResume);
//     };

//     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         const { name, value } = e.target;
//         setForm({
//             ...form,
//             [name]: value,
//         });
//     };

//     const handleSubmit = () => {
//         // 게시물 작성 폼 유효성 검사
//         // 이력서 on 인데 이력서를 선택하지 않았을 경우
//         if (isResume === true) {
//             // 이력서 선택 여부 추가 필요
//             setError({
//                 ...error,
//                 resume: true,
//             });
//             console.log('이력서를 선택해주세요.');
//             return;
//         }
//         // 제목 입력 여부 판별
//         if (form.title === '') {
//             setError({
//                 ...error,
//                 title: true,
//             });
//             console.log('제목을 입력해주세요.');
//             return;
//         }
//         // 게시물 내용 입력 여부 판별
//         const contents = editorRef.current?.getInstance().getMarkdown();
//         if (contents === '') {
//             setError({
//                 ...error,
//                 contents: true,
//             });
//             // 에디터 포커스
//             editorRef.current?.getInstance().focus();
//             console.log('게시물 내용을 입력해주세요.');
//             return;
//         }
//         const data = {
//             ...form,
//             contents,
//         };
//         console.log(data);
//     };

//     //     const handleFocus = () => {
//     //         console.log('Focus');
//     //     };

//     const initValues = `# hi
//    hello
//    `;

//     //     useEffect(() => {
//     //         if (editorRef.current) {
//     //             editorRef.current.getInstance().removeHook('addImageBlobHook');
//     //             type MathFn = (a: string, b: string) => number;
//     //             editorRef.current
//     //                 .getInstance()
//     //                 .addHook('addImageBlobHook', async (blob: any, callback: MathFn) => {
//     //                     // blob 자체가 file 임,
//     //                     const formData = new FormData();
//     //                     // 아래와 같이 저장하면 formData {image:blob} 형태가 됨
//     //                     formData.append('image', blob);

//     //                     console.log(blob, formData);
//     //                     const getUrl = await axios.post('/file/url', formData);
//     //                     console.log(`![](${getUrl.data.imageUrl})`);
//     //                     callback('http://localhost:3001/' + getUrl.data.imageUrl, blob.name);
//     //                     return false;
//     //                 });
//     //         }

//     //         return () => {};
//     //     }, [editorRef]);

//     return (
//         <Container>
//             <Wrapper>
//                 <WrapperHeader>이력서 첨부</WrapperHeader>
//                 <button onClick={onToggleButton}>이력서</button>
//                 {isResume && <ResumeSelectUI />}
//             </Wrapper>
//             <Wrapper>
//                 <WrapperHeader>제목</WrapperHeader>
//                 <TitleInput type="text" name="title" value={title} onChange={onChange} />
//             </Wrapper>
//             <Wrapper>
//                 <WrapperHeader>내용</WrapperHeader>
//                 <Editor
//                     // initialValue="hello react editor world!" // 게시물 수정 시 사용
//                     initialValue={initValues}
//                     placeholder="이 입력폼은 마크다운 문법을 지원합니다."
//                     previewStyle="vertical"
//                     height="600px"
//                     initialEditType="markdown"
//                     useCommandShortcut={true}
//                     language="ko-KR"
//                     plugins={[colorSyntax]}
//                     ref={editorRef}
//                     onFocus={handleFocus}
//                 />
//             </Wrapper>
//             <Wrapper>
//                 <WrapperHeader>태그</WrapperHeader>
//                 <TagInput type="text" name="tags" value={tags} onChange={onChange} />
//             </Wrapper>
//             <ButtonWrapper>
//                 <Button>취소</Button>
//                 <Button onClick={handleSubmit}>등록</Button>
//             </ButtonWrapper>
//         </Container>
//     );
// }

// export default CreatePost;
