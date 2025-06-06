import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function ChooseTrack() {
  const [tracksData, setTracksData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const cardsPerPage = 8;

  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://redasaad.azurewebsites.net/api/MainTrack/GetMainTrack"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTracksData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // فلترة البيانات حسب البحث
  const filteredTracks = tracksData.filter((track) =>
    track.tarckName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // بيانات الصفحة الحالية
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentTracks = filteredTracks.slice(indexOfFirstCard, indexOfLastCard);

  // عدد الصفحات
  const totalPages = Math.ceil(filteredTracks.length / cardsPerPage);

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center headTitle">
        <h1 className="text-2xl font-bold text-center text-transparent bg-gradient-to-r from-primary via-slate-600 to-secondary bg-clip-text md:text-4xl sm:text-3xl">
          Choose Your Learning Track
        </h1>
        <p className="md:w-[50%] text-center text-gray-800 w-[100%]">
          Select a track that aligns with your career goals and interests.
        </p>
      </div>

      <div className="relative w-full max-w-lg mx-auto mt-5 mb-6">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2"
        />
        <input
          type="text"
          placeholder="Search tracks..."
          className="w-full p-2 px-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* مؤشر التحميل */}
      {isLoading && (
        <div className="flex justify-center my-20">
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-4xl text-secondary animate-spin"
          />
        </div>
      )}

      {/* عرض الكروت */}
      {!isLoading && (
        <>
          <div className="grid gap-10 pb-10 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
            {currentTracks.length >= 1 ? (
              currentTracks.map((track) => (
                <Link
                  to={`/choosetrack/track/${track.trackId}`}
                  key={track.trackId}
                  className="card"
                  state={{ tarckName: track.tarckName }}
                >
                  <div className="bg_card">
                    {track.photo ? (
                      <img
                        src={`https://prep.blob.core.windows.net/photosprep/${track.photo}`}
                        alt={track.tarckName}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/150"
                        alt="Placeholder"
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <h3 className="">{track.tarckName}</h3>
                  <p className="">{track.description}</p>
                </Link>
              ))
            ) : (
              <h1 className="font-bold text-center text-secondary col-span-full">
                No tracks found
              </h1>
            )}
          </div>

          {/* عرض أزرار التقسيم إلى صفحات فقط إذا كان فيه أكثر من صفحة واحدة */}
          {totalPages > 1 && (
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
          )}
        </>
      )}
    </div>
  );
}

export default ChooseTrack;
