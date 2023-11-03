import React from "react";
import styles from "./Forecast.module.css";

export default function Forecast({ forecastData }) {
  console.log(forecastData);
  const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000;
  const krDiff = 9 * 60 * 60 * 1000;
  const koreaDate =
    forecastData?.city.country === "KR" ? new Date(utc + krDiff) : new Date();

  const todayKorea = `${koreaDate.getUTCFullYear()}-${
    koreaDate.getUTCMonth() + 1
  }-${String(koreaDate.getUTCDate()).padStart(2, "0")}`;

  const todayForeCast = forecastData?.list.filter((data) =>
    data.dt_txt.includes(todayKorea)
  );

  return (
    <div className={styles.forecast_container}>
      {todayForeCast?.map((el) => {
        return (
          <div className={styles.today_forecast}>
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
