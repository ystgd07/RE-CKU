import { Bar } from './style';
import { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Avatar, Divider, Space, Progress, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserInfo } from 'components/User/UserInfo';
import { Like } from 'components/User/Like';
import axios from 'axios';

//TODO:코드라인이 심각하게 많아지고 있다 컴포넌트의 필요성을 절실하게 느끼는 중..
const { Header, Content, Footer } = Layout;
const tierColors = {
    bronze: '#964b00',
    silver: '#c0c0c0',
    gold: '#ffbd1b',
};

const onChange = (key: string) => {
    console.log(key);
};
type Mock = {
    id: string;
    email: string;
    password: string;
    phoneNumber: string;
    point: number;
    username: string;
    created: string;
    avatarUrl: string;
};
const Profile: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [res, setRes] = useState<Mock>({
        id: '',
        email: '',
        password: '',
        phoneNumber: '',
        point: 0,
        username: '',
        created: '',
        avatarUrl: '',
    });
    async function getProfile() {
        try {
            const token = localStorage.getItem('accessToken');

            const mocks = await axios
                .get('/users/individuals', {
                    headers: { authorization: `Bearer ${token}` },
                })
                .then(res => res.data)
                .then(res => res.data);

            console.log(mocks);

            setRes(mocks);
            console.log(res.point);
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

    arr.map((e: number, idx: number): void => {
        if (e <= res.point) {
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

    let testWidth: number = ((res.point - lowerLimit) / (upperLimit - lowerLimit)) * 100;

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
                                <span style={{ fontSize: '35px' }}>{res.username}</span>
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
                    {tier === 'platinum' ? (
                        <Tabs
                            defaultActiveKey="1"
                            onChange={onChange}
                            items={[
                                {
                                    label: `유저정보`,
                                    key: '1',
                                    children: <UserInfo user={res}></UserInfo>,
                                },
                                {
                                    label: `좋아요`,
                                    key: '2',
                                    children: ``,
                                },
                                {
                                    label: `첨삭`,
                                    key: '3',
                                    children: `Content of Tab Pane 3`,
                                },
                            ]}
                        />
                    ) : (
                        <Tabs
                            defaultActiveKey="1"
                            onChange={onChange}
                            items={[
                                {
                                    label: `유저정보`,
                                    key: '1',
                                    children: <UserInfo user={res}></UserInfo>,
                                },
                                {
                                    label: `좋아요`,
                                    key: '2',
                                    children: <Like></Like>,
                                },
                                {
                                    label: `첨삭(플레티넘)`,
                                    key: '3',
                                    children: `Content of Tab Pane 3`,
                                    disabled: true,
                                },
                            ]}
                        />
                    )}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
    );
};

export default Profile;
