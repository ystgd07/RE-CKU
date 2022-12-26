import { Alert, ContentElement } from './style';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Button, Layout } from 'antd';
import Header from 'components/Header';
const { Footer, Content } = Layout;
type Mock = { resumeName: string; address: string; updatedAt: string; resumeId: any };
let id: any;
const ResumeMain = () => {
    const [res, setRes] = useState<Mock[]>([]);
    const navigate = useNavigate();
    // /my-portfolio/resumes/:resumeId
    async function deletePortfolio(e: any) {
        e.stopPropagation();
        try {
            const res = await axios.delete(`/my-portfolio/resumes/${e.currentTarget.value}`);

            if (res.status === 200) {
                getPortfolio();
            }
        } catch (e) {
            console.log(e);
        }
    }
    const gotoModify = (e: any) => {
        e.stopPropagation();
        navigate(`/resume/${e.currentTarget.value}/edit`);
    };
    const gotoPost = (e: any) => {
        navigate(`/resume/${e.currentTarget.id}`);
    };
    async function getPortfolio() {
        try {
            const token = localStorage.getItem('accessToken');

            const mocks = await axios
                .get('/my-portfolio/resumes', {
                    headers: { authorization: `Bearer ${token}` },
                })
                .then(res => res.data)
                .then(res => res.data);

            await setRes(mocks);
        } catch (e) {
            console.log(e);
        }
    }
    async function postPortfolio() {
        try {
            const token = localStorage.getItem('accessToken');
            const mocks = await axios.post(
                '/my-portfolio/new-resume',
                {},
                {
                    headers: { authorization: `Bearer ${token}` },
                },
            );

            id = mocks.data.data[0].insertId;
            if (mocks.status === 200) {
                navigate(`/resume/${id}/edit`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPortfolio();
    }, []);

    return (
        <>
            {' '}
            <Layout style={{ backgroundColor: 'white' }}>
                <Header></Header>
                <Content
                    style={{
                        backgroundColor: 'white',
                        margin: '30px',
                        width: '-webkit-calc(100% - 80px)',
                    }}
                >
                    <ContentElement>
                        <div onClick={postPortfolio}>
                            <div>
                                <div>
                                    <i>+</i>
                                </div>
                                <p>새 이력서 작성</p>
                            </div>
                        </div>
                    </ContentElement>
                    <Alert>{res.length === 0 && <p>작성된 이력서가 없습니다.</p>}</Alert>
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                            {res.map((e: Mock) => (
                                <Col span={8}>
                                    <Card
                                        onClick={gotoPost}
                                        key={e.resumeId}
                                        id={e.resumeId}
                                        style={{
                                            marginTop: 16,
                                            cursor: 'pointer',
                                            border: '1px solid #dbdbdb',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                                        }}
                                        title={e.resumeName}
                                        bordered={true}
                                        extra={
                                            <div>
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    value={e.resumeId}
                                                    onClick={gotoModify}
                                                >
                                                    수정
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    danger
                                                    shape="round"
                                                    style={{ marginLeft: '5px' }}
                                                    value={e.resumeId}
                                                    onClick={deletePortfolio}
                                                >
                                                    삭제
                                                </Button>
                                            </div>
                                        }
                                    >
                                        {e.updatedAt.split('T')[0]}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Content>
                <Footer style={{ backgroundColor: 'white' }}>Footer</Footer>
            </Layout>
        </>
    );
};

export default ResumeMain;
{
    /* {res.map((e: Mock) => (
                    <div onClick={gotoPost} key={e.resumeId} id={e.resumeId}>
                        <h3>{e.resumeName}</h3>
                        <p>{e.updatedAt.split('T')[0]}</p>
                        <button value={e.resumeId} onClick={deletePortfolio}>
                            삭제
                        </button>
                        <button value={e.resumeId} onClick={gotoModify}>
                            수정
                        </button>
                    </div>
                ))} */
}
