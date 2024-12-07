// src/components/LocationInput.js
import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const LocationInput = ({ location, onLocationChange }) => {
    const [selectedLocation, setSelectedLocation] = useState(location || '');
    const googleMapsApiKey = 'AIzaSyB2CMIMoDWQOXPfz-1hndigBOKhAK9yZhs'; // Replace with your Google Maps API key

    // Handle map click to set location
    const handleMapClick = useCallback((e) => {
        const newLocation = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };
        setSelectedLocation(newLocation);
        onLocationChange(newLocation); // Pass selected location to parent
    }, [onLocationChange]);

    // Handle manual input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSelectedLocation(value);
        onLocationChange(value); // Pass the input location to parent
    };

    return (
        <div className="location-input-container">
            <div className="manual-input">
                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    type="text"
                    value={typeof selectedLocation === 'string' ? selectedLocation : ''}
                    onChange={handleInputChange}
                    placeholder="Enter location manually"
                    className="p-2 mb-4 border border-gray-300 rounded w-full"
                />
            </div>

            {/* Option to use the map */}
            <div className="map-selection">
                <p>Or select a location on the map:</p>
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '300px' }}
                        center={{ lat: 37.7749, lng: -122.4194 }} // Default to San Francisco
                        zoom={10}
                        onClick={handleMapClick}
                    >
                        {typeof selectedLocation !== 'string' && (
                            <Marker position={selectedLocation} />
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
};

export default LocationInput;
