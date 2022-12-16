import { Layout } from './style';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Mock = { name: string; address: string; date: string; id: any };

const ResumeMain = () => {
    const [res, setRes] = useState<Mock[]>([]);
    const navigate = useNavigate();
    async function getPortfolio() {
        try {
            const token = localStorage.getItem('accessToken');
            // const res = await axios.post(
            //   "https://reactproject-test-78fcd-default-rtdb.firebaseio.com/mock.json",
            //   { mocksPortfolio }
            // );
            const mocks = await axios.get('/myportfolio/list', {
                headers: { authorization: `Bearer ${token}` },
            });
            console.log(mocks, 'SUCCCCCCCCCess');

            // console.log(mocks.data["-NJJR5a9003Z0Qw6WOzB"]);
            // const mock = mocks.data["-NJJR5a9003Z0Qw6WOzB"].mocksPortfolio;
            // setRes(mock);
        } catch (e) {
            console.log(e);
        }
    }
    async function postPortfolio() {
        try {
            const token = localStorage.getItem('accessToken');
            // const res = await axios.post(
            //   "https://reactproject-test-78fcd-default-rtdb.firebaseio.com/mock.json",
            //   { mocksPortfolio }
            // );
            const mocks = await axios.post('/myportfolio/resume', {
                headers: { authorization: `Bearer ${token}` },
            });

            const ids = mocks.data.createdResumeId;

            if (mocks.status === 200) {
                navigate(`/resume/${ids}`);
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
