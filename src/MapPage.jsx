import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'
import './MapPage.less'
import { runScript } from './MapUtils'



export const MapPage = () => {
    const [bbox, setBbox] = useState([])
    const [imgSize, setImgSize] = useState([])
    useEffect(() => {
        runScript(setBbox, setImgSize)
    }, [])

    useEffect(() => {
        console.log(bbox, imgSize)
    }, [bbox, imgSize])

    return <div className='screen'>
        <div id='map'/>
        {/* <div className='top-map'>
            <div className='sidebar'>9</div>
        </div> */}
    </div>
}