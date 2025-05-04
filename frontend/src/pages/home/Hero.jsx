import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Img1 from "../../assets/hero-carousel/img1 (1).jpg";
import Img2 from "../../assets/hero-carousel/img2 (1).jpg";
import Img3 from "../../assets/hero-carousel/img3 (1).jpg";
import Img4 from "../../assets/hero-carousel/img4 (1).jpg";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E73BE] leading-tight">
            Hotels With Rooftop Pools
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 text-gray-800">
            Near Me
          </h2>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto md:mx-0">
            Discovering hotels with rooftop pools near you! Whether you're
            planning a luxurious staycation or a weekend getaway, our curated
            selection of hotels with rooftop pools will help you beat the heat
            and elevate your travel experience.
          </p>
        </div>

        {/* Right Swiper Carousel */}
        <div className="w-full md:w-[500px]">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            className="rounded-lg shadow-lg overflow-hidden"
          >
            {[Img1, Img2, Img3, Img4].map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Hotel rooftop pool ${idx + 1}`}
                  className="w-full h-64 sm:h-80 md:h-[320px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
