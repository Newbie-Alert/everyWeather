import { useState } from "react";
import "./App.css";
import Input from "./components/Input/Input";
import Main from "./components/Main/Main";
import Forecast from "./components/Forecast/Forecast";

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
