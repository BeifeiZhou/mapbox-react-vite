import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'
import './MapDisplay.less'
import { runScript } from './utils'



export const MapDisplay = () => {
    useEffect(() => {
        runScript()
    })

    return <div className='screen' id='map'>
    </div>
}