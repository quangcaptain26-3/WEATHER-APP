import React from "react";

const TopButton = ({ setQuery }) => {
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
