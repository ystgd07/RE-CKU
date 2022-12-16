import { Layout } from './style';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// let mocksPortfolio: {
//   name: string;
//   address: string;
//   date: string;
//   id: any;
// }[];
// mocksPortfolio = [
//   {
//     name: "sungsoo`s 포폴",
//     address: "충청북도 청주시",
//     date: "2022-03-07",
//     id: Math.random(),
//   },
//   {
//     name: "s`s 포폴",
//     address: "충청북도 청주시",
//     date: "010-1234-5678",
//     id: Math.random(),
//   },
//   {
//     name: "y`s 포폴",
//     address: "충청북도 청주시",
//     date: "010-1234-5678",
//     id: Math.random(),
//   },
//   {
//     name: "y`s 포폴",
//     address: "충청북도 청주시",
//     date: "010-1234-5678",
//     id: Math.random(),
//   },
//   {
//     name: "y`s 포폴",
//     address: "충청북도 청주시",
//     date: "010-1234-5678",
//     id: Math.random(),
//   },
// ];
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
            const mocks = await axios.get('/myportfolio/myportfolio/list', {
                headers: { authorization: `Bearer ${token}` },
            });
            console.log(mocks);
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
            const mocks = await axios.post(
                '/myportfolio/resume/',
                {},
                { headers: { authorization: `Bearer ${token}` } },
            );
            if (mocks.status === 200) {
                navigate('/');
            }
            console.log(mocks);
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
