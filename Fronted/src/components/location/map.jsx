import React, { useContext, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { LocationContext } from "../../context/LocationContext";

const MapComponent = ({  isLoaded, loadError }) => {
  const { selectedLocation, setLocation } = useContext(LocationContext);
  
  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const isValidPosition =
    typeof selectedLocation.latitude === "number" &&
    typeof selectedLocation.longitude === "number";
  useEffect(() => {
    if (mapRef.current && isValidPosition) {
      const map = mapRef.current;
      const center = {
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      };
      map.setCenter(center);
    }
  }, [selectedLocation, isValidPosition, mapRef]);

  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  console.log("Selected Location:", selectedLocation);
  const handleMapClick = (e) => {
    const newLocation = {
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    };
    console.log("New Location:", newLocation); // Check if newLocation is correctly captured
    setLocation(newLocation); // Use setLocation to update location
  };

  const defaultCenter = { lat: 0, lng: 0 };

  return (
    <div style={{ marginTop: "50px" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "300px",
        }}
        center={
          isValidPosition
            ? {
                lat: selectedLocation.latitude,
                lng: selectedLocation.longitude,
              }
            : defaultCenter
        }
        zoom={isValidPosition ? 13 : 1}
        onLoad={onMapLoad}
        onClick={handleMapClick}
      >
        <MarkerF
          position={
            isValidPosition
              ? {
                  lat: selectedLocation.latitude,
                  lng: selectedLocation.longitude,
                }
              : defaultCenter
          }
          icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />{" "}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
