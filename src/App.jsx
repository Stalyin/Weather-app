import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./assets/components/Weather";
import { IonIcon } from "@ionic/react";
import { search } from "ionicons/icons";

import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");

  const API_KEY = "f873b7a0326781a647e18a9848a6ee09";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLocation(
          `${position.coords.latitude},${position.coords.longitude}`
        );
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${
        userLocation.split(",")[0]
      }&lon=${userLocation.split(",")[1]}&units=metric&appid=${API_KEY}`;
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    }
  }, [userLocation]);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });

      setLocation("");
    }
  };

  if (!userLocation) {
    return <div>Please allow location access to use this app.</div>;
  }

  return (
    <div className="navbar-form">
      <h1 className="title">Weather App</h1>
      <div className="text-center">
        <input
          type="text"
          className="form-control"
          placeholder="Enter location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDownCapture={searchLocation}
        />

        <IonIcon icon={search} className="icons" />
      </div>

      <Weather weatherData={data} />
    </div>
  );
}

export default App;
