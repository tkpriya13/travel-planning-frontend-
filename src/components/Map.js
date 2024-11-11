import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
const defaultIcon = new L.Icon({
    iconUrl,
    shadowUrl: iconShadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = defaultIcon;

const Map = ({ locations }) => {
    const defaultCenter = [locations[0]?.lat || 0, locations[0]?.lng || 0];
    const zoomLevel = 10;

    return (
        <MapContainer center={defaultCenter} zoom={zoomLevel} style={{ height: "300px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
                <Marker key={index} position={[location.lat, location.lng]}>
                    <Popup>{location.name || `Location ${index + 1}`}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
