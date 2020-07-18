import Axios from "axios";
import { OPEN_WEATHER_URL, OPEN_WEATHER_API_KEY } from "../utils/constants";

export const getDailyForecast = ({ lat, lon }) => {
  return Axios.get(`${OPEN_WEATHER_URL}/onecall`, {
    params: {
      lat,
      lon,
      appid: OPEN_WEATHER_API_KEY,
      exclude: "hourly,minutely",
    },
  });
};

export const getHistoricalForecast = ({ lat, lon, dt }) => {
  return Axios.get(`${OPEN_WEATHER_URL}/onecall/timemachine`, {
    params: {
      lat,
      lon,
      dt,
      appid: OPEN_WEATHER_API_KEY,
    },
  });
};
