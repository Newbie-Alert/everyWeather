import React from "react";
import styles from "./Main.module.css";

export default function Main({ weatherData }) {
  if (weatherData === null)
    <div>
      <h3>로딩 중...</h3>
    </div>;

  return (
    <div className={styles.main_container}>
      <div className={styles.current_weather}>
        <div className={styles.current_weather_icon}>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
            alt=""
          />
        </div>
        <div className={styles.current_weather_temprature}>
          <h4>{Number(weatherData?.main.temp).toFixed(1)}도</h4>
        </div>

        <div className={styles.current_weather_current_city}>
          <h1>{weatherData?.name}</h1>
        </div>
      </div>
    </div>
  );
}
