import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

/**
 * Component này dùng để hiển thị nhiệt độ và các thông tin chi tiết về thời tiết
 * @param {{weather: {details: string, icon: string, temp: number, temp_min: number, temp_max: number, sunrise: string, sunset: string, speed: number, humidity: number, feels_like: number}, units: string}} props
 * props.weather: object chứa các thông tin chi tiết về thời tiết
 * props.units: đơn vị nhiệt độ (metric hoặc imperial)
 */
const TempAndDetails = ({ weather, units }) => {
  /**
   * Mảng các đối tượng chứa các thông tin chi tiết theo chiều dọc
   */
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${weather.feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${weather.humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${weather.speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];

  /**
   * Mảng các đối tượng chứa các thông tin chi tiết theo chiều ngang
   */
  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: weather.sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: weather.sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "Max",
      value: `${weather.temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Min",
      value: `${weather.temp_min.toFixed()}°`,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{weather.details}</p>
      </div>

      <div className="flex flex-row items-center justify-between py-3">
        <img
          src={weather.icon}
          alt="weather icon"
          className="w-20"
        />
        <p className="text-5xl">{`${weather.temp.toFixed()}°C`}</p>

        <div className="flex flex-col space-y-3 items-start">
          {verticalDetails.map((detail) => {
            const { id, Icon, title, value } = detail;
            return (
              <div
                key={id}
                className="flex font-light text-sm items-center justify-center"
              >
                <Icon size={18} className="mr-1" />
                {title}: <span className="font-medium ml-1">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-center">
            <Icon size={30} />
            <p className="font-light ml-1">
              {`${title}: `}
              <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempAndDetails;

