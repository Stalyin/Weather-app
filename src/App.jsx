import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./assets/components/Weather";
import { IonIcon } from "@ionic/react";
import { search } from "ionicons/icons";

import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  const API_KEY = "f873b7a0326781a647e18a9848a6ee09";

  // Obtener la ubicación del usuario al cargar la aplicación
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setUserLocation(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        },
        function (error) {
          console.error("Error getting geolocation:", error);
          setUserLocation(null);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // Obtener datos meteorológicos basados en la ubicación del usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userLocation) {
          const [lat, lon] = userLocation.split(",");
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
          const response = await axios.get(url);
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [userLocation, API_KEY]);

  // Cambiar el fondo de acuerdo al clima
  useEffect(() => {
    const body = document.querySelector("body");
    if (data.weather && data.weather[0] && data.weather[0].main) {
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

  // Buscar la ubicación ingresada por el usuario
  const searchLocation = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
    axios.get(url).then((response) => {
      setData(response.data);
    });

    setLocation("");
  };

  // Manejar clic en el ícono de búsqueda
  const handleIconClick = () => {
    searchLocation();
  };

  // Manejar la tecla Enter para la búsqueda
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
