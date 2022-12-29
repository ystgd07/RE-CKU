import React, { useState, useEffect } from 'react';
import { Col, Row, Slider, Modal, List, Alert } from 'antd';
import axios from 'axios';
import { Title, MobileDiv } from './style';
import './style.css';
import API from 'utils/api';
import Header from 'components/Header';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import Layout from 'components/Layout';

interface data {
    corrections: number;
    id: number;
    username: string;
    point: number;
}
interface myData {
    avatarUrl: string;
    chance: number;
    clickedLikes: 1;
    created: string;
    email: string;
    gitHubUrl: string;
    howToLogin: string;
    id: number;
    matching: number;
    phoneNumber: string;
    point: number;
    role: string;
    username: string;
    working: number;
}

const Match = () => {
    const [modalIdContent, setModalIdContent] = useState<number | string>();
    const [modalUserNameContent, setModalUserNameContent] = useState<number | string>('');
    const [modalPointContent, setModalPointContent] = useState<number | string>();
    const [data, setData] = useState<data[]>([]);
    const [myData, setMyData] = useState<myData>();
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

    async function getMyData() {
        try {
            const res = await API.get(`/users/individuals`);
            console.log(res);
            setMyData(res);
            getPoint(res);
        } catch (e) {
            console.log(e);
        }
    }

    async function getPoint(res: myData) {
        console.log(res);
        if (res.point <= 49) {
            alert(`포인트가 50 이상 필요합니다.(내 포인트 : ${res.point} point)`);
            navigate('/');
        } else {
            getMatching();
        }
    }

    useEffect(() => {
        getMyData();
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
        <Layout>
            <Title className="title">
                <h1>이력서 첨삭 매칭</h1>
            </Title>
            <MobileDiv>
                <Row gutter={[0, 0]}>
                    {data.map((data: any) => (
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
                                {/* <div><img src=""></img></div> */}
                            </div>
                        </Col>
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
                            <strong>등급 :</strong> {modalPointContent}
                        </p>
                        <p>
                            <strong>부탁건수 : </strong>20회
                        </p>
                    </Modal>
                </Row>
            </MobileDiv>
        </Layout>
    );
};

export default Match;
