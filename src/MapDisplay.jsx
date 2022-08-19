import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import "./mapbox-gl-geocoder.css";
import './MapDisplay.less'
import MapGL, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import Pin from './pin';
import CITIES from './data/cities.json';
import GeocoderControl from './geocoder-control';

export const MapDisplay = () => {
    const [popupInfo, setPopupInfo] = useState(null);
    const mapRef = useRef(null);
    const [bbox, setBbox] = useState([]);
    const [imgSize, setImgSize] = useState([]);

    const pins = useMemo(
        () =>
            CITIES.map((city, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}
                    anchor="bottom"
                    onClick={e => {
                        // If we let the click event propagates to the map, it will immediately close the popup
                        // with `closeOnClick: true`
                        e.originalEvent.stopPropagation();
                        setPopupInfo(city);
                    }}
                >
                    <Pin />
                    {/* <div>I am here!</div> */}
                </Marker>
            )),
        []
    );
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;


    const measure = (lat1, lon1, lat2, lon2) => {
        // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
        var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d * 1000; // meters
    }


    const getFromMap = () => {
        let bound = mapRef.current.getBounds();
        let top = bound._ne.lat;
        let bottom = bound._sw.lat;
        let left = bound._sw.lng;
        let right = bound._ne.lng;

        let imgWidth = document.querySelector(".mapboxgl-map").clientWidth;
        let imgHeight = document.querySelector(".mapboxgl-map").clientHeight;

        imgHeight = Math.round(measure(top, 1, bottom, 1));
        imgWidth = Math.round(measure(1, left, 1, right));

        setBbox([left, bottom, right, top]);
        setImgSize([imgWidth, imgHeight]);
        console.log('bbox: ', bbox)
        console.log('imgSize: ', imgSize)
    }


    return <div className='map-screen'>
        <div className='top-map'>
            <div className='sidebar' onClick={getFromMap}>zoom: 9</div>
        </div>
        <MapGL
            initialViewState={{
                latitude: 40,
                longitude: -100,
                zoom: 3.5,
                bearing: 0,
                pitch: 0
            }}
            ref={mapRef}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={mapboxgl.accessToken}
        >
            <GeocoderControl mapboxAccessToken={mapboxgl.accessToken} position="top-right" />
            <GeolocateControl position="top-left" />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <ScaleControl />
            {pins}
            {popupInfo && (
                <Popup
                    anchor="top"
                    longitude={Number(popupInfo.longitude)}
                    latitude={Number(popupInfo.latitude)}
                    onClose={() => setPopupInfo(null)}
                >
                    <div>
                        {popupInfo.city}, {popupInfo.state} |{' '}
                        <a
                            target="_new"
                            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                        >
                            Wikipedia
                        </a>
                    </div>
                    <img width="100%" src={popupInfo.image} />
                </Popup>
            )}
        </MapGL>
        {/* <ControlPanel className='control-panel'/> */}
    </div>
}