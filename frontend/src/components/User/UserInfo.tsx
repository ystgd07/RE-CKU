import React, { useState } from 'react';
import {
    FacebookOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    YoutubeOutlined,
    GithubOutlined,
} from '@ant-design/icons';
import { Descriptions, Tag, Modal } from 'antd';
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
};

type UserProps = {
    user: Mock;
};

const anytype: any = null;
const token = localStorage.getItem('accessToken');
export const UserInfo = ({ user }: UserProps) => {
    let { username, phoneNumber, email, gitHubUrl } = user;
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
            <Descriptions title="User Info">
                <Descriptions.Item label="UserName">{username}</Descriptions.Item>
                <Descriptions.Item label="Telephone">{phoneNumber}</Descriptions.Item>

                <Descriptions.Item label="email">{email}</Descriptions.Item>
            </Descriptions>
            <Tag icon={<GithubOutlined />} color="black">
                <a
                    href={gitHubUrl}
                    onClick={() => {
                        if (gitHubUrl === null) setPropsOpen(true);
                    }}
                >
                    Github
                </a>
            </Tag>
            <GitHubModal
                open={propsOpen}
                changeOpen={changeOpen}
                updateGitURL={updateGitURL}
            ></GitHubModal>
            <InfoModal></InfoModal>
        </>
    );
};
