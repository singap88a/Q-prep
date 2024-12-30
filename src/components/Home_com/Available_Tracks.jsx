// import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { Autoplay, Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";
 
const Available_Tracks = () => {
  const tracks = [
    {
      title: "Front-end",
      description:
        "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive.",
      icon: "📱",
    },
    {
      title: "Back-end",
      description:
        "A Back-end Developer focuses on server-side development, databases, and ensuring application functionality.",
      icon: "💻",
    },
    {
      title: "Full-stack",
      description:
        "A Full-stack Developer handles both front-end and back-end development for a complete application.",
      icon: "🌐",
    },
    {
      title: "Data Science",
      description:
        "Data Scientists analyze data to extract meaningful insights and build predictive models.",
      icon: "📊",
    },
    {
      title: "DevOps",
      description:
        "DevOps Engineers streamline development and deployment processes for continuous integration and delivery.",
      icon: "⚙️",
    },
    {
      title: "DevOps",
      description:
        "DevOps Engineers streamline development and deployment processes for continuous integration and delivery.",
      icon: "⚙️",
    },
    {
      title: "DevOps",
      description:
        "DevOps Engineers streamline development and deployment processes for continuous integration and delivery.",
      icon: "⚙️",
    },
  ];

  return (
    <div className="py-10">
      <div className="container flex justify-between">
        <h2 className="mb-4 text-2xl font-bold">Available Tracks</h2>
        <Link className="font-bold underline text-primary">Show all</Link>
      </div>
      <div className="p-4 mx-auto bg-bac_bg">
        <div className="container">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }} // التمرير قابل للسحب
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Scrollbar]}
            className="mySwiper custom-swiper-scrollbar"
          >
            {tracks.map((track, index) => (
              <SwiperSlide key={index} className="group pb-11">
                <div className="p-6 text-center bg-white rounded-lg shadow-md hover:shadow-lg h-[230px]">
                  <div className="mb-4 text-5xl">{track.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold text-primary">
                    {track.title}
                  </h3>
                  <p className="text-sm text-gray-600">{track.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Available_Tracks;
