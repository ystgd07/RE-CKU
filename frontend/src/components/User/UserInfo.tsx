import React, { useState } from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { Descriptions, Tag, Col, Row, Button } from 'antd';
import { InfoModal } from './InfoModal';
import GitHubModal from './GitHubModal';
import axios from 'axios';

type Mock = {
    // id: string;
    email: string;
    // password: string;
    phoneNumber: string;
    // point: number;
    username: string;
    // created: string;
    // avatarUrl: string;
    gitHubUrl: string;
    tierColor: string;
};

type UserProps = {
    user: Mock;
    getEvent: Function;
};

const anytype: any = null;
const token = localStorage.getItem('accessToken');
export const UserInfo = ({ user, getEvent }: UserProps) => {
    let { username, phoneNumber, email, gitHubUrl, tierColor } = user;
    const [propsOpen, setPropsOpen] = useState(false);

    const changeOpen = () => {
        setPropsOpen(prev => !prev);
    };

    const updateGitURL = (gitURl: any) => {
        gitHubUrl = gitURl;
        try {
            const res = axios.patch(
                '/users/individuals',
                { gitHubUrl: `${gitURl}` },
                {
                    headers: { authorization: `Bearer ${token}` },
                },
            );
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };
    // { avatarUrl: `${res.data.imageUrl}` },
    // { headers: { authorization: `Bearer ${token}` } },
    return (
        <>
            <div
                style={{
                    marginLeft: '20px',
                    marginRight: '20px',
                    height: '80%',
                    marginBottom: '20px',
                }}
            >
                <Descriptions title="User Info">
                    <Descriptions.Item label="UserName">{username}</Descriptions.Item>
                    <Descriptions.Item label="Telephone">{phoneNumber}</Descriptions.Item>

                    <Descriptions.Item label="email">{email}</Descriptions.Item>
                    <Descriptions.Item label="gitHub">
                        <Tag
                            icon={<GithubOutlined />}
                            color="black"
                            style={{ marginLeft: '12px', marginRight: '12px' }}
                        >
                            <a
                                href={gitHubUrl}
                                onClick={() => {
                                    if (gitHubUrl === null) setPropsOpen(true);
                                }}
                            >
                                Github
                            </a>
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            </div>

            <Row
                style={{
                    marginTop: '20%',
                    marginLeft: '12px',
                    marginRight: '12px',
                    height: '120px',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <Button
                        icon={<GithubOutlined />}
                        type="primary"
                        style={{ backgroundColor: 'black', position: 'static' }}
                        onClick={() => {
                            setPropsOpen(true);
                        }}
                    >
                        GitHub Url 변경
                    </Button>
                </Col>
                <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                    <InfoModal></InfoModal>
                </Col>
            </Row>

            <GitHubModal
                open={propsOpen}
                changeOpen={changeOpen}
                updateGitURL={updateGitURL}
                getEvent={getEvent}
            ></GitHubModal>
        </>
    );
};
