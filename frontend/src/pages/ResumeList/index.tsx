import { Layout, Alert } from './style';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Mock = { resumeName: string; address: string; updatedAt: string; resumeId: any };
let id: any;
const ResumeMain = () => {
    const [res, setRes] = useState<Mock[]>([]);
    const navigate = useNavigate();
    // /my-portfolio/resumes/:resumeId
    async function deletePortfolio(e: any) {
        e.stopPropagation();
        console.log(e.target.value);
        try {
            const res = await axios.delete(`/my-portfolio/resumes/${e.target.value}`);

            if (res.status === 200) {
                getPortfolio();
            }
        } catch (e) {
            console.log(e);
        }
    }
    const gotoModify = (e: any) => {
        e.stopPropagation();
        navigate(`/resume/${e.target.value}/edit`);
    };
    const gotoPost = (e: any) => {
        console.log(e.currentTarget.id);
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
            console.log(mocks, 'SUCCCCCCCCCess');

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
            <h1>My Portfolio</h1>
            <Layout>
                <div onClick={postPortfolio}>
                    <div>
                        <div>
                            <i>+</i>
                        </div>
                        <p>새 이력서 작성</p>
                    </div>
                </div>

                {res.map((e: Mock) => (
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
                ))}
            </Layout>
            <Alert>{res.length === 0 && <p>작성된 이력서가 없습니다.</p>}</Alert>
        </>
    );
};

export default ResumeMain;
