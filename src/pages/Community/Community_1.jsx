import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import userImage from "../../assets/user.png";

function CommunityCard() {
  // البيانات
  const allData = [
    {
      id: 1,
      title: "PrepTalks",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
      image: userImage,
      members: [userImage, userImage, userImage, userImage, userImage],
    },
    // أضف المزيد من الكروت هنا
    {
      id: 2,
      title: "PrepTalks",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
        image: userImage,
        members: [userImage, userImage, userImage ],
    },
    {
      id: 3,
      title: "LearnTogether",
      description:
        "Another example card. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
        image: userImage,
        members: [userImage, userImage, userImage, userImage, userImage],
    },
    {
      id: 4,
      title: "PrepTalks",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
        image: userImage,
        members: [userImage, userImage, userImage, userImage, userImage],
    },
    // أضف المزيد من الكروت هنا
    {
      id: 5,
      title: "PrepTalks",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
        image: userImage,
        members: [userImage, userImage, userImage, userImage, userImage],
    },
    {
      id: 6,
      title: "LearnTogether",
      description:
        "Another example card. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
        image: userImage,
        members: [userImage, userImage, userImage ],
    },
    {
      id: 7,
      title: "PrepTalks",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
        image: userImage,
        members: [userImage, userImage, userImage, userImage, userImage],
    },
    // أضف المزيد من الكروت هنا
    {
      id: 8,
      title: "singap",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
        image: userImage,
        members: [userImage, userImage ],
    },
    {
      id: 9,
      title: "LearnTogether",
      description:
        "Another example card. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
        image: userImage,
        members: [userImage, userImage, userImage ],
    },
    // ...
  ];

  // حالة البحث
  const [searchTerm, setSearchTerm] = useState("");
  // حالة التقسيم إلى صفحات
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  // فلترة البيانات حسب البحث
  const filteredData = allData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // بيانات الصفحة الحالية
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  // عدد الصفحات
  const totalPages = Math.ceil(filteredData.length / cardsPerPage);

  return (
    <div className="container ">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-2xl font-bold text-center text-transparent bg-gradient-to-r from-primary via-slate-600 to-secondary bg-clip-text md:text-4xl sm:text-3xl">
          Welcome to the Q-Prep Community!
        </h1>
        <p className="md:w-[50%] text-center text-gray-800 w-[100%]">
          Join a collaborative and vibrant space where learners and
          professionals come together to share, discuss, and grow.
        </p>
      </div>
      {/* شريط البحث */}

      <div className="relative w-full max-w-lg mx-auto mt-5 mb-6">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 px-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* عرض الكروت */}
      {currentCards.length >= 1 ? (
        currentCards.map((item) => (
          <div
            key={item.id}
            className="flex  md:flex-row flex-col items-center justify-between p-4 rounded-lg shadow-md bg-[#8349DB0D] mb-8 overflow-hidden"
          >
            {/* Left Section: Image */}
            <div className="flex items-center  md:w-[80%] w-[100%] ">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 mr-4 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 ">{item.description}</p>
              </div>
            </div>

            {/* Right Section: Members */}
            <div className="flex items-center space-x-1 ">
              {item.members.map((member, index) => (
                <img
                  key={index}
                  src={member}
                  alt={`Member ${index + 1}`}
                  className="w-8 h-8 border-2 border-white rounded-full"
                />
              ))}
              <button className="text-gray-500 hover:text-gray-700">•••</button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="font-bold text-center text-secondary"> singap</h1>
      )}

      {/* التقسيم إلى صفحات */}
      <div className="flex justify-center mt-6 mb-20">
        <button
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <i className="fa-solid fa-angles-left"></i>
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === index + 1
                ? "bg-secondary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
}

export default CommunityCard;
