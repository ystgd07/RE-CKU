import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Tooltip, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
const GitHubModal = (props: any) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const githubUrlRef: any = useRef();

    const showModal = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (props.open) setOpen(prev => !prev);
    }, [props.open]);

    const handleOk = async (e: any) => {
        setConfirmLoading(true);
        await props.updateGitURL(githubUrlRef.current.input.value);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            props.changeOpen();
            props.getEvent();
        }, 1000);
    };

    const handleCancel = (e: any) => {
        setOpen(false);
        githubUrlRef.current.input.value = '';
        props.changeOpen();
    };
    return (
        <Modal
            title="GitHub URL 변경"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            maskClosable={false}
            keyboard={false}
            closable={false}
        >
            <Input style={{ width: 'calc(100% - 200px)' }} ref={githubUrlRef} />
            <Tooltip title="copy git url">
                <Button icon={<CopyOutlined />} />
            </Tooltip>
        </Modal>
    );
};

export default GitHubModal;
