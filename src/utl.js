// KST 기준 || UTC 기준의 오늘 날짜를 가져오는 함수입니다.
export const koreaDate = (forecastData) => {
  const utc =
    new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000;
  const krDiff = 9 * 60 * 60 * 1000;
  return forecastData?.city.country === "KR"
    ? new Date(utc + krDiff)
    : new Date();
};

// 한국 기준 년-월-일
export const todayKorea = (forecastData) => {
  return `${koreaDate(forecastData).getUTCFullYear()}-${koreaDate(forecastData).getUTCMonth() + 1
    }-${String(koreaDate(forecastData).getUTCDate()).padStart(2, "0")}`
}