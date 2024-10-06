import React from "react";

/**
 * Component này dùng để hiển thị các nút bấm có chứa tên các thành phố
 * Khi bấm vào nút bấm, sẽ gọi hàm setQuery và truyền vào tên thành phố
 */
const TopButton = ({ setQuery }) => {
  /**
   * Mảng các đối tượng chứa các thông tin về các thành phố
   */
  const citites = [
    {
      id: 1,
      name: "Ha Noi",
    },
    {
      id: 2,
      name: "Hai Phong",
    },
    {
      id: 3,
      name: "Da Lat",
    },
    {
      id: 4,
      name: "Ho Chi Minh",
    },
    {
      id: 5,
      name: "Can Tho",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {/* /**
       * Lặp qua mảng citites và hiển thị các nút bấm có chứa tên các thành phố
       * Khi bấm vào nút bấm, sẽ gọi hàm setQuery và truyền vào tên thành phố
       */}
      {citites.map((city) => (
        <button
          key={city.id}
          className="text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in"
          onClick={() => setQuery({ q: city.name })}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default TopButton;

