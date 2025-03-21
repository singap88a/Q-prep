/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEllipsisV, FaTimes, FaEdit, FaTrash, FaEye } from "react-icons/fa";

const MainTrackDashboard = () => {
  const [tracks, setTracks] = useState([]);
  const [newTrack, setNewTrack] = useState({
    tarckName: "",
    description: "",
    photo: null,
  });
  const [editTrack, setEditTrack] = useState({
    trackId: null,
    tarckName: "",
    description: "",
    photo: null,
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchTracks();
    }
  }, [token]);

  const fetchTracks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://questionprep.azurewebsites.net/api/MainTrack/GetMainTrack",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTracks(response.data);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      toast.error("Failed to fetch tracks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addTrack = async () => {
    if (!newTrack.tarckName || !newTrack.description) {
      toast.error("Please fill all fields (Name and Description).");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("TarckName", newTrack.tarckName);
      formData.append("description", newTrack.description);
      if (newTrack.photo) {
        formData.append("Photo", newTrack.photo);
      }

      const response = await axios.post(
        "https://questionprep.azurewebsites.net/api/MainTrack/AddMainTrack",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setNewTrack({ tarckName: "", description: "", photo: null });
      setTracks([...tracks, response.data]);
      toast.success("Track added successfully!");
    } catch (error) {
      console.error("Error adding track:", error);
      toast.error("Failed to add track. Please try again.");
    }
  };

  const updateTrack = async () => {
    if (!editTrack.tarckName || !editTrack.description) {
      toast.error("Please fill all fields (Name and Description).");
      return;
    }

    try {
      const isNameExists = tracks.some(
        (track) =>
          track.tarckName.toLowerCase() === editTrack.tarckName.toLowerCase() &&
          track.trackId !== editTrack.trackId
      );

      if (isNameExists) {
        toast.error("This Track Name already exists. Please choose a different name.");
        return;
      }

      const formData = new FormData();
      if (editTrack.photo) {
        formData.append("Photo", editTrack.photo);
      }

      const response = await axios.put(
        `https://questionprep.azurewebsites.net/api/MainTrack/UpdateMaintrack/${editTrack.trackId}?TarckName=${editTrack.tarckName}&description=${editTrack.description}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditTrack({
        trackId: null,
        tarckName: "",
        description: "",
        photo: null,
      });
      fetchTracks();
      toast.success("Track updated successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" }); // التمرير لأعلى
    } catch (error) {
      console.error("Error updating track:", error);
      toast.error("Failed to update track. Please try again.");
    }
  };

  const deleteTrack = async (trackId) => {
    if (window.confirm("Are you sure you want to delete this track?")) {
      try {
        await axios.delete(
          `https://questionprep.azurewebsites.net/api/MainTrack/DeleteTrack/${trackId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTracks(tracks.filter((track) => track.trackId !== trackId));
        toast.success("Track deleted successfully!");
      } catch (error) {
        console.error("Error deleting track:", error);
        toast.error("Failed to delete track. Please try again.");
      }
    }
  };

  const toggleActions = (trackId) => {
    setShowActions(showActions === trackId ? null : trackId);
  };

  // إغلاق الأزرار عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showActions && !e.target.closest(".actions-container")) {
        setShowActions(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showActions]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <ToastContainer />
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Main Tracks Dashboard
          </h1>
        </div>

        {/* Add/Edit Track Form */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            {editTrack.trackId ? "Edit Track" : "Add New Track"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={editTrack.trackId ? editTrack.tarckName : newTrack.tarckName}
              onChange={(e) =>
                editTrack.trackId
                  ? setEditTrack({ ...editTrack, tarckName: e.target.value })
                  : setNewTrack({ ...newTrack, tarckName: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={editTrack.trackId ? editTrack.description : newTrack.description}
              onChange={(e) =>
                editTrack.trackId
                  ? setEditTrack({ ...editTrack, description: e.target.value })
                  : setNewTrack({ ...newTrack, description: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              onChange={(e) =>
                editTrack.trackId
                  ? setEditTrack({ ...editTrack, photo: e.target.files[0] })
                  : setNewTrack({ ...newTrack, photo: e.target.files[0] })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={editTrack.trackId ? updateTrack : addTrack}
                className="flex-1 p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {editTrack.trackId ? "Update Track" : "Add Track"}
              </button>
              {editTrack.trackId && (
                <button
                  onClick={() => setEditTrack({ trackId: null, tarckName: "", description: "", photo: null })}
                  className="flex-1 p-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tracks List */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Tracks List
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-4">
              {tracks.map((track) => (
                <li
                  key={track.trackId}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {track.tarckName}
                      </h3>
                      <p className="text-gray-600">{track.description}</p>
                      {track.photo && (
                        <img
                          src={`https://questionprep.azurewebsites.net/TrackPhoto/${track.photo}`}
                          alt={track.tarckName}
                          className="w-20 h-20 mt-2 rounded-lg"
                        />
                      )}
                    </div>
                    <div className="relative actions-container">
                      <button
                        onClick={() => toggleActions(track.trackId)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                      >
                        {showActions === track.trackId ? <FaTimes /> : <FaEllipsisV />}
                      </button>
                      {showActions === track.trackId && (
                        <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg">
                          <button
                            onClick={() => {
                              setEditTrack(track);
                              setShowActions(null);
                              window.scrollTo({ top: 0, behavior: "smooth" }); // التمرير لأعلى
                            }}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaEdit className="mr-2" /> Edit
                          </button>
                          <button
                            onClick={() => deleteTrack(track.trackId)}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaTrash className="mr-2" /> Delete
                          </button>
                          <Link
                            to={`/frameworks/${track.trackId}`}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaEye className="mr-2" /> View Frameworks
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainTrackDashboard;