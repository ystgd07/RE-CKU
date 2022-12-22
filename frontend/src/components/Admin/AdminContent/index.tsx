import React, { useEffect, useState } from 'react';
import {
    Layout,
    Avatar,
    theme,
    Input,
    Typography,
    List,
    Switch,
    Col,
    Row,
    Button,
    Collapse,
} from 'antd';
import axios from 'axios';

import styled from '@emotion/styled';
const { Panel } = Collapse;
const { Content } = Layout;
const { Search } = Input;
const { Paragraph } = Typography;

const BorderDiv = styled.div`
    width: 90%;
    max-width: 1280px;
    margin: 0 0 10px 0;
    padding: 10px;
    border: 2px solid #3e3939cb;
    border-radius: 10px;
    box-sizing: border-box;
    flex-wrap: wrap;
    background-color: #ffffffc1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & h3 {
        margin: 10px 10px;
    }
    & div {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        & div {
            display: flex;
            flex-direction: row;
        }
    }

    @media (max-width: 640px) {
        display: flex;
        flex-direction: column;
        & div {
            display: flex;
            flex-direction: column;
            & div {
                display: flex;
                flex-direction: column;
            }
        }
    }
`;
interface userDataRes {
    avatarUrl: string;
    created: string;
    userId: number;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
    point: number;
    active: number;
    clickedLikes: number;
    howToLogin: string;
}

const AdminContent: React.FC = () => {
    const [userData, setUserData] = useState<userDataRes[]>([]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    async function getId() {
        try {
            const res = await axios.get(`/admin/user-list`);
            console.log('😀');
            console.log(res.data.data);
            setUserData(res.data.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getId();
    }, []);

    const onChangeActive = (item: any) => {
        console.log(item);
        //이거 누르면 밴
    };

    return (
        <>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                }}
            >
                <div style={{ display: 'flex' }}>
                    <Typography.Title level={1} style={{ margin: '10px' }}>
                        신고당한 사용자 보기
                    </Typography.Title>
                </div>

                <List
                    itemLayout="horizontal"
                    dataSource={userData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={'https://joeschmoe.io/api/v1/random'} />}
                                title={
                                    <>
                                        {item.email}/{item.username}
                                    </>
                                }
                                description={
                                    <>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Typography.Title
                                                level={5}
                                                style={{ margin: '0.1rem' }}
                                            >
                                                신고당한 횟수 : {item.howToLogin}
                                            </Typography.Title>
                                            <div>
                                                <Button
                                                    type="primary"
                                                    // onClick={onChangeActive}
                                                >
                                                    2주 밴
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <Collapse bordered={false}>
                                                {/* {userData.map((data: any) => (
                                                    <Panel
                                                        header=" 신고내역펼치기"
                                                        key={item.userId}
                                                    >
                                                        님 밴
                                                    </Panel>
                                                ))} */}
                                                {/* //여기에 신고내역 */}
                                            </Collapse>
                                        </div>
                                    </>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Content>
        </>
    );
};

export default AdminContent;
