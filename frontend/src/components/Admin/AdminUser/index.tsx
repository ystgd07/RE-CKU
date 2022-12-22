import React, { useEffect, useState } from 'react';
import {
    Layout,
    Avatar,
    theme,
    Input,
    Typography,
    List,
    Switch,
    Col,
    Row,
    Skeleton,
    Divider,
} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import styled from '@emotion/styled';
const { Content } = Layout;
const { Search } = Input;
const { Paragraph } = Typography;

const BorderDiv = styled.div`
    width: 90%;
    max-width: 1280px;
    margin: 0 0 10px 0;
    padding: 10px;
    border: 2px solid #3e3939cb;
    border-radius: 10px;
    box-sizing: border-box;
    flex-wrap: wrap;
    background-color: #ffffffc1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & h3 {
        margin: 10px 10px;
    }
    & div {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        & div {
            display: flex;
            flex-direction: row;
        }
    }

    @media (max-width: 640px) {
        display: flex;
        flex-direction: column;
        & div {
            display: flex;
            flex-direction: column;
            & div {
                display: flex;
                flex-direction: column;
            }
        }
    }
`;
interface userDataRes {
    avatarUrl: string;
    created: string;
    id: number;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
    point: number;
    active: number;
    clickedLikes: number;
    howToLogin: string;
}

const AdminContent: React.FC = () => {
    const [userData, setUserData] = useState<userDataRes[]>([]);
    const [searchEmail, setSearchEmail] = useState('');

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    async function getId() {
        try {
            const res = await axios.get(`/admin/user-list`);
            console.log('😀');
            console.log(res.data.data);
            setUserData(res.data.data);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getId();
    }, []);

    // const onSearchUser = userData.filter((userData: any) => {
    //     console.log(userData.email.toLowerCase().includes(searchEmail.toLowerCase()));
    //     // return userData.email.toLowerCase().includes(searchEmail.toLowerCase());
    //     return userData.email.includes('a');
    // });

    // function onSearchUser() {
    //     const searchUser = userData.filter(userData => userData.email.includes('ap'));
    //     return searchUser;
    // }
    return (
        <>
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                }}
            >
                <div style={{ display: 'flex' }}>
                    <Typography.Title level={1} style={{ margin: '10px' }}>
                        회원관리
                    </Typography.Title>
                </div>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Row gutter={10}>
                        <Col span={50}>
                            <Search
                                placeholder="검색할 이메일을 입력해주세요"
                                // onSearch={onSearchUser()}
                                enterButton
                                onChange={e => {
                                    setSearchEmail(e.target.value);
                                }}
                                value={searchEmail}
                            />
                        </Col>
                    </Row>
                </div>

                <br />
                {/* <InfiniteScroll
                    dataLength={userData.length}
                    next={userData}
                    hasMore={userData.length < 50}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                > */}
                <List
                    itemLayout="horizontal"
                    dataSource={userData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={'https://joeschmoe.io/api/v1/random'} />}
                                title={
                                    <>
                                        {item.email}/{item.username}
                                    </>
                                }
                                description={
                                    <div
                                        style={{ display: 'flex', justifyContent: 'space-between' }}
                                    >
                                        <div>
                                            <Typography.Title
                                                level={5}
                                                style={{ margin: '0.1rem' }}
                                            >
                                                로그인 방법 : {item.howToLogin}
                                            </Typography.Title>
                                            <div style={{ display: 'flex' }}>
                                                <Typography.Title
                                                    level={5}
                                                    style={{ margin: '0.1rem' }}
                                                >
                                                    point :
                                                </Typography.Title>
                                                <Row gutter={8}>
                                                    <Col span={15}>
                                                        <Search
                                                            style={{ margin: '0.2rem' }}
                                                            placeholder={String(item.point)}
                                                            allowClear
                                                            enterButton="change"
                                                            size="small"
                                                            // onSearch={onSearch}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div>
                                            활동 :
                                            <Switch
                                                checked={item.active == 1 ? true : false}
                                                // onChange={onChangeActive}
                                                size="small"
                                            />
                                        </div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
                {/* </InfiniteScroll> */}
            </Content>
        </>
    );
};

export default AdminContent;
