import React from "react";

const DiscountBanners = () => {
  const banners = [
    {
      title: "Sauces",
      discount: "50% OFF",
      bgColor: "bg-red-500",
      textColor: "text-white",
      img: "/sauce.png",
    },
    {
      title: "All Chips",
      discount: "50% OFF",
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
      img: "/chips.png",
    },
    {
      title: "Sale 58% Off All Fruit Products",
      discount: "50% OFF",
      bgColor: "bg-gray-900",
      textColor: "text-white",
      img: "/banana.png",
      darkButton: true,
    },
    {
      title: "Full Fresh Vegetable",
      discount: "50% OFF",
      bgColor: "bg-green-500",
      textColor: "text-white",
      img: "/freshfruit.png",
      lightButton: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
      {/* Left Column (Sauces & Chips) */}
      <div className="grid gap-4">
        {/* Sauces Banner */}
        <div className={`relative p-6 rounded-lg ${banners[0].bgColor} ${banners[0].textColor}`}>
          <p className="text-sm">{banners[0].discount}</p>
          <h3 className="text-xl font-bold">{banners[0].title}</h3>
          <img src={banners[0].img} alt="Sauces" className="absolute right-4 bottom-0 w-[40%] sm:w-24 md:w-28" />
        </div>

        {/* Chips Banner */}
        <div className={`relative p-6 rounded-lg ${banners[1].bgColor}`}>
          <p className="text-green-500 text-sm">{banners[1].discount}</p>
          <h3 className="text-xl font-bold text-gray-900">{banners[1].title}</h3>
          <img src={banners[1].img} alt="Chips" className="absolute right-4 bottom-1 w-[40%] sm:w-24 md:w-28" />
        </div>
      </div>

      {/* Center Column (Fruits - Large Banner) */}
      <div className={`relative p-6 rounded-lg ${banners[2].bgColor} ${banners[2].textColor} sm:col-span-2 lg:col-span-1 lg:row-span-2`}>
        <p className="text-sm">{banners[2].discount}</p>
        <h3 className="text-2xl font-bold">{banners[2].title}</h3>
        <a href="/shop" className="mt-4 inline-block bg-gray-800 text-white px-4 py-2 rounded transition duration-300 hover:bg-green-500 hover:text-white">
          Shop Now →
        </a>
        <img src={banners[2].img} alt="Fruits" className="absolute right-4 bottom-4 w-24 sm:w-32 md:w-36" />
      </div>

      {/* Right Column (Vegetables) */}
      <div className={`relative p-6 rounded-lg ${banners[3].bgColor} ${banners[3].textColor}`}>
        <p className="text-sm">{banners[3].discount}</p>
        <h3 className="text-xl font-bold">{banners[3].title}</h3>
        <a href="/shop" className="mt-4 inline-block bg-white text-green-600 px-4 py-2 rounded transition duration-300 hover:bg-green-600 hover:text-white">
          Shop Now →
        </a>
        <img src={banners[3].img} alt="Vegetables" className="absolute right-4 bottom-4 w-24 sm:w-32 md:w-36" />
      </div>
    </div>
  );
};

export default DiscountBanners;
