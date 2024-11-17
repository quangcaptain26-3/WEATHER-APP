import { DateTime } from "luxon";

const API_KEY = "d02143d17f5be31e7dfb33996ccad9f7"; //đây là api key
const BASE_URL = "https://api.openweathermap.org/data/2.5/"; //đây là base url dùng để gọi api

const getWeatherData = (inforType, searchParams) => {
  //hàm này dùng để gọi api từ openweathermap
  const url = new URL(BASE_URL + inforType); //tạo ra một url mới từ base url và inforType
  url.search = new URLSearchParams({
    //tạo ra một searchParams mới từ các thông tin cần thiết,
    //ở đây searchParams là một object chuẩn bị truyền vào hàm
    ...searchParams,
    appid: API_KEY, //thêm vào searchParams một key là appid và value là API_KEY
  });

  return fetch(url).then((response) => response.json()); //trả về một promise, khi promise được resolve thì trả về một object json
};

const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`; //hàm này trả về một url của icon dựa vào mã icon

const formatToLocalTime = (
  //hàm này dùng để chuyển đổi thời gian từ UTC sang local time
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format); //chuyển đổi thời gian từ UTC sang local time

const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;
  //các thông tin ở trên là các thông tin cần thiết để hiển thị thông tin thời tiết hiện tại

  const { main: details, icon } = weather[0]; //lấy ra các thông tin cần thiết từ weather
  const formattedLocalTime = formatToLocalTime(dt, timezone); //chuyển đổi thời gian từ UTC sang local time

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
  //trả về một object chứa các thông tin cần thiết để hiển thị thông tin thời tiết hiện tại
};

const formatForecastWeather = (secs, offset, data) => {
  //hàm này dùng để format dữ liệu thời tiết dự báo
  //hourly
  const hourly = data
    .filter((f) => f.dt > secs) //lọc ra các dữ liệu dự báo sau thời gian hiện tại
    .map((f) => ({
      //chuyển đổi các dữ liệu dự báo sang dạng cần thiết
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);
  //lấy ra 5 dữ liệu đầu tiên từ dữ liệu dự báo bằng hàm slice

  //daily
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      //lọc ra các dữ liệu dự báo hàng ngày
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "cccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));
  //chuyển đổi các dữ liệu dự báo hàng ngày sang dạng cần thiết

  return { hourly, daily }; //trả về một object chứa các thông tin dự báo thời tiết
};

const getFormattedWeatherData = async (searchParams) => {
  //hàm này dùng để lấy dữ liệu thời tiết đã được format
  const formattedCurrentWeatherData = await getWeatherData(
    //lấy dữ liệu thời tiết hiện tại từ api
    "weather",
    searchParams
  ).then(formatCurrent); //format dữ liệu thời tiết hiện tại

  const { dt, lat, lon, timezone } = formattedCurrentWeatherData;
  //lấy ra các thông tin cần thiết từ dữ liệu thời tiết hiện tại

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));

  return { ...formattedCurrentWeatherData, ...formattedForecastWeather };
  //trả về một object chứa các thông tin thời tiết đã được format
};

export default getFormattedWeatherData;
