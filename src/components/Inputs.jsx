import { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

/**
 * Component này dùng để nhập tên thành phố và các thông tin khác
 * @param {{ setQuery: (query: { q: string } | { lat: number, lon: number }) => void, setUnits: (units: string) => void }} props
 * props.setQuery: hàm này dùng để set query cho weather API
 * props.setUnits: hàm này dùng để set đơn vị nhiệt độ
 */
const Inputs = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState(""); //biến này dùng để lưu trữ tên thành phố

  /**
   * Hàm này dùng để handle sự kiện click nút search
   */
  const handleSeacrchClick = () => {
    if (city !== "") setQuery({ q: city }); //nếu tên thành phố không trống, gọi hàm setQuery với tham số là tên thành phố
  };

  /**
   * Hàm này dùng để handle sự kiện click nút current location
   */
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude }); //gọi hàm setQuery với tham số là tọa độ hiện tại
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)} //lưu trữ tên thành phố vào biến city
          type="text"
          placeholder="Enter city..."
          className="text-gray-500 text-x1 font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
        />

        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSeacrchClick} //gọi hàm handleSeacrchClick khi bấm nút search
        />
        <BiCurrentLocation
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick} //gọi hàm handleLocationClick khi bấm nút current location
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("metric")} //gọi hàm setUnits với tham số là "metric" khi bấm nút °C
        >
          °C
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button
          className="text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnits("imperial")} //gọi hàm setUnits với tham số là "imperial" khi bấm nút °F
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;

