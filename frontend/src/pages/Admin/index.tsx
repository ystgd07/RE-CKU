import React, { useState } from 'react';
// // import * as S from './style';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['Admin'].map(key => ({
    key,
    label: `${key}`,
}));

const a = [
    {
        name: 'Hayes Montoya',
        email: 'undefined',
        phone: 'undefined',
    },
    {
        name: 'Hayden Hale',
        email: 'undefined',
        phone: 'undefined',
    },
    {
        name: 'Drake Cantu',
        email: 'undefined',
        phone: 'undefined',
    },
    {
        name: 'Carissa Peters',
        email: 'undefined',
        phone: 'undefined',
    },
    {
        name: 'Clayton Randolph',
        email: 'undefined',
        phone: 'undefined',
    },
];

const items2: MenuProps['items'] = [UserOutlined].map((icon, index) => {
    //nav 바 메뉴 [UserOutlined] 갯수랑 const key = ['회원관리']; 갯수랑 같아야함
    const key = ['회원관리'];

    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `${key[index]}`,

        children: new Array(4).fill(null).map((_, j) => {
            const subtitle = ['user', '관리2', '관리3', '관리4'];

            return {
                label: `${subtitle[j]}`,
            };
        }),
    };
});

const App: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // const changeapage = () => {
    //     console.log('dd');
    // };

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                        // onClick={changeapage()}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>회원관리</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ display: 'flex', margin: '30px' }}>
                        <Input placeholder="Basic usage" />
                        <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                    </div>
                    {a.map((e: any) => (
                        <Content
                            key={e.id}
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 50,
                                background: colorBgContainer,
                            }}
                        >
                            {e.name}
                        </Content>
                    ))}
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;
