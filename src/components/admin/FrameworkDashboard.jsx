/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEllipsisV, FaTimes, FaEdit, FaTrash, FaQuestionCircle, FaLevelUpAlt } from "react-icons/fa";

const FrameworkDashboard = () => {
 
  const { mainTrackId } = useParams(); // الحصول على الـ mainTrackId من الرابط
  const navigate = useNavigate();
  const [frameworks, setFrameworks] = useState([]);
  const [newFramework, setNewFramework] = useState({
    frameworkName: "",
    description: "",
    photo: null,
  });
  const [editFramework, setEditFramework] = useState({
    frameworkId: null,
    frameworkName: "",
    description: "",
    photo: null,
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [showActions, setShowActions] = useState(null); // حالة إظهار الأزرار

  useEffect(() => {
    if (token && mainTrackId) {
      fetchFrameworks();
    }
  }, [token, mainTrackId]);

  const fetchFrameworks = async () => {
    setLoading(true); // بدء التحميل
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
      setLoading(false); // انتهاء التحميل
    }
  };

  const addFramework = async () => {
    if (!newFramework.frameworkName || !newFramework.description) {
      toast.error("Please fill all fields (Name and Description).");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("FrameworkName", newFramework.frameworkName); // تأكد من استخدام الحقل الصحيح
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

      // تحديث القائمة بالبيانات الجديدة
      setFrameworks([...frameworks, response.data]);
      setNewFramework({ frameworkName: "", description: "", photo: null }); // إعادة تعيين النموذج
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
      });
      fetchFrameworks(); // إعادة جلب البيانات لتحديث القائمة
      toast.success("Framework updated successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" }); // التمرير لأعلى
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
    navigate(`/test-your-level/${frameworkId}`); // الانتقال إلى صفحة TestYourLevel
  };

  const toggleActions = (frameworkId) => {
    setShowActions(showActions === frameworkId ? null : frameworkId);
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
            Frameworks Dashboard - Track ID: {mainTrackId}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Back to Tracks
          </button>
        </div>

        {/* Add/Edit Framework Form */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            {editFramework.frameworkId ? "Edit Framework" : "Add New Framework"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={editFramework.frameworkId ? editFramework.frameworkName : newFramework.frameworkName}
              onChange={(e) =>
                editFramework.frameworkId
                  ? setEditFramework({ ...editFramework, frameworkName: e.target.value })
                  : setNewFramework({ ...newFramework, frameworkName: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={editFramework.frameworkId ? editFramework.description : newFramework.description}
              onChange={(e) =>
                editFramework.frameworkId
                  ? setEditFramework({ ...editFramework, description: e.target.value })
                  : setNewFramework({ ...newFramework, description: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              onChange={(e) =>
                editFramework.frameworkId
                  ? setEditFramework({ ...editFramework, photo: e.target.files[0] })
                  : setNewFramework({ ...newFramework, photo: e.target.files[0] })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={editFramework.frameworkId ? updateFramework : addFramework}
                className="flex-1 p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {editFramework.frameworkId ? "Update Framework" : "Add Framework"}
              </button>
              {editFramework.frameworkId && (
                <button
                  onClick={() => setEditFramework({ frameworkId: null, frameworkName: "", description: "", photo: null })}
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
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {framework.frameworkName}
                      </h3>
                      <p className="text-gray-600">{framework.description}</p>
                      {framework.photo && (
                        <img
                          src={`https://questionprep.azurewebsites.net/${framework.photo}`}
                          alt="Framework"
                          className="w-20 h-20 mt-2 rounded-lg"
                        />
                      )}
                    </div>
                    <div className="relative actions-container">
                      <button
                        onClick={() => toggleActions(framework.frameworkId)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                      >
                        {showActions === framework.frameworkId ? <FaTimes /> : <FaEllipsisV />}
                      </button>
                      {showActions === framework.frameworkId && (
                        <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg">
                          <button
                            onClick={() => {
                              setEditFramework(framework);
                              setShowActions(null);
                              window.scrollTo({ top: 0, behavior: "smooth" }); // التمرير لأعلى
                            }}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaEdit className="mr-2" /> Edit
                          </button>
                          <button
                            onClick={() => deleteFramework(framework.frameworkId)}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaTrash className="mr-2" /> Delete
                          </button>
                          <button
                            onClick={() => handleTestYourLevel(framework.frameworkId)}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaLevelUpAlt className="mr-2" /> Test Your Level
                          </button>
                          <button
                            onClick={() => navigate(`/manage-questions/${framework.frameworkId}`)}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaQuestionCircle className="mr-2" /> Manage Questions
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
  );
};

export default FrameworkDashboard;