import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const DonationCard = ({ image, title, description, progress, raised, goal }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <p className="text-gray-400 italic text-xs mt-2">Last donation 1w ago</p>
        <div className="mt-3">
          <div className="w-full bg-gray-200 h-2 rounded">
            <div className="bg-orange-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-2">
          <strong>${raised.toLocaleString()}</strong> raised of ${goal.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const DonationCarousel = () => {
  const donations = [
    {
      image: "/Black.jpg",
      title: "Clean water for the urban area",
      description: "Help provide clean water to those in need.",
      progress: 40,
      raised: 12000,
      goal: 30000,
    },
    {
      image: "/heroImage.jpg",
      title: "Education for all",
      description: "Support children's education in underprivileged areas.",
      progress: 60,
      raised: 18000,
      goal: 30000,
    },
    {
      image: "/heroimg.jpg",
      title: "Healthcare access",
      description: "Ensure healthcare access to remote communities.",
      progress: 50,
      raised: 15000,
      goal: 30000,
    },
    {
        image: "/Black.jpg",
        title: "Clean water for the urban area",
        description: "Help provide clean water to those in need.",
        progress: 40,
        raised: 12000,
        goal: 30000,
      },
      {
        image: "/heroImage.jpg",
        title: "Education for all",
        description: "Support children's education in underprivileged areas.",
        progress: 60,
        raised: 18000,
        goal: 30000,
      },
      {
        image: "/heroimg.jpg",
        title: "Healthcare access",
        description: "Ensure healthcare access to remote communities.",
        progress: 50,
        raised: 15000,
        goal: 30000,
      },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {donations.map((donation, index) => (
          <SwiperSlide key={index}>
            <DonationCard {...donation} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DonationCarousel;
