import   { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FrameworkDashboard = () => {
  const { mainTrackId } = useParams(); // الحصول على الـ mainTrackId من الرابط
  const navigate = useNavigate();
  const [frameworks, setFrameworks] = useState([]);
  const [newFramework, setNewFramework] = useState({ frameworkName: '', description: '', photo: null });
  const [editFramework, setEditFramework] = useState({ frameworkId: null, frameworkName: '', description: '', photo: null });
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false); // حالة التحميل

  useEffect(() => {
    if (token && mainTrackId) {
      fetchFrameworks();
    }
  }, [token, mainTrackId]);

  const fetchFrameworks = async () => {
    setLoading(true); // بدء التحميل
    try {
      const response = await axios.get(`https://questionprep.azurewebsites.net/api/Frameworks/GetFramework/${mainTrackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFrameworks(response.data);
    } catch (error) {
      console.error('Error fetching frameworks:', error);
      alert('Failed to fetch frameworks. Please try again.');
    } finally {
      setLoading(false); // انتهاء التحميل
    }
  };

  const addFramework = async () => {
    if (!newFramework.frameworkName || !newFramework.description) {
      alert('Please fill all fields (Name and Description).');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('FrameworkName', newFramework.frameworkName);
      formData.append('description', newFramework.description);
      if (newFramework.photo) {
        formData.append('Photo', newFramework.photo);
      }

      const response = await axios.post('https://questionprep.azurewebsites.net/api/Frameworks/AddFramework', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        params: {
          MainTrackId: mainTrackId,
        },
      });
      setNewFramework({ frameworkName: '', description: '', photo: null });
      setFrameworks([...frameworks, response.data]);
      alert('Framework added successfully!');
    } catch (error) {
      console.error('Error adding framework:', error);
      alert('Failed to add framework. Please try again.');
    }
  };

  const updateFramework = async () => {
    if (!editFramework.frameworkName || !editFramework.description) {
      alert('Please fill all fields (Name and Description).');
      return;
    }

    try {
      const formData = new FormData();
      if (editFramework.photo) {
        formData.append('Photo', editFramework.photo);
      }

      const response = await axios.put(
        `https://questionprep.azurewebsites.net/api/Frameworks/UpdateFramework/${editFramework.frameworkId}?FrameworkName=${editFramework.frameworkName}&description=${editFramework.description}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setEditFramework({ frameworkId: null, frameworkName: '', description: '', photo: null });
      fetchFrameworks();
      alert('Framework updated successfully!');
    } catch (error) {
      console.error('Error updating framework:', error);
      alert('Failed to update framework. Please try again.');
    }
  };

  const deleteFramework = async (frameworkId) => {
    if (window.confirm('Are you sure you want to delete this framework?')) {
      try {
        await axios.delete(`https://questionprep.azurewebsites.net/api/Frameworks/DeleteFramework/${frameworkId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFrameworks(frameworks.filter(framework => framework.frameworkId !== frameworkId));
        alert('Framework deleted successfully!');
      } catch (error) {
        console.error('Error deleting framework:', error);
        alert('Failed to delete framework. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Frameworks Dashboard</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Back to Tracks
          </button>
        </div>

        {/* Add Framework Form */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Add New Framework</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newFramework.frameworkName}
              onChange={(e) => setNewFramework({ ...newFramework, frameworkName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={newFramework.description}
              onChange={(e) => setNewFramework({ ...newFramework, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              onChange={(e) => setNewFramework({ ...newFramework, photo: e.target.files[0] })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addFramework}
              className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Framework
            </button>
          </div>
        </div>

        {/* Edit Framework Form */}
        {editFramework.frameworkId && (
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Edit Framework</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={editFramework.frameworkName}
                onChange={(e) => setEditFramework({ ...editFramework, frameworkName: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={editFramework.description}
                onChange={(e) => setEditFramework({ ...editFramework, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                onChange={(e) => setEditFramework({ ...editFramework, photo: e.target.files[0] })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={updateFramework}
                className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Update Framework
              </button>
            </div>
          </div>
        )}

        {/* Frameworks List */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Frameworks List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-4">
              {frameworks.map((framework) => (
                <li key={framework.frameworkId} className="p-4 border border-gray-200 rounded-lg hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {framework.frameworkName || "No Name"}
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
                    <div className="space-x-2">
                      <button
                        onClick={() => setEditFramework(framework)}
                        className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFramework(framework.frameworkId)}
                        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
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