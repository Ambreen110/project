import React, { createContext, useState } from 'react';

export const LocationContext = createContext(null);

export const LocationProvider = ({ children, initialLocation }) => {
  const initialSelectedLocation = {
    location: initialLocation ? initialLocation.formatted_address : "Unknown",
    latitude: initialLocation ? initialLocation.lat : 0,
    longitude: initialLocation ? initialLocation.lng : 0,
  };

  const [selectedLocation, setSelectedLocation] = useState(initialSelectedLocation);

  const setLocation = (newLocation) => {
    setSelectedLocation({
      location: newLocation.address || selectedLocation.location,
      latitude: newLocation.latitude || selectedLocation.latitude,
      longitude: newLocation.longitude || selectedLocation.longitude,
    });
  };

  return (
    <LocationContext.Provider value={{ selectedLocation, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
