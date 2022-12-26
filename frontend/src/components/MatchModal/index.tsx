import React, { useState, useEffect } from 'react';
import { Col, Row, Slider, Modal, List } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface user {
    id?: number;
    userName?: string;
    point?: number;
}

const MatchModal = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(true);
    const [data, setData] = useState<user>();

    // let userData = sessionStorage.getItem('MatchModalData');
    // // userData = JSON.parse(userData);
    // console.log('userData', userData);

    // const modalClose = () => {
    //     localStorage.removeItem('MatchModalData');
    //     navigate('/match');
    // };

    return (
        <>
            {/* {userData.map((data: data) => ( */}
            {/* <Modal
                title={<h1>{userData?.id}</h1>}
                centered
                cancelText="싫어요"
                okText={'부탁할래요(point)'}
                open={modalOpen}
                onOk={() => navigate('/match')}
                onCancel={() => navigate('/match')}
            >
                <hr />
                <p>
                    <strong>{userData?.userName}</strong>님께 이력서 첨삭 부탁하기
                </p>
                <p>
                    <strong>등급 : </strong>다이아
                </p>
                <p>
                    <strong>부탁건수 : </strong>20회
                </p>
            </Modal> */}
            {/* ))} */}
        </>
    );
};

export default MatchModal;
