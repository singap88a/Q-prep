/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEllipsisV,
  FaTimes,
  FaEdit,
  FaTrash,
  FaQuestionCircle,
  FaLevelUpAlt,
} from "react-icons/fa";
import Sidebar from "./Sidebar";

const FrameworkDashboard = () => {
  const { mainTrackId } = useParams();
  const navigate = useNavigate();
  const [frameworks, setFrameworks] = useState([]);
  const [newFramework, setNewFramework] = useState({
    frameworkName: "",
    description: "",
    photo: null,
    photoPreview: null
  });
  const [editFramework, setEditFramework] = useState({
    frameworkId: null,
    frameworkName: "",
    description: "",
    photo: null,
    photoPreview: null
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (token && mainTrackId) {
      fetchFrameworks();
    }
  }, [token, mainTrackId]);

  const fetchFrameworks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://questionprep.azurewebsites.net/api/Frameworks/GetFramework/${mainTrackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFrameworks(response.data);
    } catch (error) {
      console.error("Error fetching frameworks:", error);
      toast.error("Failed to fetch frameworks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          setEditFramework({
            ...editFramework,
            photo: processedFile,
            photoPreview: preview
          });
        } else {
          setNewFramework({
            ...newFramework,
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

  const addFramework = async () => {
    if (!newFramework.frameworkName || !newFramework.description) {
      toast.error("Please fill all fields (Name and Description).");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("FrameworkName", newFramework.frameworkName);
      formData.append("description", newFramework.description);
      if (newFramework.photo) {
        formData.append("Photo", newFramework.photo);
      }

      const response = await axios.post(
        `https://questionprep.azurewebsites.net/api/Frameworks/AddFramework?MainTrackId=${mainTrackId}&FramworkName=${newFramework.frameworkName}&description=${newFramework.description}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setNewFramework({ 
        frameworkName: "", 
        description: "", 
        photo: null,
        photoPreview: null
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFrameworks([...frameworks, response.data]);
      toast.success("Framework added successfully!");
    } catch (error) {
      console.error("Error adding framework:", error);
      toast.error("Failed to add framework. Please try again.");
    }
  };

  const updateFramework = async () => {
    if (!editFramework.frameworkName || !editFramework.description) {
      toast.error("Please fill all fields (Name and Description).");
      return;
    }

    try {
      const formData = new FormData();
      if (editFramework.photo) {
        formData.append("Photo", editFramework.photo);
      }

      const response = await axios.put(
        `https://questionprep.azurewebsites.net/api/Frameworks/UpdateFramewrok/${editFramework.frameworkId}?FrameworkName=${editFramework.frameworkName}&description=${editFramework.description}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditFramework({
        frameworkId: null,
        frameworkName: "",
        description: "",
        photo: null,
        photoPreview: null
      });
      fetchFrameworks();
      toast.success("Framework updated successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error updating framework:", error);
      toast.error("Failed to update framework. Please try again.");
    }
  };

  const deleteFramework = async (frameworkId) => {
    if (window.confirm("Are you sure you want to delete this framework?")) {
      try {
        await axios.delete(
          `https://questionprep.azurewebsites.net/api/Frameworks/DeleteFramework/${frameworkId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFrameworks(
          frameworks.filter(
            (framework) => framework.frameworkId !== frameworkId
          )
        );
        toast.success("Framework deleted successfully!");
      } catch (error) {
        console.error("Error deleting framework:", error);
        toast.error("Failed to delete framework. Please try again.");
      }
    }
  };

  const handleTestYourLevel = (frameworkId) => {
    navigate(`/test-your-level/${frameworkId}`);
  };

  const toggleActions = (frameworkId) => {
    setShowActions(showActions === frameworkId ? null : frameworkId);
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
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen p-6 bg-gray-100 md:ml-64">
        <ToastContainer />
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Frameworks Dashboard - Track ID: {mainTrackId}
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-white rounded-lg bg-secondary hover:bg-[#552f8f]"
            >
              Back to Tracks
            </button>
          </div>

          {/* Add/Edit Framework Form */}
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              {editFramework.frameworkId
                ? "Edit Framework"
                : "Add New Framework"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={
                  editFramework.frameworkId
                    ? editFramework.frameworkName
                    : newFramework.frameworkName
                }
                onChange={(e) =>
                  editFramework.frameworkId
                    ? setEditFramework({
                        ...editFramework,
                        frameworkName: e.target.value,
                      })
                    : setNewFramework({
                        ...newFramework,
                        frameworkName: e.target.value,
                      })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <input
                type="text"
                placeholder="Description"
                value={
                  editFramework.frameworkId
                    ? editFramework.description
                    : newFramework.description
                }
                onChange={(e) =>
                  editFramework.frameworkId
                    ? setEditFramework({
                        ...editFramework,
                        description: e.target.value,
                      })
                    : setNewFramework({
                        ...newFramework,
                        description: e.target.value,
                      })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleImageChange(e, !!editFramework.frameworkId)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  accept="image/*"
                />
                {(editFramework.frameworkId ? editFramework.photoPreview : newFramework.photoPreview) && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Image Preview:</p>
                    <img 
                      src={editFramework.frameworkId ? editFramework.photoPreview : newFramework.photoPreview} 
                      alt="Preview" 
                      className="w-20 h-20 mt-1 border border-gray-200 rounded"
                      style={{ backgroundColor: '#eeeeee' }}
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={
                    editFramework.frameworkId ? updateFramework : addFramework
                  }
                  className="flex-1 p-3 text-white rounded-lg bg-secondary hover:bg-[#552f8f] focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  {editFramework.frameworkId
                    ? "Update Framework"
                    : "Add Framework"}
                </button>
                {editFramework.frameworkId && (
                  <button
                    onClick={() => {
                      setEditFramework({
                        frameworkId: null,
                        frameworkName: "",
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

          {/* Frameworks List */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Frameworks List
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul className="space-y-4">
                {frameworks.map((framework) => (
                  <li
                    key={framework.frameworkId}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      {framework.photo && (
                        <div className="flex-shrink-0">
                          <img
                            src={`https://questionprep.azurewebsites.net/TrackandFrameworkPhoto/${framework.photo}`}
                            alt={framework.frameworkName}
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
                          {framework.frameworkName}
                        </h3>
                        <p className="text-gray-600">{framework.description}</p>
                      </div>
                      <div className="relative actions-container">
                        <button
                          onClick={() => toggleActions(framework.frameworkId)}
                          className="p-2 text-gray-600 hover:text-gray-800"
                        >
                          {showActions === framework.frameworkId ? (
                            <FaTimes />
                          ) : (
                            <FaEllipsisV />
                          )}
                        </button>
                        {showActions === framework.frameworkId && (
                          <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg">
                            <button
                              onClick={() => {
                                setEditFramework({
                                  ...framework,
                                  photo: null,
                                  photoPreview: framework.photo 
                                    ? `https://questionprep.azurewebsites.net/TrackandFrameworkPhoto/${framework.photo}`
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
                              onClick={() =>
                                deleteFramework(framework.frameworkId)
                              }
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              <FaTrash className="mr-2" /> Delete
                            </button>
                            <button
                              onClick={() =>
                                handleTestYourLevel(framework.frameworkId)
                              }
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              <FaLevelUpAlt className="mr-2" /> Test Your Level
                            </button>
                            <button
                              onClick={() =>
                                navigate(
                                  `/manage-questions/${framework.frameworkId}`
                                )
                              }
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              <FaQuestionCircle className="mr-2" /> Manage
                              Questions
                            </button>
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
    </div>
  );
};

export default FrameworkDashboard;