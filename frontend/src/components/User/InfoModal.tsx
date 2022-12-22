import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
export const InfoModal: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [newPass, setNewPass] = useState('');
    const [checkPass, setCheckPass] = useState('');

    const [modalText, setModalText] = useState('비밀번호를 변경하시겠습니까?');
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const handleOk = () => {
        setLoading(true);
        setModalText('잠시만 기다려 주세요 ^^.');
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            setModalText('비밀번호를 변경하시겠습니까?');
            onFinish(1);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    //FIXME: e:any-> 이부분 이벤트 타입 검색해서 수정하자!
    const newPasswordChange = (e: any) => {
        setNewPass(e.target.value);
        console.log(newPass);
    };
    const checkPasswordChnage = (e: any) => {
        setCheckPass(e.target.value);
        console.log(checkPass);
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
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        취소
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        확인
                    </Button>,
                ]}
            >
                <Form>
                    <Form.Item
                        name="newpassword"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="새비밀번호"
                            onChange={newPasswordChange}
                        />
                    </Form.Item>
                    <Form.Item
                        name="checkpassword"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="비밀번호확인"
                            onChange={checkPasswordChnage}
                        />
                    </Form.Item>
                </Form>

                <p>{modalText}</p>
            </Modal>
        </>
    );
};
