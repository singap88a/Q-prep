/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
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
    photoPreview: null
  });
  const [editTrack, setEditTrack] = useState({
    trackId: null,
    tarckName: "",
    description: "",
    photo: null,
    photoPreview: null
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    if (token) {
      fetchTracks();
    }
  }, [token]);

  const processImageBeforeUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          
          // Fill background with light gray color (#eeeeee)
          ctx.fillStyle = '#eeeeee';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw the image on top of the background
          ctx.drawImage(img, 0, 0);
          
          canvas.toBlob((blob) => {
            const processedFile = new File([blob], file.name, { type: 'image/jpeg' });
            resolve({
              file: processedFile,
              preview: canvas.toDataURL('image/jpeg')
            });
          }, 'image/jpeg', 0.9);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const { file: processedFile, preview } = await processImageBeforeUpload(file);
        
        if (isEdit) {
          setEditTrack({
            ...editTrack,
            photo: processedFile,
            photoPreview: preview
          });
        } else {
          setNewTrack({
            ...newTrack,
            photo: processedFile,
            photoPreview: preview
          });
        }
      } catch (error) {
        console.error("Error processing image:", error);
        toast.error("Failed to process image. Please try another one.");
      }
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

      setNewTrack({ 
        tarckName: "", 
        description: "", 
        photo: null,
        photoPreview: null
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
        toast.error(
          "This Track Name already exists. Please choose a different name."
        );
        return;
      }

      const formData = new FormData();
      formData.append("TarckName", editTrack.tarckName);
      formData.append("description", editTrack.description);
      if (editTrack.photo) {
        formData.append("Photo", editTrack.photo);
      }

      const response = await axios.put(
        `https://questionprep.azurewebsites.net/api/MainTrack/UpdateMaintrack/${editTrack.trackId}`,
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
        photoPreview: null
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      fetchTracks();
      toast.success("Track updated successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
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
              value={
                editTrack.trackId ? editTrack.tarckName : newTrack.tarckName
              }
              onChange={(e) =>
                editTrack.trackId
                  ? setEditTrack({ ...editTrack, tarckName: e.target.value })
                  : setNewTrack({ ...newTrack, tarckName: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <input
              type="text"
              placeholder="Description"
              value={
                editTrack.trackId ? editTrack.description : newTrack.description
              }
              onChange={(e) =>
                editTrack.trackId
                  ? setEditTrack({ ...editTrack, description: e.target.value })
                  : setNewTrack({ ...newTrack, description: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleImageChange(e, !!editTrack.trackId)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                accept="image/*"
              />
              {(editTrack.trackId ? editTrack.photoPreview : newTrack.photoPreview) && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Image Preview:</p>
                  <img 
                    src={editTrack.trackId ? editTrack.photoPreview : newTrack.photoPreview} 
                    alt="Preview" 
                    className="w-20 h-20 mt-1 border border-gray-200 rounded"
                    style={{ backgroundColor: '#eeeeee' }}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={editTrack.trackId ? updateTrack : addTrack}
                className="flex-1 p-3 text-white rounded-lg bg-secondary hover:bg-[#552f8f] focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                {editTrack.trackId ? "Update Track" : "Add Track"}
              </button>
              {editTrack.trackId && (
                <button
                  onClick={() => {
                    setEditTrack({
                      trackId: null,
                      tarckName: "",
                      description: "",
                      photo: null,
                      photoPreview: null
                    });
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
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
                  <div className="flex items-start gap-4">
                    {track.photo && (
                      <div className="flex-shrink-0">
                        <img
                          src={`https://questionprep.azurewebsites.net/TrackandFrameworkPhoto/${track.photo}`}
                          alt={track.tarckName}
                          className="object-contain w-20 h-20 p-1 border border-gray-200 rounded-lg"
                          style={{ backgroundColor: '#eeeeee' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {track.tarckName}
                      </h3>
                      <p className="text-gray-600">{track.description}</p>
                    </div>
                    <div className="relative actions-container">
                      <button
                        onClick={() => toggleActions(track.trackId)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                      >
                        {showActions === track.trackId ? (
                          <FaTimes />
                        ) : (
                          <FaEllipsisV />
                        )}
                      </button>
                      {showActions === track.trackId && (
                        <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg">
                          <button
                            onClick={() => {
                              setEditTrack({
                                ...track,
                                photo: null,
                                photoPreview: track.photo 
                                  ? `https://questionprep.azurewebsites.net/TrackandFrameworkPhoto/${track.photo}`
                                  : null
                              });
                              setShowActions(null);
                              window.scrollTo({ top: 0, behavior: "smooth" });
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