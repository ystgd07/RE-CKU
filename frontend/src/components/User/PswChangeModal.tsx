import React, { useRef, useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import API from 'utils/api';

export const PswChangeModal: React.FC = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [newPass, setNewPass] = useState(''); //input1
    const [checkPass, setCheckPass] = useState(''); //input2
    const [valid, setValid] = useState(false);
    const [modalText, setModalText] = useState('비밀번호를 변경하시겠습니까?');
    const [loading, setLoading] = useState(false);
    const passRef: any = useRef();
    const newPassRef: any = useRef();

    const onReset = () => {
        form.resetFields();
    };

    const showModal = () => {
        setOpen(true);
        setValid(true);
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const patchNewPass = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const res = await axios.patch(
                `${API.BASE_URL}/users/individuals`,
                { password: `${newPassRef.current.input.value}` },
                { headers: { authorization: `Bearer ${token}` } },
            );
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    const handleOk = (e: any) => {
        setLoading(true);
        setModalText('잠시만 기다려 주세요 ^^.');
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            patchNewPass();
            onFinish(1);
            setCheckPass('');
            setNewPass('');
            onReset();
        }, 1000);
    };

    const handleCancel = () => {
        onReset();
        setCheckPass('');
        setNewPass('');
        setOpen(false);
    };

    const newPasswordChange = (e: any) => {
        setNewPass(e.target.value);
        if (
            newPass.trim() === '' ||
            passRef.current.input.value !== newPassRef.current.input.value
        ) {
            setValid(true);
        }
        if (checkPass !== '') {
            if (passRef.current.input.value === newPassRef.current.input.value) setValid(false);
            else console.log('no correct');
        }
    };

    const checkPasswordChnage = (e: any) => {
        setCheckPass(e.target.value);
        if (
            newPass.trim() === '' ||
            passRef.current.input.value !== newPassRef.current.input.value
        ) {
            setValid(true);
        }
        if (checkPass !== '') {
            if (passRef.current.input.value === newPassRef.current.input.value) setValid(false);
            else console.log('no correct');
        }
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                비밀번호 변경
            </Button>
            <Modal
                title="비밀번호 변경"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: valid }}
                confirmLoading={loading}
            >
                <Form form={form} name="control-hooks">
                    <Form.Item
                        name="newpassword"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        style={{ marginBottom: '5px' }}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="새비밀번호"
                            onChange={newPasswordChange}
                            ref={passRef}
                        />
                    </Form.Item>
                    <Form.Item
                        name="checkpassword"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        style={{ marginBottom: '5px' }}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="비밀번호확인"
                            onChange={checkPasswordChnage}
                            ref={newPassRef}
                        />
                    </Form.Item>
                </Form>

                {valid && <p>비밀번호가 일치하지 않습니다!</p>}
            </Modal>
        </>
    );
};
