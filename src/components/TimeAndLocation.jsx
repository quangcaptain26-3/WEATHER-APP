import React from "react";

/**
 * component hiển thị thời gian và vị trí
 * @param {{ formattedLocalTime: string, name: string, country: string }} weather - đối tượng chứa thông tin thời tiết
 * @returns {JSX.Element}
 */
const TimeAndLocation = ({ weather: { formattedLocalTime, name, country } }) => {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        {/* hiển thị thời gian địa phương */}
        <p className="text-xl font-extralight">{formattedLocalTime}</p>
      </div>

      <div className="flex items-center justify-center my-3">
        {/* hiển thị tên thành phố và quốc gia */}
        <p className="text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
};

export default TimeAndLocation;

