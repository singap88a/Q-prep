// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import hero_home from "../../assets/home-img/hero-home.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Import required modules
import { Navigation, Autoplay } from "swiper/modules";

export default function Our_Features() {
  return (
    <div className="py-10 my-20 bg-bac_bg">
      <div className="container px-4 mx-auto">
        <Swiper
          navigation={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide className="flex flex-col items-center space-y-4 text-center">
            <img
              src={hero_home}
              alt=""
              className="mx-auto w-[80%] sm:w-[60%] md:w-[40%] lg:w-[25%] h-auto"
            />
            <h3 className="text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
              At Q-Prep, we offer a wide range of features designed to make your
              interview preparation seamless, efficient, and engaging.
            </h3>
          </SwiperSlide>

          <SwiperSlide className="flex flex-col items-center space-y-4 text-center">
            <img
              src={hero_home}
              alt=""
              className="mx-auto w-[80%] sm:w-[60%] md:w-[40%] lg:w-[25%] h-auto"
            />
            <h3 className="text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
              At Q-Prep, your success is our priority. Let’s help you achieve
              your career goals with confidence.
            </h3>
          </SwiperSlide>

          <SwiperSlide className="flex flex-col items-center space-y-4 text-center">
            <img
              src={hero_home}
              alt=""
              className="mx-auto w-[80%] sm:w-[60%] md:w-[40%] lg:w-[25%] h-auto"
            />
            <h3 className="text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
              Empower yourself with the tools and resources needed for acing
              every interview.
            </h3>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
