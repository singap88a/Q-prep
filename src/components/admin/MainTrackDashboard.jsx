import   { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MainTrackDashboard = () => {
  const [tracks, setTracks] = useState([]);
  const [newTrack, setNewTrack] = useState({ tarckName: '', description: '', photo: null });
  const [editTrack, setEditTrack] = useState({ trackId: null, tarckName: '', description: '', photo: null });
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      fetchTracks();
    }
  }, [token]);

  const fetchTracks = async () => {
    try {
      const response = await axios.get('https://questionprep.azurewebsites.net/api/MainTrack/GetMainTrack', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTracks(response.data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const addTrack = async () => {
    try {
      const formData = new FormData();
      formData.append('TarckName', newTrack.tarckName);
      formData.append('description', newTrack.description);
      if (newTrack.photo) {
        formData.append('Photo', newTrack.photo);
      }

      const response = await axios.post('https://questionprep.azurewebsites.net/api/MainTrack/AddMainTrack', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewTrack({ tarckName: '', description: '', photo: null });
      setTracks([...tracks, response.data]);
    } catch (error) {
      console.error('Error adding track:', error);
    }
  };

  const updateTrack = async () => {
    try {
      const isNameExists = tracks.some(
        (track) =>
          track.tarckName.toLowerCase() === editTrack.tarckName.toLowerCase() &&
          track.trackId !== editTrack.trackId
      );

      if (isNameExists) {
        alert('This Track Name already exists. Please choose a different name.');
        return;
      }

      const formData = new FormData();
      if (editTrack.photo) {
        formData.append('Photo', editTrack.photo);
      }

      const response = await axios.put(
        `https://questionprep.azurewebsites.net/api/MainTrack/UpdateMaintrack/${editTrack.trackId}?TarckName=${editTrack.tarckName}&description=${editTrack.description}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setEditTrack({ trackId: null, tarckName: '', description: '', photo: null });
      fetchTracks();
    } catch (error) {
      console.error('Error updating track:', error);
      console.error('Error details:', error.response?.data);
    }
  };

  const deleteTrack = async (trackId) => {
    try {
      await axios.delete(`https://questionprep.azurewebsites.net/api/MainTrack/DeleteTrack${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTracks(tracks.filter(track => track.trackId !== trackId));
    } catch (error) {
      console.error('Error deleting track:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Main Tracks Dashboard</h1>
        </div>

        {/* Add Track Form */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Add New Track</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newTrack.tarckName}
              onChange={(e) => setNewTrack({ ...newTrack, tarckName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTrack.description}
              onChange={(e) => setNewTrack({ ...newTrack, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              onChange={(e) => setNewTrack({ ...newTrack, photo: e.target.files[0] })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTrack}
              className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Track
            </button>
          </div>
        </div>

        {/* Edit Track Form */}
        {editTrack.trackId && (
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Edit Track</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={editTrack.tarckName}
                onChange={(e) => setEditTrack({ ...editTrack, tarckName: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={editTrack.description}
                onChange={(e) => setEditTrack({ ...editTrack, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                onChange={(e) => setEditTrack({ ...editTrack, photo: e.target.files[0] })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={updateTrack}
                className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Update Track
              </button>
            </div>
          </div>
        )}

        {/* Tracks List */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Tracks List</h2>
          <ul className="space-y-4">
            {tracks.map((track) => (
              <li key={track.trackId} className="p-4 border border-gray-200 rounded-lg hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{track.tarckName}</h3>
                    <p className="text-gray-600">{track.description}</p>
                  </div>
                  <div className="space-x-2">
                    <Link
                      to={`/frameworks/${track.trackId}`}
                      className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      View Frameworks
                    </Link>
                    <button
                      onClick={() => setEditTrack(track)}
                      className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTrack(track.trackId)}
                      className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainTrackDashboard;