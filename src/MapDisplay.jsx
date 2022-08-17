import React, { useEffect, useRef, useState, useMemo } from 'react';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import './MapDisplay.less'
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import Pin from './pin';
import CITIES from './data/cities.json';
import ControlPanel from './ControlPanel';

export const MapDisplay = () => {
    const [popupInfo, setPopupInfo] = useState(null);

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


    return <div className='map-screen'>
        {/* <div className='top-map'>
            <div className='sidebar'>zoom: 9</div>
        </div> */}
        <Map
            initialViewState={{
                latitude: 40,
                longitude: -100,
                zoom: 3.5,
                bearing: 0,
                pitch: 0
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={mapboxgl.accessToken}
        >
            <GeolocateControl position="top-left" />
            {/* <FullscreenControl position="top-left" /> */}
            {/* <NavigationControl position="top-left" /> */}
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
        </Map>
        {/* <ControlPanel className='control-panel'/> */}
    </div>
}