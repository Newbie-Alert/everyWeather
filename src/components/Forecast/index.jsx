import React from "react";
import styles from "./Forecast.module.css";
import { todayKorea } from "../../util";

export default function Forecast({ forecastData }) {
  // 오늘 날짜를 includes한 데이터를 가져옵니다. (오늘 날짜 예보를 가져옵니다.)
  const todayForeCast = forecastData?.list.filter((data) =>
    data.dt_txt.includes(todayKorea(forecastData))
  );

  return (
    <div className={styles.forecast_container}>
      {todayForeCast?.map((el) => {
        return (
          <div key={el.dt} className={styles.today_forecast}>
            <div className={styles.forecast_img}>
              <img
                src={`https://openweathermap.org/img/wn/${el.weather[0].icon}.png`}
                alt=""
              />
            </div>
            <div className={styles.forecast_temprature}>
              {Number(el.main.temp).toFixed(1)}도
            </div>
            <div className={styles.forecast_time}>
              {el.dt_txt.slice(10, 16)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
