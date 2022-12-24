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
import axios, { AxiosResponse } from 'axios';

import styled from '@emotion/styled';
import e from 'express';
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
    ban: number;
}
interface userReportData {
    avatarUrl: number;
    reason: string;
    reporterUserId: number;
}

const AdminContent: React.FC = () => {
    const [userData, setUserData] = useState<userDataRes[]>([]);
    const [userReportData, setUserReportData] = useState<userReportData[]>([]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    async function getId() {
        try {
            const res = await axios.get(`/admin/worst-users`);
            console.log('😈');
            console.log(res.data.data);
            setUserData(res.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function getReport(userId: number) {
        try {
            const res = await axios.get(`/admin/worst-users/${userId}`);
            console.log('😫');
            console.log(res.data.data);
            setUserReportData(res.data.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getId();
    }, []);

    const onChangeBan = async (userId: number) => {
        try {
            console.log('userId', userId);
            const res = await axios.patch(`/admin/worst-users/${userId}/ban`, { type: 'BAN' });
            console.log('🥶✋');
            console.log(res);
            getId();
        } catch (e) {
            console.log(e);
        }
    };
    const onChangeBanCancel = async (userId: number) => {
        try {
            console.log('userId', userId);
            const res = await axios.patch(`/admin/worst-users/${userId}/ban`, { type: 'RECOVERY' });
            console.log('😊✋');
            console.log(res);
            getId();
        } catch (e) {
            console.log(e);
        }
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
                                avatar={<Avatar src={item.avatarUrl} />}
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
                                                {item.ban !== 0 ? (
                                                    <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            onChangeBanCancel(item.userId);
                                                        }}
                                                    >
                                                        밴취소
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            onChangeBan(item.userId);
                                                        }}
                                                    >
                                                        2주밴
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <Collapse
                                                bordered={false}
                                                onChange={() => getReport(item.userId)}
                                                // activeKey={userReportData}
                                            >
                                                <Panel header=" 신고내역펼치기" key={item.userId}>
                                                    {userReportData.map((data: any) => (
                                                        <p>
                                                            신고유저Id :&nbsp;
                                                            {data.defendantUserId}
                                                            &nbsp;&nbsp;&nbsp; 사유 :&nbsp;
                                                            {data.reason}
                                                        </p>
                                                    ))}
                                                </Panel>
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
