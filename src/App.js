import React from "react";
import HomePage from "./screens/home/Home.component";
import {
  getDailyForecast,
  getHistoricalForecast,
} from "./services/openweather-api.service";
import {
  getAddressFromLatLon,
  getAddressFromName,
} from "./services/opencagedata-api.service";
import { isMobile } from "react-device-detect";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: undefined,
      yesterdayData: undefined,
      currentData: undefined,
      intervalId: undefined,
      date: new Date(),
      location: undefined,
    };
  }

  getWeatherData = async (lat, lon) => {
    const response = await getDailyForecast({ lat, lon });
    console.log(response.data);

    this.setState({
      weatherData: response.data.daily,
      currentData: response.data.current,
    });
  };
  getYesterdayData = async () => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 1);

    console.log(Math.floor(dt.getTime() / 1000));

    const response = await getHistoricalForecast({
      lat: 18.52043,
      lon: 73.856743,
      dt: Math.floor(dt.getTime() / 1000),
    });

    this.setState({
      yesterdayData: response.data.current,
    });
  };

  timer = () => {
    this.setState({
      date: new Date(),
    });
  };

  handleLocationChange = ({ lat, lon, city }) => {
    if (city) {
      getAddressFromName({ city }).then((res) => {
        console.log("OPEN_CAGEDATA", res);
        this.setState({ location: res.data.results[0] });
        const geometry = res.data.results[0].geometry;
        this.getWeatherData(geometry.lat, geometry.lng);
      });
    } else {
      getAddressFromLatLon({
        lat,
        lon,
      }).then((res) => {
        console.log("OPEN_CAGEDATA", res);
        this.setState({ location: res.data.results[0] });
        const geometry = res.data.results[0].geometry;
        this.getWeatherData(geometry.lat, geometry.lng);
      });
    }
  };

  getMyPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        const { latitude, longitude } = position.coords;
        this.handleLocationChange({ lat: latitude, lon: longitude });
      } else {
        this.handleLocationChange({ lat: 18.5204, lon: 73.8567 });
      }
    });
  };

  componentDidMount() {
    if (!isMobile) {
      this.getMyPosition();
      this.getWeatherData(18.5204, 73.8567);
      this.getYesterdayData();

      const intervalId = setInterval(this.timer, 1000);
      this.setState({ intervalId });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalId !== undefined)
      clearInterval(this.state.intervalId);
  }

  render() {
    // For small screen devices.
    if (isMobile) {
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            boxSizing: "border-box",
            display: "flex",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            <a href='https://google.com'>Download</a> weather app for your
            device.
          </h1>
        </div>
      );
    }

    if (
      this.state.weatherData === undefined ||
      this.state.yesterdayData === undefined ||
      this.state.currentData === undefined ||
      this.state.location === undefined
    ) {
      return <h1>Loading...</h1>;
    }

    return (
      <HomePage
        dailyForecast={this.state.weatherData}
        yesterday={this.state.yesterdayData}
        current={this.state.currentData}
        date={this.state.date}
        location={this.state.location}
        onPosition={() => this.getMyPosition()}
        changeLocation={({ lat, lon, city }) =>
          this.handleLocationChange({ lat, lon, city })
        }
      />
    );
  }
}
