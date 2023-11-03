import React, { useState, useEffect } from "react";
import styles from "./Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { config } from "../../config";

export default function Input({ setWeatherData, setForecastData }) {
  const geoCodingKey = config.GEOCODING.API_KEY;
  const weatherKey = config.OpenWeather.API_KEY;

  const [inputValue, setInputValue] = useState("");
  // 인풋 값으로 전달된 지역, 국가, 도시 등의 지리 정보를 받아옵니다. (사용하는 것은 위도와, 경도)
  const geoInfoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${inputValue}&key=${geoCodingKey}`;

  // 맨 처음 방문 시 사용자의 위치 정보를 허용 받으면 사용자 위치의 날씨를 받아와 UI를 그립니다.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      const lat = data.coords.latitude;
      const lon = data.coords.longitude;
      getWeather(lat, lon, weatherKey);
      getForecast(lat, lon, weatherKey);
    });
  }, []);

  // 검색 폼에 submit이 발생하면 input값(동, 도시, 나라)을 받아와 현재 날씨와 이후 5일의 날씨를 받아옵니다.
  async function getGeoInfo() {
    const res = await fetch(geoInfoURL);
    const data = await res.json();
    const geometry = await data.results[0].geometry.location;
    getWeather(geometry.lat, geometry.lng, weatherKey);
    getForecast(geometry.lat, geometry.lng, weatherKey);
    setInputValue("");
  }

  // 현재 날씨를 받아옵니다.
  async function getWeather(lat, lon, key) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    );
    const data = await res.json();
    setWeatherData(data);
  }

  // 이후 5일의 날씨를 받아옵니다
  async function getForecast(lat, lon, key) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    );
    const data = await res.json();
    setForecastData(data);
  }

  // input에 change 이벤트 발생 시 value state를 업데이트 합니다.
  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.input_container}>
      <form
        className={styles.input_form}
        onSubmit={(e) => {
          e.preventDefault();
          getGeoInfo(inputValue);
        }}>
        <input
          value={inputValue}
          className={styles.search_input}
          type="text"
          required
          placeholder="enter city"
          onChange={inputHandler} // e 전달 안해도 자동으로 전달되넹
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.glass_icon}
        />
      </form>
    </div>
  );
}
