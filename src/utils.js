import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css'


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

export const runScript = (setBbox, setImgSize) => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-79.4512, 43.6568],
        zoom: 13
    });

    // Add the control to the map.
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    );

    map.addControl(new mapboxgl.GeolocateControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.ScaleControl());

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Construction on the Washington Monument began in 1848.'
    );

    const marker = new mapboxgl.Marker()
        .setLngLat([-79.4512, 43.6568])
        .setPopup(popup)
        .addTo(map);

    map.on('moveend', () => {
        let bound = map.getBounds();
        let top = bound._ne.lat;
        let bottom = bound._sw.lat;
        let left = bound._sw.lng;
        let right = bound._ne.lng;

        let imgWidth = document.querySelector(".screen").clientWidth;
        let imgHeight = document.querySelector(".screen").clientHeight;

        imgHeight = Math.round(measure(top, 1, bottom, 1));
        imgWidth = Math.round(measure(1, left, 1, right));
        console.log([left, bottom, right, top])
        console.log(imgHeight, imgWidth)
        setBbox([left, bottom, right, top]);
        setImgSize([imgWidth, imgHeight]);
        // console.log('bbox, imgSize', bbox, imgSize);
    })
}