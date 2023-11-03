import React from "react";
import styles from "./Forecast.module.css";

export default function Forecast({ forecastData }) {
  const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000;
  const krDiff = 9 * 60 * 60 * 1000;
  const koreaDate =
    forecastData?.city.country === "KR" ? new Date(utc + krDiff) : new Date();

  // 한국 기준 년-월-일
  const todayKorea = `${koreaDate.getUTCFullYear()}-${
    koreaDate.getUTCMonth() + 1
  }-${String(koreaDate.getUTCDate()).padStart(2, "0")}`;

  // 한국 기준 년-월-일을 포함한 데이터를 가져옵니다.
  const todayForeCast = forecastData?.list.filter((data) =>
    data.dt_txt.includes(todayKorea)
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
