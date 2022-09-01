import React, { useEffect, useRef, useState } from 'react';
import './MapPage.less'
import { runScript } from './MapUtils'
import { Modal } from 'antd'


export const MapPage = () => {
    const [bbox, setBbox] = useState([])
    const [imgSize, setImgSize] = useState([])
    const [showReqForm, setShowReqForm] = useState(false)

    useEffect(() => {
        runScript(setShowReqForm, setBbox, setImgSize)
    }, [])

    useEffect(() => {
        console.log(bbox, imgSize, showReqForm)
    }, [bbox, imgSize, showReqForm])


    return (<>
        <div className='screen'>
            <div id='map' />
            <div id='top-map' className='top-map'>
                <div id='layer-0' className='button'>Show Layer 0</div>
                <div id='layer-1' className='button'>Show Layer 1</div>
            </div>
        </div>
        <Modal
            centered={true}
            visible={showReqForm}
            zIndex={3}
            width="400"
            onCancel={() => setShowReqForm(false)}
            onOk={() => setShowReqForm(false)}
        >
        </Modal>
    </>
    )
}