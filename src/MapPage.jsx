import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'
import './MapPage.less'
import { runScript } from './MapUtils'


export const MapPage = () => {
    const [bbox, setBbox] = useState([])
    const [imgSize, setImgSize] = useState([])
    const [addLayer, setAddLayer] = useState(true)
    useEffect(() => {
        runScript(addLayer, setBbox, setImgSize)
    }, [])

    useEffect(() => {
        console.log(bbox, imgSize)
    }, [bbox, imgSize])

    return <div className='screen'>
        <div id='map' />
        <div id='top-map' className='top-map'>
            <div id='layer-0' className='button'>Show Layer 0</div>
            <div id='layer-1' className='button'>Show Layer 1</div>
        </div>
    </div>
}