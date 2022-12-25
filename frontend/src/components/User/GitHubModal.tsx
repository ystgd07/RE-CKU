import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
const GitHubModal = (props: any) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    console.log(props.open, '여기는 프롭스공간');

    const showModal = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (props.open) setOpen(prev => !prev);
    }, [props.open]);

    const handleOk = (e: any) => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            props.changeOpen();
        }, 2000);
    };

    const handleCancel = (e: any) => {
        setOpen(false);
        props.changeOpen();
    };
    return (
        <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            maskClosable={false}
            keyboard={false}
            closable={false}
        >
            <input type="url"></input>
        </Modal>
    );
};

export default GitHubModal;
