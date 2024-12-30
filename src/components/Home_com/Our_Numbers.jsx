// import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { Autoplay, Scrollbar } from "swiper/modules";
function Our_Numbers() {
  const tracks = [
    {
      title: "10,000+ Users Prepared",
    },
    {
      title: "10,000+ Users Prepared",
    },
    {
      title: "10,000+ Users Prepared",
    },
    {
      title: "10,000+ Users Prepared",
    },
    {
      title: "10,000+ Users Prepared",
    },
    {
      title: "10,000+ Users Prepared",
    },
   
  ];
  return (
    <div className="py-10">
      <div className="container flex justify-between">
        <h2 className="mb-4 text-2xl font-bold">Our Impact in Numbers</h2>
      </div>
      <div className="p-4 mx-auto ">
        <div className="container">
        <Swiper
  slidesPerView={1}
  spaceBetween={20}
  breakpoints={{
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 3 },
  }}
  pagination={{ clickable: true }}
  scrollbar={{ draggable: true }}
  loop={true}
  autoplay={{
    delay: 1000,
    disableOnInteraction: false,
  }}
  modules={[Autoplay, Scrollbar]}
  className="mySwiper custom-swiper-scrollbar" // تأكد من وجود الكلاس هنا
>
  {tracks.map((track, index) => (
    <SwiperSlide key={index} className="group pb-11">
      <div className="p-6 text-center bg-[#6BE9D12B] rounded-lg shadow-md hover:shadow-lg py-10">
        <h3 className="mb-2 text-xl font-semibold text-black">
          {track.title}
        </h3>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

        </div>
      </div>
    </div>
  );
}

export default Our_Numbers;
