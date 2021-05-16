import axios from "axios";

const weatherUrl = "http://wthrcdn.etouch.cn/weather_mini?city="
export const weatherRequest = (city) => {
  return axios({
    url: `${weatherUrl}${city}`
  })
}