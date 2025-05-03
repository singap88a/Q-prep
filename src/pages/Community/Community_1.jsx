import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import userImage from "../../assets/user.png";
import axios from "axios";

function CommunityCard() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 6;

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://questionprep.azurewebsites.net/api/Groups/GetAllGroups",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setGroups(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const getImageUrl = (photo) => {
    if (!photo) return userImage;
    if (photo.startsWith("http")) return photo;
    return `https://questionprep.azurewebsites.net/GroupsPhoto/${photo}`;
  };

  const handleCardClick = (groupId) => {
    navigate(`/community/${groupId}`);
  };

  const filteredData = groups.filter((item) =>
    item.groupName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCard = (currentPage + 1) * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredData.length / cardsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-secondary"></div>
        <span className="ml-2">Loading communities...</span>
      </div>
    );
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary via-slate-600 to-secondary bg-clip-text">
          Welcome to the Q-Prep Community!
        </h1>
        <p className="max-w-2xl mx-auto mt-2 text-gray-800">
          Join a collaborative and vibrant space where learners and professionals come together.
        </p>
      </div>

      <div className="relative w-full max-w-lg mx-auto mb-6">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-10 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-secondary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {currentCards.length > 0 ? (
        currentCards.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item.id)}
            className="flex flex-col sm:flex-row items-center justify-between p-4 mb-6 bg-[#8349DB0D] rounded-lg shadow-md transition cursor-pointer hover:bg-[#8349DB1A]"
          >
            <div className="flex items-center">
              <img
                src={getImageUrl(item.photo)}
                alt={item.groupName}
                className="object-cover w-16 h-16 mr-4 rounded-full"
                onError={(e) => {
                  e.target.src = userImage;
                }}
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800">{item.groupName}</h2>
                <p className="text-sm text-gray-600">
                  {item.description || "No description available"}
                </p>
              </div>
            </div>

            <div className="flex items-center mt-4 space-x-3 sm:mt-0">
              <span className="text-gray-600">
                {item.numberOfMembers} member{item.numberOfMembers !== "1" ? "s" : ""}
              </span>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="font-bold text-center text-secondary">
          {searchTerm ? "No matching communities found" : "No communities available"}
        </h1>
      )}

      {/* Pagination */}
      {filteredData.length > cardsPerPage && (
        <div className="flex justify-center mt-6 mb-20">
          <button
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index
                  ? "bg-secondary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default CommunityCard;
