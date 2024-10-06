import { FaReact } from "react-icons/fa";
import TopButton from "./components/TopButton";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// hàm này dùng để capitalize first letter của chuỗi
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  // state này dùng để lưu trữ query cho weather API
  const [query, setQuery] = useState({ q: "haiphong" });
  // state này dùng để lưu trữ đơn vị nhiệt độ
  const [units, setUnits] = useState("metric");
  // state này dùng để lưu trữ dữ liệu thới tiết
  const [weather, setWeather] = useState(null);


  // hàm này dùng để get dữ liệu thới tiết
  const getWeather = async () => {
    // lấy ra tên thành phố từ state query
    const cityName = query.q ? query.q : 'current location';
    // hiển thị thông báo đang lấy dữ liệu
    toast.info(`Getting weather data for ${capitalizeFirstLetter(cityName)}`);

    // gọi hàm getFormattedWeatherData để lấy dữ liệu thới tiết đã được format
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      // hiển thị thông báo dữ liệu đã được tải thành công
      toast.success(`Weather data for ${data.name}, ${data.country} loaded successfully!`,);
      // lưu trữ dữ liệu thới tiết vào state weather
      setWeather(data);
    });
    // in ra dữ liệu thới tiết để debug
    console.log(data);
  };

  // sử dụng useEffect để gọi hàm getWeather mỗi khi state query hoặc units thay đổi
  useEffect(() => {
    getWeather();
  }, [query, units]);

  // hàm này dùng để format màu nền của app
  const formatBackground = () => {
    // nếu chưa có dữ liệu thới tiết, return màu nền mặc định
    if( !weather) return "from-cyan-600 to-blue-700";
    // lấy ra ngưỡng nhiệt độ để format màu nền
    const threshold = units === "metric" ? 20 : 60;
    // nếu nhiệt độ <= ngưỡng, return màu nền là xanh, ngược lại là màu nền là vàng
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-400 to-orange-700";
  }


  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButton setQuery={setQuery} />
      <Inputs  setQuery={setQuery} setUnits={setUnits}/>

      {/* // nếu đã có dữ liệu thới tiết, hiển thị các component */}
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title='3 hours step forecast' data={weather.hourly} />
          <Forecast title='Daily forecast' data={weather.daily} />
        </>
      )}

      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;

