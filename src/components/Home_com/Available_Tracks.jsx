import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Autoplay, Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";
import card_img from "../../assets/ChooseTrack/Card-img.png";
import { ClipLoader } from "react-spinners";

const Available_Tracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://questionprep.azurewebsites.net/api/MainTrack/GetMainTrack"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTracks(data); 
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <ClipLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  if (error) {
    return <div className="py-10 text-center text-red-500">Error: {error}</div>; 
  }

  return (
    <div className="py-10">
      <div className="container flex justify-between">
        <h2 className="mb-4 text-2xl font-bold">Available Tracks</h2>
        <Link className="font-bold underline text-primary" to="/choosetrack">
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
            {tracks.map((track) => (
              <SwiperSlide key={track.trackId} className="px-1 pt-6 group pb-11">
                <Link to={`/choosetrack/track/${track.trackId}`}> 
                  <div className="p-4 bg-white rounded-lg shadow-md card">
                    <div className="bg_card">
                      <img src={card_img} alt="" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">
                      {track.tarckName}
                    </h3>
                    <p className="mt-2 text-gray-600">{track.description}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Available_Tracks;