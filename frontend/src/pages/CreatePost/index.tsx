import styled from '@emotion/styled';
//import MarkdownEditor from 'components/MarkdownEditor';
import { useState, useRef, useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

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

const WrapperHeader = styled.h2``;

const CategorySelector = styled.select`
   border: 1px solid rgba(0, 0, 0, 0.1);
`;

const CategoryOption = styled.option``;

const TitleInput = styled.input``;

const ButtonWrapper = styled.div`
   display: flex;
   width: 100%;
`;

const TagWrapper = styled.div`
   display: flex;
   width: 100%;
`;

const Button = styled.button``;

function CreatePost() {
   //const [text, setText] = useState<string>('');
   //const editor = useRef<HTMLInputElement>(null);
   const editorRef: any = useRef();
   const handleClick = () => {
      //editorRef.current.getInstance().exec('bold');
      const contents = editorRef.current.getInstance().getMarkdown();
      console.log(contents);
   };
   const handleFocus = () => {
      console.log('Focus');
   };
   const initValuess = `# hi
   hello
   `;
   useEffect(() => {
      if (editorRef.current) {
         editorRef.current.getInstance().removeHook('addImageBlobHook');
         // editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
         //    (async () => {
         //       let formData = new FormData();
         //       formData.append('file', blob);

         //       axios.defaults.withCredentials = true;
         //       const { data: url } = await axios.post(`${backUrl}image.do`, formData, {
         //          header: { 'content-type': 'multipart/formdata' },
         //       });
         //       callback(url, 'alt text');
         //    })();

         //    return false;
         // });
         editorRef.current.getInstance().addHook('addImageBlobHook', (blob: any) => {
            const formData = new FormData();
            formData.append('image', blob.name);
            console.log(blob);
            console.log('formData:', formData);
            return false;
         });
      }

      return () => {};
   }, [editorRef]);
   return (
      <Container>
         <Wrapper>
            <WrapperHeader>카테고리</WrapperHeader>
            <CategorySelector>
               <CategoryOption>OTION 1</CategoryOption>
               <CategoryOption>OTION 2</CategoryOption>
               <CategoryOption>OTION 3</CategoryOption>
            </CategorySelector>
         </Wrapper>
         <Wrapper>
            <WrapperHeader>제목</WrapperHeader>
            <TitleInput type="text" />
         </Wrapper>
         <Wrapper>
            <WrapperHeader>내용</WrapperHeader>
            <Editor
               // initialValue="hello react editor world!" // 게시물 수정 시 사용
               initialValue={initValuess}
               placeholder="이 입력폼은 마크다운 문법을 지원합니다."
               previewStyle="vertical"
               height="600px"
               initialEditType="markdown"
               useCommandShortcut={true}
               ref={editorRef}
               onFocus={handleFocus}
            />
         </Wrapper>
         <Wrapper>
            <WrapperHeader>태그</WrapperHeader>
            <TagWrapper>react, redux, recoil</TagWrapper>
         </Wrapper>
         <ButtonWrapper>
            <Button>취소</Button>
            <Button onClick={handleClick}>등록</Button>
         </ButtonWrapper>
      </Container>
   );
}

export default CreatePost;
