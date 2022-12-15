import styled from '@emotion/styled';
//import MarkdownEditor from 'components/MarkdownEditor';
import { useState, useRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
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

const TagInput = styled.input`
    display: flex;
    width: 100%;
`;

const Button = styled.button``;

function CreatePost() {
    const editorRef = useRef<Editor>(null);
    const [form, setForm] = useState({
        title: '',
        tags: '',
    });
    const { title, tags } = form;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        //editorRef.current.getInstance().exec('bold');
        const contents = editorRef.current?.getInstance().getMarkdown();
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
            type MathFn = (a: string, b: string) => number;
            editorRef.current
                .getInstance()
                .addHook('addImageBlobHook', async (blob: any, callback: MathFn) => {
                    // blob 자체가 file 임,
                    const formData = new FormData();
                    // 아래와 같이 저장하면 formData {image:blob} 형태가 됨
                    formData.append('image', blob);

                    console.log(blob, formData);
                    const getUrl = await axios.post('/file/url', formData);
                    console.log(`![](${getUrl.data.imageUrl})`);
                    callback('http://localhost:3001/' + getUrl.data.imageUrl, blob.name);
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
                <TitleInput type="text" name="title" value={title} onChange={onChange} />
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
                    language="ko-KR"
                    plugins={[colorSyntax]}
                    ref={editorRef}
                    onFocus={handleFocus}
                />
            </Wrapper>
            <Wrapper>
                <WrapperHeader>태그</WrapperHeader>
                <TagInput type="text" name="tags" value={tags} onChange={onChange} />
            </Wrapper>
            <ButtonWrapper>
                <Button>취소</Button>
                <Button onClick={handleSubmit}>등록</Button>
            </ButtonWrapper>
        </Container>
    );
}

export default CreatePost;
