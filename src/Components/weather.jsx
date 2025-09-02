import { useEffect, useState } from "react";
import Search from "./search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoaing] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  const fetchData = async (param) => {
    setLoaing(true);
    try {
      const response = await fetch(
        // here by removing a part of api key and add the param wtch in 5:32:13
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=236c38d2f039b398bb265387df2b1111`
      );

      const data = await response.json();

      if (data) {
        setWeatherData(data);
        setLoaing(false);
      }
    } catch (e) {
      setError(`${e} Some Error Accured`);
      setLoaing(false);
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
    fetchData("Bengaluru");
  }, []);
  console.log(weatherData);

  const handleSearch = async () => {
    fetchData(search);
  };

  if (error) {
    return <h3>Error Accured... {error}</h3>;
  }

  return (
    <div>
      <Search
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temperature">{weatherData?.main?.temp}</div>
          <p className="description">
            {" "}
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
