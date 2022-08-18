import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'
import './MapDisplay.less'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css'


export const MapDisplay = () => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Search for a location',
        marker: false,
    })

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.addControl(geocoder);
        map.current.addControl(new mapboxgl.NavigationControl());
        map.current.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }));
        map.current.addControl(new mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }));
        map.current.addControl(new mapboxgl.FullscreenControl());
        const marker1 = new mapboxgl.Marker({color: 'red'})
            .setLngLat([lng, lat])
            .addTo(map.current);

        // Create a default Marker, colored black, rotated 45 degrees.
        // const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
        //     .setLngLat([12.65147, 55.608166])
        //     .addTo(map.current);
    });



    return <div className='screen'>
        <div className='map-container' ref={mapContainer} />
    </div>
}