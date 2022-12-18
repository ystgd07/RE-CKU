import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// // import * as S from './style';
// import Logo from 'assets/images/iogo.png';

// const Admin = () => {
//     return (
//         <S.MobileDiv>
//             <S.TitleDiv>dsada</S.TitleDiv>
//         </S.MobileDiv>
//     );
// };

// export default Admin;

// import React from 'react';
// import './index.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['Admin'].map(key => ({
    key,
    label: `${key}`,
}));

//UserOutlined 아이콘 이름
//import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'; 요기서 가져옴

const items2: MenuProps['items'] = [UserOutlined].map((icon, index) => {
    //nav 바 메뉴 [UserOutlined] 갯수랑 const key = ['회원관리']; 갯수랑 같아야함
    const key = ['회원관리'];
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `${key[index]}`,

        children: new Array(4).fill(null).map((_, j) => {
            const subtitle = ['관리1', '관리2', '관리3', '관리4'];
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
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>회원관리</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        내용
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;
