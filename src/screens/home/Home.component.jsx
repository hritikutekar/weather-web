import React, { useState, useEffect } from "react";
import {
  FiSearch,
  MdLocationSearching,
  TiWeatherCloudy,
  TiWeatherWindy,
} from "react-icons/all";
import "./Home.styles.css";
import WeekCard from "../../components/WeekCard.component";
import UvCard from "../../components/highlight-cards/uv-card.component";
import WindStatusCard from "../../components/highlight-cards/wind-status.component";
import SunTimingCard from "../../components/highlight-cards/sun-timing.component";
import HumidityCard from "../../components/highlight-cards/humidity-card.component";
import { DAYS_FULL } from "../../utils/constants";
import { formatTime } from "../../utils/utils";
import { getImage } from "../../services/Unsplash";

const HomePage = ({
  dailyForecast,
  yesterday,
  current,
  date,
  location,
  changeLocation,
  onPosition,
}) => {
  useEffect(() => {
    if (dailyForecast.length >= 6) dailyForecast.shift();
  }, [dailyForecast]);

  const [background, setBackground] = useState();

  const getCityBg = async () => {
    const bg = await getImage(current.weather[0].main);
    setBackground(bg);
    console.log(bg);
  };

  useEffect(() => {
    getCityBg();
    // eslint-disable-next-line
  }, [location]);

  const [query, setQuery] = useState();
  const [unit, setUnit] = useState("c");

  const handleChangeUnit = (unit) => {
    setUnit(unit);
  };
  const handleOnChange = (event) => {
    setQuery(event.target.value);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    changeLocation({ city: query });
  };

  return (
    <div className='homepage'>
      <div className='homepage__left'>
        <div className='homepage__left_header'>
          <div className='homepage__search'>
            <FiSearch className='search_icon' />
            <form onSubmit={handleOnSubmit}>
              <input
                placeholder='Search for places...'
                className='search_input'
                onChange={handleOnChange}
              />
            </form>
          </div>
          <MdLocationSearching onClick={onPosition} className='location_icon' />
        </div>

        <div className='homepage__body'>
          <div className='homepage__body_weather_icon_container'>
            <img
              alt='weather-icon'
              src='http://openweathermap.org/img/wn/02d@4x.png'
            />
          </div>
          <h1 className='homeage__body_header_text'>
            {Math.floor(
              unit === "c"
                ? current.temp - 273.15
                : (current.temp - 273.15) * (9 / 5) + 32
            )}
            °{unit}
          </h1>
          <p className='homeage__body_para_text'>
            {DAYS_FULL[date.getDay() - 1]},{" "}
            <span>{formatTime(date.getTime() / 1000)}</span>
          </p>
        </div>

        <div className='homepage__left_footer'>
          <div className='divider_line' />
          <div className='homepage__list_view'>
            <TiWeatherCloudy className='list_view_icon' />
            <p className='list_view_title'>{current.weather[0].main}</p>
          </div>
          <div className='homepage__list_view'>
            <TiWeatherWindy className='list_view_icon' />
            <p className='list_view_title'>
              {current.weather[0].description.charAt(0).toUpperCase() +
                current.weather[0].description.slice(1)}
            </p>
          </div>
          <div className='city'>
            <div
              className='homeage__city_image'
              style={{ backgroundImage: `url("${background}")` }}
            >
              <div className='city_name_container'>
                <p className='city_name'>{`${
                  location.components.city === undefined
                    ? location.components.state_district
                    : location.components.city
                }, ${location.components.state}, ${
                  location.components.country
                }`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='homepage__right'>
        <div className='homepage__right_header'>
          <div
            onClick={() => handleChangeUnit("c")}
            className={
              unit === "c"
                ? "header_circle_button active"
                : "header_circle_button"
            }
          >
            °C
          </div>
          <div
            onClick={() => handleChangeUnit("f")}
            className={
              unit === "f"
                ? "header_circle_button active"
                : "header_circle_button"
            }
          >
            °F
          </div>

          <div className='LOGO_container'>
            <img
              alt='LOGO'
              className='LOGO'
              src={require("../../assets/logo.png")}
            />
          </div>
        </div>

        <div className='homepage__week_view'>
          {dailyForecast.map((forecast) => {
            return (
              <WeekCard key={forecast.dt} forecast={forecast} unit={unit} />
            );
          })}
        </div>

        <div className='todays_highlights'>
          <h1 className='todays_highlights_header'>Today's Hightlights</h1>
          <div className='highlights'>
            <UvCard uvi={dailyForecast[0].uvi} />

            <WindStatusCard
              speed={dailyForecast[0].wind_speed}
              deg={dailyForecast[0].wind_deg}
            />

            <SunTimingCard
              rise={dailyForecast[0].sunrise}
              set={dailyForecast[0].sunset}
              {...yesterday}
            />

            <HumidityCard humidity={dailyForecast[0].humidity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
