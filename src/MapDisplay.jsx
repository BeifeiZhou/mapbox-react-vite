import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'
import './MapDisplay.less'
import { runScript } from './utils'



export const MapDisplay = () => {
    const [bbox, setBbox] = useState([])
    const [imgSize, setImgSize] = useState([])
    useEffect(() => {
        runScript(setBbox, setImgSize)
    })

    return <div className='screen' id='map'>
    </div>
}