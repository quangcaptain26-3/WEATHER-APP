import React from "react";

/**
 * Màn hình hiển thị thông tin dự báo thời tiết
 * @param {String} title - Tiêu đề của màn hình
 * @param {Array} data - Danh sách các thông tin dự báo, mỗi thông tin bao gồm:
 *  - title: Tiêu đề của dự báo
 *  - icon: Hình ảnh của dự báo
 *  - temp: Nhiệt độ của dự báo
 */
const Forecast = ({ title, data }) => {
  return (
    <div>
      {/* Tiêu đề của màn hình */}
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>

      {/* Đường kẻ ngang */}
      <hr className="my-1" />

      {/* Danh sách các thông tin dự báo */}
      <div className="flex items-center justify-between">
        {data.map((d, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            {/* Tiêu đề của dự báo */}
            <p className="font-light text-sm">{d.title}</p>

            {/* Hình ảnh của dự báo */}
            <img
              src={d.icon}
              alt="weather icon"
              className="w-12 my-1"
            />

            {/* Nhiệt độ của dự báo */}
            <p className="font-medium">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;

