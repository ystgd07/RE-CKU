import React from 'react';
import { Card, List, Switch, Button, Divider } from 'antd';
import axios from 'axios';
const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 5',
    },
    {
        title: 'Title 6',
    },
    {
        title: 'Title 6',
    },
    {
        title: 'Title 6',
    },
];
let matchData: [];
const token = localStorage.getItem('accessToken');

const getMentoReq = async () => {
    try {
        const res = await axios.get('users/req', {
            headers: { authorization: `Bearer ${token}` },
        });
        const data = await res.data;
        matchData = await data.data;
        console.log(matchData);
    } catch (e) {
        console.log(e);
    }
};

export const Proofread = () => {
    getMentoReq();
    return (
        <div
            style={{
                marginLeft: '20px',
                marginRight: '20px',
                height: '80%',
                marginBottom: '20px',
            }}
        >
            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row-reverse' }}>
                <Switch defaultChecked />
            </div>
            <Divider orientation="left" orientationMargin="0">
                <p style={{ fontWeight: 'bold' }}>요청 ({data.length})</p>
            </Divider>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={matchData}
                renderItem={item => (
                    <List.Item style={{ background: 'white' }}>
                        <Card
                            style={{
                                cursor: 'pointer',
                                border: ' solid #dbdbdb',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                            }}
                            title={matchData}
                            extra={
                                <div>
                                    <Button style={{ marginRight: '10px' }}>수락하기</Button>

                                    <Button>취소</Button>
                                </div>
                            }
                        >
                            Card content
                        </Card>
                    </List.Item>
                )}
            />
            <Divider orientation="left" orientationMargin="0">
                <p style={{ fontWeight: 'bold' }}>진행중 ({data.length})</p>
            </Divider>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={matchData}
                renderItem={item => (
                    <List.Item style={{ background: 'white' }}>
                        <Card
                            style={{
                                cursor: 'pointer',
                                border: ' solid #dbdbdb',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                            }}
                            title={matchData}
                            extra={
                                <div>
                                    <Button style={{ marginRight: '10px' }}>수락하기</Button>

                                    <Button>취소</Button>
                                </div>
                            }
                        >
                            Card content
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};
