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

export const UserInfo = ({ user }: UserProps) => {
    const { username, phoneNumber, email, gitHubUrl } = user;
    const [propsOpen, setPropsOpen] = useState(false);
    const changeOpen = () => {
        setPropsOpen(prev => !prev);
    };
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
                        console.log(propsOpen);
                    }}
                >
                    Github
                </a>
            </Tag>
            <GitHubModal open={propsOpen} changeOpen={changeOpen}></GitHubModal>
            <InfoModal></InfoModal>
        </>
    );
};
