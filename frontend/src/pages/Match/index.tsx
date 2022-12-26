import React, { useState, useEffect } from 'react';
import { Col, Row, Slider, Modal, List } from 'antd';
import axios from 'axios';
import * as S from './style';
import './index.css';
import Header from 'components/Header';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface data {
    id: number;
    userName: string;
    point: number;
}
const Match = () => {
    const [modalIdContent, setModalIdContent] = useState<number | string>();
    const [modalUserNameContent, setModalUserNameContent] = useState<number | string>('');
    const [modalPointContent, setModalPointContent] = useState<number | string>();
    const [modalOpen, setModalOpen] = useState(false);

    const onClickModal = async (data: data) => {
        const id = data.id;
        const userName = data.userName;
        const point = data.point;

        setModalIdContent(id);
        setModalUserNameContent(userName);
        setModalPointContent(point);

        setModalOpen(true);
    };

    const user = [
        {
            id: 1,
            userName: '우디르',
            point: 500,
        },
        {
            id: 2,
            userName: '리신',
            point: 600,
        },
        {
            id: 3,
            userName: '게롤트',
            point: 700,
        },
        {
            id: 4,
            userName: '부커',
            point: 800,
        },
    ];
    return (
        <>
            <Header />
            <h1>이력서 첨삭 매칭</h1>
            <S.MobileDiv>
                <Row gutter={[0, 0]}>
                    {user.map((data: any) => (
                        <>
                            <Col span={12} key={data.id}>
                                <div onClick={() => onClickModal(data)}>
                                    <div>
                                        {/* <Link to="/match/modal"> */}
                                        <p>{data.userName}</p>
                                        <p>
                                            <strong>등급 : </strong>다이아
                                        </p>
                                        <p>
                                            <strong>부탁건수 : </strong>20회
                                        </p>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </Col>
                        </>
                    ))}
                    <Outlet />
                    <Modal
                        title={<h1>{modalUserNameContent}</h1>}
                        centered
                        cancelText="싫어요"
                        okText={`부탁할래요(point)`}
                        open={modalOpen}
                        onOk={() => setModalOpen(false)}
                        onCancel={() => setModalOpen(false)}
                    >
                        <hr />
                        <p>
                            <strong>{modalUserNameContent}</strong>님께 이력서 첨삭 부탁하기
                        </p>
                        <p>
                            <strong>등급 : </strong>다이아
                        </p>
                        <p>
                            <strong>부탁건수 : </strong>20회
                        </p>
                    </Modal>
                    {/* <List
                        grid={{ gutter: 16, column: 12 }}
                        dataSource={user}
                        renderItem={user => (
                            <List.Item>
                                <Col span={12} key={user.id}>
                                    <div onClick={() => onClickModal(user)}>
                                        <div>{user.id}</div>
                                    </div>
                                </Col>
                                <Modal
                                    title={<h1>{user.id}</h1>}
                                    centered
                                    cancelText="싫어요"
                                    okText={`부탁할래요(${user.point}point)`}
                                    open={modalOpen}
                                    onOk={() => setModalOpen(false)}
                                    onCancel={() => setModalOpen(false)}
                                >
                                    <hr />
                                    <p>
                                        <strong>{user.userName}</strong>님께 이력서 첨삭 부탁하기
                                    </p>
                                    <p>
                                        <strong>등급 : </strong>다이아
                                    </p>
                                    <p>
                                        <strong>부탁건수 : </strong>20회
                                    </p>
                                </Modal>
                            </List.Item>
                        )}
                    /> */}
                </Row>
            </S.MobileDiv>
        </>
    );
};

export default Match;
