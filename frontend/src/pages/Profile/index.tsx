import { Bar } from './style';
import { useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme, Avatar, Divider, Space, Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Header, Content, Footer } = Layout;
const tierColors = {
    bronze: '#964b00',
    silver: '#c0c0c0',
    gold: '#ffbd1b',
};
const Profile: React.FC = () => {
    let mock: {
        name: string;
        point: number;
    }[];
    mock = [
        {
            name: 'sungsoo',
            point: 90,
        },
    ];
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    async function getProfile() {
        try {
            const token = localStorage.getItem('accessToken');
            // const res = await axios.post(
            //   "https://reactproject-test-78fcd-default-rtdb.firebaseio.com/mock.json",
            //   { mocksPortfolio }
            // );
            const mocks = await axios.get('users/individual', {
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
    useEffect(() => {
        getProfile();
    }, []);
    const arr = [20, 40, 100];
    let upperLimit = arr[0];
    let lowerLimit = 0;
    let tier = 'Bronze';
    let tierColor = tierColors.bronze;
    arr.map((e, idx) => {
        if (e <= mock[0].point) {
            upperLimit = arr[idx + 1];
            if (upperLimit === 40) {
                tier = 'Silver';
                tierColor = tierColors.silver;
            } else if (upperLimit === 100) {
                tier = 'Gold';
                tierColor = tierColors.gold;
            }
            if (upperLimit === arr[0]) {
                lowerLimit = 0;
            } else {
                lowerLimit = upperLimit - arr[idx];
            }
        }
    });

    console.log(upperLimit, lowerLimit);
    let testWidth = ((mock[0].point - lowerLimit) / (upperLimit - lowerLimit)) * 100;
    if (testWidth === 100) testWidth = 0;
    console.log(testWidth);

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px', height: '768px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
                <div
                    className="site-layout-content"
                    style={{ background: colorBgContainer, height: '100%' }}
                >
                    <div>
                        <Space direction="vertical">
                            <div>
                                <Avatar size={120} icon={<UserOutlined />} />
                            </div>
                            <div style={{ height: '38px' }}>
                                <span style={{ fontSize: '35px' }}>{mock[0].name}</span>
                            </div>
                            <div>
                                <div style={{ width: `${testWidth}%` }}></div>
                            </div>
                            <p style={{ color: `${tierColor}`, fontWeight: 'bold' }}>{tier}</p>
                            <Progress
                                percent={testWidth}
                                status="active"
                                strokeColor={{ '0%': `${tierColor}`, '100%': `${tierColor}` }}
                            />
                        </Space>
                    </div>
                    <Divider />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
    );
};

export default Profile;
{
    /* <h1>profile page</h1>
            <Bar>
                <div>
                    <div></div>
                </div>
                <div>
                    <span>안녕 이름이야 여긴</span>
                    <div></div>
                    <div>
                        <div style={{ width: `${testWidth}%` }}></div>
                    </div>
                </div>
            </Bar> */
}
