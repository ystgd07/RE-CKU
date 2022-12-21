import React from 'react';
import {
    FacebookOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    YoutubeOutlined,
    GithubOutlined,
} from '@ant-design/icons';
import { Descriptions, Tag } from 'antd';
import { InfoModal } from './InfoModal';
type Mock = {
    // id: string;
    email: string;
    // password: string;
    phoneNumber: string;
    // point: number;
    username: string;
    // created: string;
    // avatarUrl: string;
};

type UserProps = {
    user: Mock;
};

export const UserInfo = ({ user }: UserProps) => {
    const { username, phoneNumber, email } = user;

    return (
        <>
            <Descriptions title="User Info">
                <Descriptions.Item label="UserName">{username}</Descriptions.Item>
                <Descriptions.Item label="Telephone">{phoneNumber}</Descriptions.Item>

                <Descriptions.Item label="email">{email}</Descriptions.Item>
            </Descriptions>
            <Tag icon={<GithubOutlined />} color="black">
                <a href="https://github.com/taggon/ryan-login">Github</a>
            </Tag>
            <InfoModal></InfoModal>
        </>
    );
};
