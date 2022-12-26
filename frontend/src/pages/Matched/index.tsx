import React, { useState, useEffect } from 'react';
import { Col, Row, Slider, Modal, List } from 'antd';
import axios from 'axios';
import * as S from './style';
import API from 'utils/api';
import Header from 'components/Header';
import { Link, useNavigate } from 'react-router-dom';

interface data {
    email: string;
    matchingId: number;
    rotId: number;
    step: string;
    username: string;
}

const Matched = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<data>();

    async function getMatching() {
        try {
            const res = await API.get(`/users/rots`);
            console.log(res.matchInfo);
            if (res.matchInfo) {
                setData(res.matchInfo);
            } else {
                navigate('/match');
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getMatching();
    }, []);
    return (
        <>
            <Header />

            <S.MobileDiv>
                <S.H1>요청중인매칭</S.H1>
                <div>
                    <h3>
                        {data?.username}({data?.email})
                    </h3>
                    <p>
                        <strong>부탁건수 : </strong>
                        {/* {data?.rotId}회 */}
                    </p>
                    <p>
                        <strong>상태 :</strong>
                        {data?.step}
                    </p>
                </div>
            </S.MobileDiv>
        </>
    );
};

export default Matched;
