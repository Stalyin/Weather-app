import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  arrowUp,
  arrowDown,
  water,
  speedometer,
  barChart,
} from "ionicons/icons";

const Weather = ({ weatherData }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const getWeatherGif = (weatherDescription) => {
    switch (weatherDescription) {
      case "clear sky":
      case "hottest":
        return "/calor.gif";
      case "light rain":
        return "/lluvia.gif";
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
      case "overcast clouds":
        return "/nublado.gif";
      case "shower rain":
      case "rain":
        return "/lluvia.gif";
      case "thunderstorm":
        return "/truenos.gif";
      case "coldest":
        return "/a873dcd8c2eae1b8197cfbd4dc5f131c_w200.gif";
      default:
        return "/despejado.gif";
    }
  };

  return (
    <div className="total-container">
      {weatherData.weather ? (
        <div className="card-info">
          <div className="card-info2">
            <div className="flex-colum">
              <div className="container">
                <div>
                  <p className="text">
                    {" "}
                    {weatherData.name},{weatherData.sys.country}
                  </p>

                  <p className="text-sm">
                    {weatherData.weather[0].description}
                  </p>
                </div>
                <h1 className="text-md">
                  {isCelsius
                    ? weatherData.main.temp.toFixed()
                    : convertToFahrenheit(weatherData.main.temp).toFixed()}{" "}
                  {isCelsius ? "°C" : "°F"}
                </h1>

                <div className="text-lg">
                  <div className="relative-img">
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                      alt=""
                      className="wheater-img"
                    />
                  </div>
                </div>
              </div>

              {/* Renderiza el GIF correspondiente al clima */}
              <div className="gif-container">
                <img
                  src={`/public/${getWeatherGif(
                    weatherData.weather[0].description
                  )}`}
                  alt="GIF"
                  className="gif"
                />
              </div>

              {weatherData.name !== undefined ? (
                <div className="content">
                  <div className="info-read2">
                    <p className="subtitle">Feels Like</p>
                    <p className="read-info">
                      {isCelsius
                        ? weatherData.main.feels_like.toFixed()
                        : convertToFahrenheit(
                            weatherData.main.feels_like
                          ).toFixed()}
                      °{isCelsius ? "C" : "F"}
                    </p>
                  </div>

                  <div className="info-read ">
                    <p className="subtitle">Humidity</p>
                    <p className="read-info">
                      {weatherData.main.humidity}%
                      <IonIcon className="info-icon" icon={water} />
                    </p>
                  </div>

                  <div className="info-read">
                    <p className="subtitle">Wind Speed</p>
                    <p className="read-info">
                      {weatherData.wind.speed.toFixed()}m/s
                      <IonIcon className="info-icon" icon={speedometer} />
                    </p>
                  </div>

                  <div className="info-read ">
                    <p className="subtitle">Pressure</p>
                    <p className="read-info">
                      {weatherData.main.pressure} hPa
                      <IonIcon className="info-icon2" icon={barChart} />
                    </p>
                  </div>

                  <div className="info-read">
                    <p className="subtitle">Max Temp</p>
                    <p className="read-info">
                      {isCelsius
                        ? weatherData.main.temp_max.toFixed()
                        : convertToFahrenheit(
                            weatherData.main.temp_max
                          ).toFixed()}
                      °{isCelsius ? "C" : "F"}
                      <IonIcon className="info-icon" icon={arrowUp} />
                    </p>
                  </div>

                  <div className="info-read">
                    <p className="subtitle">Min Temp</p>
                    <p className="read-info">
                      {isCelsius
                        ? weatherData.main.temp_min.toFixed()
                        : convertToFahrenheit(
                            weatherData.main.temp_min
                          ).toFixed()}
                      °{isCelsius ? "C" : "F"}
                      <IonIcon className="info-icon" icon={arrowDown} />
                    </p>
                  </div>

                  <button
                    className="convert-btn"
                    onClick={() => setIsCelsius(!isCelsius)}
                  >
                    {isCelsius ? "Fahrenheit" : "Celsius"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
