import React, { useRef, useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API from 'utils/api';

const token = localStorage.getItem('accessToken');

export const UserDelete: React.FC = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const onReset = () => {
        form.resetFields();
    };
    const showModal = () => {
        setOpen(true);
    };
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const deleteUserInfo = async () => {
        try {
            const res = await axios.patch(`${API.BASE_URL}/users/off`, '', {
                headers: { authorization: `Bearer ${token}` },
            });
            if (res.status === 200) {
                window.localStorage.clear();
                navigate('/');
            }
        } catch (e) {
            console.log(e);
        }
    };
    const handleOk = (e: any) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            deleteUserInfo();
            onFinish(1);
            onReset();
        }, 1000);
    };

    const handleCancel = () => {
        onReset();
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal} danger>
                회원탈퇴
            </Button>
            <Modal
                // TODO: {...==='passwordChange'?title='비밀번호 변경':title='회원탈퇴'}->재사용 참고 로직
                title="회원탈퇴"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
                okType="danger"
            >
                {<p>정말로 탈퇴하시겠습니까?(복구 불가능!!)</p>}
            </Modal>
        </>
    );
};
