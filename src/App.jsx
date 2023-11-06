import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Main from "./components/Main";
import Forecast from "./components/Forecast";

function App() {
  // STATES
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [geoInfo, setGeoInfo] = useState(null);

  return (
    <div className="App">
      <Input
        setWeatherData={setWeatherData}
        geoInfo={geoInfo}
        setGeoInfo={setGeoInfo}
        setForecastData={setForecastData}
      />
      <Main weatherData={weatherData} geoInfo={geoInfo} />
      <Forecast forecastData={forecastData} />
    </div>
  );
}

export default App;
