import React from 'react';
import { Descriptions } from 'antd';
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
        <Descriptions title="User Info">
            <Descriptions.Item label="UserName">{username}</Descriptions.Item>
            <Descriptions.Item label="Telephone">{phoneNumber}</Descriptions.Item>

            <Descriptions.Item label="email">{email}</Descriptions.Item>
        </Descriptions>
    );
};
