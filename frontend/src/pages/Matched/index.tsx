import React, { useState, useEffect } from 'react';
import { Col, Row, Slider, Modal, List, Button, Popconfirm } from 'antd';
import axios from 'axios';
import * as S from './style';
import API from 'utils/api';
import Header from 'components/Header';
import { Link, useNavigate } from 'react-router-dom';

interface data {
    created: string;
    matchingId: number;
    menteeId: number;
    mentoEmail: string;
    mentoId: number;
    mentoName: string;
    point: number;
    rotId: number;
    step: string;
}

const Matched = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<data>();
    const [step, setStep] = useState();
    const [matchingId, setMatchingId] = useState();

    async function getMatching() {
        try {
            const res = await API.get(`/users/rots`);
            if (res.matchInfo) {
                setData(res.matchInfo);
                setStep(res.matchInfo.step);
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

    async function calcelMatching(matchingId: number) {
        const data = { matchingId };
        const token = localStorage.getItem('accessToken');
        try {
            const res = await axios({
                method: 'delete',
                url: `${API.BASE_URL}/users/match`,
                data: {
                    matchingId,
                },
                headers: { authorization: `Bearer ${token}` },
            });
            navigate('/match');
        } catch (e) {
            console.log(e);
        }
    }
    async function complateMatching(matchingId: number, mentee: string) {
        const data = { matchingId, role: mentee };
        try {
            const res = await API.post(`/users/match/success`, data);
            navigate('/match');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Header />

            <S.MobileDiv>
                <S.H1>??????????????????</S.H1>
                <div>
                    <h3 style={{ textAlign: 'center' }}>{data?.mentoName}</h3>
                    <S.P>
                        <strong>????????? :</strong>
                        {data?.mentoEmail}
                    </S.P>
                    <S.P>
                        <strong>?????? :</strong>
                        {data?.step}
                    </S.P>
                    <S.P>
                        <strong>???????????? :</strong>
                        {data?.created}
                    </S.P>
                    {step === '?????????' ? (
                        <Popconfirm
                            title="?????? ?????????????????????????"
                            onConfirm={() => {
                                calcelMatching(Number(data?.matchingId));
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" style={{ margin: '10px' }}>
                                ?????? ????????????
                            </Button>
                        </Popconfirm>
                    ) : (
                        <Button
                            // type="primary"
                            style={{ margin: '10px' }}
                            onClick={() => {
                                complateMatching(Number(data?.matchingId), 'mentee');
                            }}
                        >
                            ?????? ?????????
                        </Button>
                    )}
                </div>
            </S.MobileDiv>
        </>
    );
};

export default Matched;
