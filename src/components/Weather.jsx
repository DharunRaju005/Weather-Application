import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "./search/Search";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (param) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=95cc0fe01e34278f673131911e7d9b00`);
      const data = await response.json();
      console.log(data);
      if (data) {
        setLoading(false);
        setWeatherData(data);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const handleSearch = () => {
    fetchWeatherData(search);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    // Fetch initial weather data for a default location
    fetchWeatherData("bangalore");
  }, []);

  return (
    <div>
      <Search search={search} setSearch={setSearch} handleSearch={handleSearch} handleKeyDown={handleKeyDown} />
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <div>
          <CityName>
            <h2>
              {weatherData?.name},<span>{weatherData?.sys?.country}</span>
            </h2>
          </CityName>
          <DateContainer>
            <span>{getCurrentDate()}</span>
          </DateContainer>
          <Temp>{Math.round(weatherData?.main?.temp - 273.15)} °C</Temp>
          <Description>{weatherData && weatherData.weather[0] ? weatherData.weather[0].description : ""}</Description>
          <WeatherInfo>
            <Column>
              <div>
                <Wind>{weatherData?.wind?.speed}</Wind>
                <p>Wind Speed</p>
              </div>
            </Column>
            <Column>
              <div>
                <Humidity>{weatherData?.main?.humidity}%</Humidity>
                <p>Humidity</p>
              </div>
            </Column>
          </WeatherInfo>
        </div>
      )}
    </div>
  );
};

const CityName = styled.div`
  margin-bottom: 10px;
`;

const DateContainer = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-style: italic;
`;

const Temp = styled.div`
  font-size: 64px;
  color: #000;
  font-weight: bold;
  text-align: center;
`;

const Description = styled.p`
  color: #000000;
  font-size: 22px;
  font-weight: 500;
  margin-top: 0px;
  margin-bottom: 20px;
`;

const WeatherInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  padding: 0px 20px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  line-height: 1px;
`;

const Humidity = styled.p``;

const Wind = styled.p``;

export default Weather;
