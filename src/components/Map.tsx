import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const position = { lat: latitude, lng: longitude };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAB6p0Eaxwqj2wK2tPjeQwz02uy38IF4PM" >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={13}
      >
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
