import React from 'react';
import { Layout, theme } from 'antd';
const { Content } = Layout;

const AdminUser: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            글
        </Content>
    );
};

export default AdminUser;
