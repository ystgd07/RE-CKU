import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Button, Input, Switch, Typography } from 'antd';
import API from 'utils/api';

const { Title, Text } = Typography;

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

const WrapperHeader = styled.div`
    display: flex;
    align-items: center;
`;

const ToggleDiv = styled.div`
    width: 120px;
    margin-left: 20px;
    height: 34px;
`;

const ButtonDiv = styled.div`
    display: flex;
    width: 100%;
`;

const ErrorMsg = styled.p`
    font-size: 16px;
    color: #f66;
`;

const ResumeSelectUI = styled.div`
    width: 100%;
    height: 80px;
    background-color: yellowgreen;
`;

function CreatePost() {
    // 마크다운 에디터 객체
    const editorRef = useRef<Editor>(null);
    // 이력서 첨부 여부 상태
    const [isResume, setIsResume] = useState<boolean>(false);
    // 폼 제출 시 에러 발생한 항목에 에러 메세지 출력을 위한 상태값
    const [error, setError] = useState({
        resume: false,
        title: false,
        content: false,
        // tags는 선택하지 않아도 됨
    });
    // 폼 입력 데이터
    const [form, setForm] = useState({
        title: '',
        hashTags: '',
    });
    const { title, hashTags } = form;
    const navigate = useNavigate();

    const onToggleButton = () => {
        setIsResume(prev => !prev);
        console.log('Resume :', isResume);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        // 게시물 작성 폼 유효성 검사
        // 이력서 on 인데 이력서를 선택하지 않았을 경우
        if (isResume === true) {
            // 이력서 선택 여부 추가 필요
            setError({
                ...error,
                resume: true,
            });
            console.log('이력서를 선택해주세요.');
            return;
        }
        // 제목 입력 여부 판별
        if (form.title === '') {
            setError({
                ...error,
                title: true,
            });
            console.log('제목을 입력해주세요.');
            return;
        }
        // 게시물 내용 입력 여부 판별
        const content = editorRef.current?.getInstance().getMarkdown();
        if (content === '') {
            setError({
                ...error,
                content: true,
            });
            // 에디터 포커스
            editorRef.current?.getInstance().focus();
            console.log('게시물 내용을 입력해주세요.');
            return;
        }

        const resumeId = isResume ? 0 : 0;
        const data = {
            ...form,
            content,
            resumeId,
        };

        try {
            const res = await API.post('/board', data);
            navigate(`/post/${res.data}`, { state: res.data });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getInstance().removeHook('addImageBlobHook');
            type HookCallback = (url: string, text?: string) => void;
            editorRef.current
                .getInstance()
                .addHook('addImageBlobHook', async (blob: File, callback: HookCallback) => {
                    // blob 자체가 file 임,
                    const formData = new FormData();
                    // 아래와 같이 저장하면 formData {image:blob} 형태가 됨
                    formData.append('image', blob);
                    // 서버에 이미지 저장 및 저장된 이미지 url 응답 받기
                    const url = await API.post('/file/url', formData);
                    // 에디터에 url과 파일 이름을 이용한 마크다운 이미지 문법 작성 콜백 함수
                    callback(process.env.REACT_APP_SERVER_URL + url.imageUrl, blob.name);
                    return false;
                });
        }
        return () => {};
    }, []);

    return (
        <Container>
            <Wrapper>
                <WrapperHeader>
                    <Title level={4}>이력서 첨부</Title>
                    <ToggleDiv>
                        <Switch onClick={onToggleButton} />
                    </ToggleDiv>
                </WrapperHeader>

                {isResume && <ResumeSelectUI />}
            </Wrapper>

            <Wrapper>
                <Title level={4}>제목</Title>
                <Input
                    size="large"
                    placeholder="제목을 입력해주세요."
                    name="title"
                    value={title}
                    onChange={onChange}
                />
            </Wrapper>
            <Wrapper>
                <Title level={4}>내용</Title>
                <Editor
                    placeholder="이 입력폼은 마크다운 문법을 지원합니다."
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    language="ko-KR"
                    plugins={[colorSyntax]}
                    ref={editorRef}
                />
            </Wrapper>
            <Wrapper>
                <Title level={4}>태그</Title>
                <Input size="large" name="hashTags" value={hashTags} onChange={onChange} />
            </Wrapper>
            <ButtonDiv>
                <Button type="default" size="large">
                    취소
                </Button>
                <Button type="primary" size="large" onClick={handleSubmit}>
                    등록
                </Button>
            </ButtonDiv>
        </Container>
    );
}

export default CreatePost;
