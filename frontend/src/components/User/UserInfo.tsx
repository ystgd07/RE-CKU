import React, { useState } from 'react';
import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { Descriptions, Tag, Col, Row, Button, Badge } from 'antd';
import { InfoModal } from './InfoModal';
import GitHubModal from './GitHubModal';
import { UserDelete } from './UserDelete';
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
                {' '}
                <UserOutlined></UserOutlined>
                <Descriptions title="User Info" size="middle" bordered={true}>
                    <Descriptions.Item
                        label="UserName"
                        contentStyle={{ fontWeight: '500', fontSize: '1.5rem' }}
                        labelStyle={{ fontWeight: '600', fontSize: '1.5rem' }}
                    >
                        {username}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="Telephone"
                        contentStyle={{ fontWeight: '500', fontSize: '1.5rem' }}
                        labelStyle={{ fontWeight: '600', fontSize: '1.5rem' }}
                    >
                        {phoneNumber
                            .replace(/[^0-9]/g, '')
                            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="email"
                        contentStyle={{ fontWeight: '500', fontSize: '1.5rem' }}
                        labelStyle={{ fontWeight: '600', fontSize: '1.5rem' }}
                    >
                        {email}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="gitHub"
                        contentStyle={{ fontWeight: '500', fontSize: '1.5rem' }}
                        labelStyle={{ fontWeight: '600', fontSize: '1.5rem' }}
                    >
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
                    <Descriptions.Item
                        label="gitHub Url 수정"
                        contentStyle={{ fontWeight: '500', fontSize: '1.5rem' }}
                        labelStyle={{ fontWeight: '600', fontSize: '1.5rem' }}
                    >
                        <Button
                            icon={<GithubOutlined />}
                            type="primary"
                            style={{ backgroundColor: 'black' }}
                            onClick={() => {
                                setPropsOpen(true);
                            }}
                        >
                            GitHub Url 변경
                        </Button>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="비밀번호 변경"
                        contentStyle={{ fontWeight: '500', fontSize: '1.5rem' }}
                        labelStyle={{ fontWeight: '600', fontSize: '1.5rem' }}
                    >
                        <InfoModal></InfoModal>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label="회원탈퇴"
                        contentStyle={{ fontWeight: '500', fontSize: '1.5rem' }}
                        labelStyle={{ fontWeight: '600', fontSize: '1.5rem' }}
                    >
                        <UserDelete></UserDelete>
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
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
                <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
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
