import React, { memo, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";
import moment from "jalali-moment";


const WeatherForecast = ({ forecast }) => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ padding: '2px' }}>
        {forecast?.slice(0, -1).map((item, index) => (
          <div key={index} className="col-md-3 col-sm-6 day-weather-box">
            <div className="col-sm-12 day-weather-inner-box">
              <div className="col-sm-8 forecast-main">
                <p id="forecast-day-1-name">{moment(item.datetime).locale("fa").format("dddd")}</p>
                <div className="d-flex flex-row justify-content-between">
                  <span>{item.temp} &deg;C</span>
                  <WeatherIcon data={item.weather} />
                </div>
              </div>
              <div className="col-sm-4 forecast-min-low">
                <p><span className="high-temperature" id="forecast-day-1-ht">{item.high_temp}  &deg;C</span></p>
                <p><span className="low-temperature" id="forecast-day-1-lt">{item.low_temp}  &deg;C</span></p>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>


  );

}

export default memo(WeatherForecast);