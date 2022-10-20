import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=445afd03c9b5a3869efcc8c45e0578b2`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(urlApi).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onKeyPress={searchLocation}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="top-flex"></div>
          <div className="location">
            {data.name && data.sys ? (
              <p>
                Right now in {data.name}, {data.sys.country}
              </p>
            ) : null}
          </div>
          <div className="temperature">
            {data.weather ? <h1 className="bold">{data.main.temp}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <div className="middle">
          {data.weather ? (
            <img
              src={require(`../src/assets/icons/${data.weather[0].icon}.png`)}
              alt="icon-weather"
            />
          ) : null}
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.main ? <p className="bold">{data.wind.speed} m/s</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
