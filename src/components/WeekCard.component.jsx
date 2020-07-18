import React from "react";
import { DAYS } from "../utils/constants";

const WeekCard = ({ forecast, unit }) => {
  const date = new Date(forecast.dt * 1000);

  return (
    <div className='week_temp_card'>
      <p className='week_temp_card_week'>{DAYS[date.getDay()]}</p>
      <img
        alt='weather-icon'
        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
        className='week_temp_card_icon'
      />
      <div className='week_temp_card_temp'>
        <p className='week_temp_card_max'>
          {Math.floor(
            unit === "c"
              ? forecast.temp.max - 273.15
              : (forecast.temp.max - 273.15) * (9 / 5) + 32
          )}
          °
        </p>
        <p className='week_temp_card_min'>
          {Math.floor(
            unit === "c"
              ? forecast.temp.min - 273.15
              : (forecast.temp.min - 273.15) * (9 / 5) + 32
          )}
          °
        </p>
      </div>
    </div>
  );
};

export default WeekCard;
