// import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import card_img from "../../assets/ChooseTrack/Card-img.png";

import { Autoplay, Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";

const Available_Tracks = () => {
  const tracks = [
    {
      title: "Front-end",
      description:
        "A Front-end Developer builds the user interface of websites, ensuring  ",
     },
    {
      title: "Back-end",
      description:
        "A Back-end Developer focuses on server-side development, databases, and  ",
     },
    {
      title: "Full-stack",
      description:
        "A Full-stack Developer handles both front-end and back-end development for a  ",
     },
    {
      title: "Data Science",
      description:
        "Data Scientists analyze data to extract meaningful insights and build predictive  ",
     },
    {
      title: "DevOps",
      description:
        "DevOps Engineers streamline development and deployment processes for continuous  ",
     },
    {
      title: "DevOps",
      description:
        "DevOps Engineers streamline development and deployment processes for continuous ",
     },
    {
      title: "DevOps",
      description:
        "DevOps Engineers streamline development and deployment processes for continuous  ",
     },
  ];

  return (
    <div className="py-10">
      <div className="container flex justify-between">
        <h2 className="mb-4 text-2xl font-bold">Available Tracks</h2>
        <Link className="font-bold underline text-primary" to="/choosetrack/1">
          Show all
        </Link>
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
            scrollbar={{ draggable: true }}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Scrollbar]}
            className="mySwiper custom-swiper-scrollbar"
          >
            {tracks.map((track, index) => (
              <SwiperSlide key={index} className="px-1 pt-6 group pb-11">
                <div className=" card">
                  <div className="bg_card ">
                    <img src={card_img} alt="" />
                  </div>{" "}
                  <h3 className="">
                    {track.title}
                  </h3>
                  <p className="">{track.description}</p>
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
