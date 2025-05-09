import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import Sidebar from "./Sidebar";

const Groups = () => {
  // eslint-disable-next-line no-unused-vars
  const { token, isLoggedIn, userRole } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({
    groupName: "",
    description: "",
    photo: null
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState({
    page: false,
    form: false
  });
  const [message, setMessage] = useState({
    type: null, // 'error' or 'success'
    content: ""
  });

  const apiClient = axios.create({
    baseURL: "https://redasaad.azurewebsites.net/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchGroups = async () => {
    try {
      setLoading(prev => ({...prev, page: true}));
      const response = await apiClient.get("/Groups/GetAllGroups");
      setGroups(response.data);
    } catch (error) {
      showMessage("error", "Failed to fetch groups: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(prev => ({...prev, page: false}));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.groupName || !formData.description) {
      showMessage("error", "Please fill all required fields");
      return;
    }

    if (!editingId && !formData.photo) {
      showMessage("error", "Please select a group photo");
      return;
    }

    const formPayload = new FormData();
    if (formData.photo) formPayload.append("Photo", formData.photo);

    try {
      setLoading(prev => ({...prev, form: true}));
      
      if (editingId) {
        await apiClient.put(
          `/Groups/UpdateGroup/${editingId}?GroupName=${encodeURIComponent(formData.groupName)}&Description=${encodeURIComponent(formData.description)}`,
          formPayload,
          {
            headers: {
              "Content-Type": formData.photo ? "multipart/form-data" : "application/json",
            },
          }
        );
        showMessage("success", "Group updated successfully");
      } else {
        await apiClient.post(
          `/Groups/CreateGroup?GroupName=${encodeURIComponent(formData.groupName)}&Description=${encodeURIComponent(formData.description)}`,
          formPayload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        showMessage("success", "Group created successfully");
      }
      
      resetForm();
      await fetchGroups();
    } catch (error) {
      showMessage("error", `Failed to ${editingId ? "update" : "create"} group: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(prev => ({...prev, form: false}));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      setLoading(prev => ({...prev, page: true}));
      await apiClient.delete(`/Groups/DeleteGroup/${id}`);
      showMessage("success", "Group deleted successfully");
      await fetchGroups();
    } catch (error) {
      showMessage("error", "Failed to delete group: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(prev => ({...prev, page: false}));
    }
  };

  const setupEditForm = (group) => {
    setEditingId(group.id);
    setFormData({
      groupName: group.groupName,
      description: group.description,
      photo: null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      groupName: "",
      description: "",
      photo: null
    });
  };

  const showMessage = (type, content) => {
    setMessage({ type, content });
    setTimeout(() => setMessage({ type: null, content: "" }), 5000);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchGroups();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="container p-4 mx-auto">
        <div className="p-4 text-red-700 bg-red-100 rounded">
          You must be logged in to view this page
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen p-4 bg-gray-100 md:ml-64">
        <h1 className="mb-6 text-2xl font-bold text-center">Groups Management</h1>

        {message.type && (
          <div className={`p-4 mb-6 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.content}
          </div>
        )}

        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold">
            {editingId ? "Edit Group" : "Add New Group"}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-4">
                <label className="block mb-2 font-medium">Group Name *</label>
                <input
                  type="text"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  {editingId ? "Change Photo" : "Group Photo *"}
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                  accept="image/*"
                  required={!editingId}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={loading.form}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 text-white rounded bg-secondary hover:bg-[#552f8f] disabled:bg-blue-300"
                disabled={loading.form}
              >
                {loading.form ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : editingId ? "Save Changes" : "Add Group"}
              </button>
            </div>
          </form>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">Groups List</h2>
          {loading.page ? (
            <div className="flex justify-center p-8">
              <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : groups.length === 0 ? (
            <div className="p-4 text-center text-gray-500 bg-gray-100 rounded">
              No groups available currently
            </div>
          ) : (
            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.id} className="flex flex-col p-4 bg-white rounded-lg shadow-md md:flex-row md:items-center md:space-x-4">
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    {group.photo ? (
                      <div className="w-20 h-20 overflow-hidden rounded-full">
                        <img
                          src={`https://prep.blob.core.windows.net/photosprep/${group.photo}`}
                          alt={group.groupName}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/80?text=No+Image";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col justify-between md:flex-row md:items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{group.groupName}</h3>
                        <p className="text-gray-600 line-clamp-2">
                          {group.description || "No description available"}
                        </p>
                      </div>
                      <span className="mt-2 text-sm text-gray-500 md:mt-0">
                        Members: {group.numberOfMembers || 0}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex self-end mt-4 space-x-2 md:self-center md:mt-0">
                    <button
                      onClick={() => setupEditForm(group)}
                      className="p-2 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(group.id)}
                      className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Groups;