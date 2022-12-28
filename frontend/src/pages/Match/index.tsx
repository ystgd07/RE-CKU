import React, { useState, useEffect } from 'react';
import { Col, Row, Slider, Modal, List } from 'antd';
import axios from 'axios';
import * as S from './style';
import './index.css';
import API from 'utils/api';
import Header from 'components/Header';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

interface data {
    corrections: number;
    id: number;
    username: string;
    point: number;
}

const Match = () => {
    const [modalIdContent, setModalIdContent] = useState<number | string>();
    const [modalUserNameContent, setModalUserNameContent] = useState<number | string>('');
    const [modalPointContent, setModalPointContent] = useState<number | string>();
    const [data, setData] = useState<data[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    async function getMatching() {
        try {
            const res = await API.get(`/users/rots`);
            console.log('res', res);
            if (res.matchInfo) {
                navigate('/matched');
            } else {
                setData(res);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function postMatching() {
        try {
            const rotId = modalIdContent;
            console.log(rotId);
            const res = await API.post(`/users/match`, { rotId });
            console.log(res);
            getMatching();
            setModalOpen(false);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getMatching();
    }, []);

    const onClickModal = async (data: any) => {
        const id = data.id;
        const userName = data.username;
        const point = data.point;

        setModalIdContent(id);
        setModalUserNameContent(userName);
        setModalPointContent(point);

        setModalOpen(true);
    };

    return (
        <>
            <Header />
            <h1>이력서 첨삭 매칭</h1>
            <S.MobileDiv>
                <Row gutter={[0, 0]}>
                    {data.map((data: any) => (
                        <>
                            <Col span={12} key={data.id} className="col">
                                <div className="div" onClick={() => onClickModal(data)}>
                                    <div>
                                        <h3>{data.username}</h3>
                                        <p>
                                            <strong>등급 : </strong>
                                            {data.point}
                                        </p>
                                        <p>
                                            <strong>부탁건수 : </strong>
                                            {data.corrections}회
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </>
                    ))}
                    <Outlet />
                    <Modal
                        title={
                            <h1>
                                {modalUserNameContent}({modalIdContent})
                            </h1>
                        }
                        centered
                        cancelText="싫어요"
                        okText={`부탁할래요(50point)`}
                        open={modalOpen}
                        onOk={() => postMatching()}
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
