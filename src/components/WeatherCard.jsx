import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherForecast from "./WeatherForecast";
import moment from "jalali-moment";
import "../styles/App.scss";
import "../styles/weather.scss";
import WeatherIcon from "./WeatherIcon";

const WeatherCard = () => {
  const [forecastData, setForecastData] = useState();
  const [weatherData, setWeatherData] = useState(undefined);

  const getWeather = async (cityName) => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}current/?city=${cityName}&units=m&lang=fa&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        const mappedData = mapDataToWeatherInterface(res?.data?.data);
        setWeatherData(mappedData);
      });
  };

  const mapDataToWeatherInterface = (data) => {
    const mapped = {
      dayDate: data[0]?.ob_time.split(" ")[0],
      date: moment(data[0].datetime.split(":")[0])
        .locale("fa")
        .format("YYYY/MM/DD"),
      day: moment(data[0].datetime.split(":")[0]).locale("fa").format("dddd"),
      description: data[0]?.weather.description,
      temperature: Math.round(data[0]?.temp),
      name: data[0].city_name,
      humidity: data[0]?.rh,
      windSpeed: Math.round((data[0]?.wind_spd / 1000) * 3600),
      clouds: Math.round(data[0]?.clouds),
      pressure: Math.round(data[0]?.pres),
      weather: data[0].weather,
    };

    return mapped;
  };
  const forecastSevenDays = (cityName) => {
    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }forecast/daily?city=${cityName}&units=m&days=${7}&key=${
          process.env.REACT_APP_API_KEY
        }`
      )
      .then((res) => setForecastData(res.data?.data));
  };

  useEffect(() => {
    getWeather("Tehran");
    const interval = setInterval(() => {
      setWeatherData({});
      getWeather("Tehran");
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div
        className={weatherData ? "container" : "container overlay"}
        id="wrapper"
      >
        <div className="container-fluid" id="current-weather">
          <div className="row d-flex flex-row justify-content-center align-items-center">
            <div className="col-md-3 col-sm-5">
              <h5>
                <span id="cityName">{weatherData?.name}</span>
              </h5>
              <h6>
                <span id="cityName">{weatherData?.day}</span>
              </h6>
              <h6 id="localDate">
                <span>{weatherData?.date}</span>
              </h6>
              <h5 id="localTime">
                <span></span>
              </h5>
            </div>

            <div
              className="col-md-5 col-sm-7 d-flex flex-row justify-content-center align-items-center"
              style={{ margin: "10px auto", padding: "0" }}
            >
              <WeatherIcon
                data={weatherData && weatherData.weather}
                size={"large"}
              />
              <span id="mainTemperature">{weatherData?.temperature}</span>
              <p id="tempDescription"></p>
              <p style={{ fontSize: "1.5rem" }}>°C</p>
            </div>

            <div
              className="col-xs-12 col-sm-12 col-md-3 row"
              style={{ textAlign: "right" }}
            >
              <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                <h6>
                  Humidity: <span id="humidity">{weatherData?.humidity}</span>%
                </h6>
              </div>
              <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                <h6>
                  Wind: <span id="wind">{weatherData?.windSpeed}</span> km/hr
                </h6>
              </div>
              <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                <h6>
                  clouds: <span id="mainTempHot">{weatherData?.clouds}</span>%
                </h6>
              </div>
              <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                <h6>
                  Pressure:{" "}
                  <span id="mainTempLow">{weatherData?.pressure}</span>mb
                </h6>
              </div>
            </div>
          </div>
        </div>
        <WeatherForecast forecast={forecastData} />
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div
          className="forecast-btn"
          onClick={() => forecastSevenDays("Tehran")}
        >
          forecast
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
