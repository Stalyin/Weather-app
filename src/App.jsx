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
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setUserLocation(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        },
        function (error) {
          setUserLocation("DEFAULT_LOCATION");
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userLocation !== "DEFAULT_LOCATION") {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${
          userLocation.split(",")[0]
        }&lon=${userLocation.split(",")[1]}&units=metric&appid=${API_KEY}`;
        try {
          const response = await axios.get(url);
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };
    fetchData();
  }, [userLocation, API_KEY]);

  useEffect(() => {
    // Cambiar la imagen de fondo según el clima
    if (data.weather && data.weather[0].main) {
      const body = document.querySelector("body");
      switch (data.weather[0].main.toLowerCase()) {
        case "clear":
        case "clear sky":
          body.style.backgroundImage = "url('../image/fondo.jpg')";
          break;
        case "hot":
        case "hottest":
          body.style.backgroundImage = "url('../image/calido.jpg')";
          break;
        case "clouds":
          body.style.backgroundImage = "url('../image/nublado.jpg')";
          break;
        case "rain":
          body.style.backgroundImage = "url('../image/noche2.jpg')";
          break;
        case "thunderstorm":
          body.style.backgroundImage = "url('../image/noche3.jpg')";
          break;
        case "snow":
          body.style.backgroundImage = "url('../image/frio.jpg')";
          break;
        default:
          body.style.backgroundImage =
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
          onKeyPress={handleKeyPress}
        />
        <IonIcon
          icon={search}
          className="icons"
          onClick={handleIconClick}
          style={{ cursor: "pointer" }}
        />
      </div>
      <Weather weatherData={data} />
    </div>
  );
}

export default App;
