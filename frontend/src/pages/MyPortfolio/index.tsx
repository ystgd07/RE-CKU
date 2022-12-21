import { Layout } from './style';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Mock = { name: string; address: string; date: string; id: any };

const ResumeMain = () => {
    const [res, setRes] = useState<Mock[]>([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    async function getPortfolio() {
        try {
            const mocks = await axios.get('/my-portfolio/resumes', {
                headers: { authorization: `Bearer ${token}` },
            });
            console.log(mocks, 'SUCCCCCCCCCess');
        } catch (e) {
            console.log(e);
        }
    }
    async function postPortfolio() {
        try {
            const mocks = await axios.post(
                '/my-portfolio/new-resume',
                {},
                {
                    headers: { authorization: `Bearer ${token}` },
                },
            );

            const ids = mocks.data.createdResumeId;
            console.log(mocks, 'success');
            if (mocks.status === 200) navigate(`/resume/${ids}`);
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
            {res.length === 0 ? (
                <p>작성된 이력서가 없습니다.</p>
            ) : (
                <p>작성된 이력서가 {res.length}개 있습니다.</p>
            )}
            <Layout>
                <div onClick={postPortfolio}>
                    <div>
                        <div>
                            <i>+</i>
                        </div>
                        <p>새 이력서 작성</p>
                    </div>
                </div>

                {res.map((e: any) => (
                    <div key={e.id}>
                        <h3>{e.name}</h3>
                        <p>{e.date}</p>
                    </div>
                ))}
            </Layout>
        </>
    );
};

export default ResumeMain;
