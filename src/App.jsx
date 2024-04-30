import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./assets/components/Weather";
import { IonIcon } from "@ionic/react";
import { search } from "ionicons/icons";
import { refresh } from "ionicons/icons";

import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const API_KEY = "f873b7a0326781a647e18a9848a6ee09";

  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setUserLocation(
            `${position.coords.latitude},${position.coords.longitude}`
          );
          setLoadingLocation(false);
        },
        function (error) {
          console.error("Error getting geolocation:", error);
          setLoadingLocation(false);
          setUserLocation(null);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchData();
    }
  }, [userLocation]);

  const fetchData = async () => {
    try {
      const [lat, lon] = userLocation.split(",");
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (data.weather && data.weather[0].main) {
      const navbarForm = document.querySelector(".navbar-form");
      switch (data.weather[0].main.toLowerCase()) {
        case "clear":
        case "clear sky":
          navbarForm.style.backgroundImage = "url('../image/clear.webp')";
          break;
        case "hot":
        case "hottest":
          navbarForm.style.backgroundImage = "url('../image/hot.webp')";
          break;
        case "clouds":
          navbarForm.style.backgroundImage = "url('../image/nublado.avif')";
          break;
        case "rain":
          navbarForm.style.backgroundImage = "url('../image/thunderstom.avif')";
          break;
        case "thunderstorm":
          navbarForm.style.backgroundImage = "url('../image/thunderstom.avif')";
          break;
        case "snow":
          navbarForm.style.backgroundImage = "url('../image/frio.jpg')";
          break;
        default:
          navbarForm.style.backgroundImage =
            "url('../image/chan-hoi-uj-w-v7OFT4-unsplash.jpg')";
          break;
      }
    }
  }, [data.weather]);

  const searchLocation = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });

    setLocation("");
  };

  const handleIconClick = () => {
    searchLocation();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchLocation();
    }
  };

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
        />
        <IonIcon
          icon={search}
          className="icons"
          onClick={handleIconClick}
          style={{ cursor: "pointer" }}
        />
      </div>

      {loadingLocation && (
        <div className="Loading-intro">
          <p className="loading-text">
            Loading...
            <IonIcon
              icon={refresh}
              className="refresh-icon"
              onClick={fetchData}
              style={{ cursor: "pointer" }}
            />
          </p>
        </div>
      )}
      <Weather weatherData={data} />
    </div>
  );
}

export default App;
