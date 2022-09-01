import React, { useEffect, useState } from "react";
import { Modal } from 'antd'

export const Profile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log('this is my book')
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        console.log('Profile useEffect')
        console.log(isModalVisible)
    } , [])
    return <div>
        <button onClick={() => showModal()}>show modal</button>
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    </div>;
}