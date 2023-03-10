import React from "react";
import "./GeolocationAPI.css";

const GeolocationAPI = () =>{
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [error, setError] = React.useState("");

  const getCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError("");
      },
      (error) => {
        setError(error.message);
      }
    );
  };

  return (
    <div className="App">
      <h1>Geolocation API</h1>
      <button type="button" onClick={getCoordinates}>
        Get Coordinates
      </button>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Error: {error}</p>
    </div>
  );
}