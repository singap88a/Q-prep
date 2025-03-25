import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Sidebar";

function RequestQuestionId() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevels, setSelectedLevels] = useState({});
  const [acceptedRequests, setAcceptedRequests] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "https://questionprep.azurewebsites.net/api/Request/GetRequests",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    const selectedLevel = selectedLevels[requestId];
    if (!selectedLevel) {
      toast.error("Please select a level before accepting the question.");
      return;
    }

    const formattedLevel = selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1).toLowerCase();

    try {
      const response = await axios.post(
        `https://questionprep.azurewebsites.net/api/Questions/AddQuestion/${formattedLevel}/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Question accepted successfully!");
        
        // Call the delete API after accepting the question
        await handleDelete(requestId);
      }
    } catch (error) {
      console.error("Error accepting question:", error);
      toast.error("Failed to accept question. Please check the level and try again.");
    }
  };

  const handleDelete = async (requestId) => {
    try {
      const response = await axios.delete(
        `https://questionprep.azurewebsites.net/api/Request/DeleteRequest/${requestId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Question deleted successfully!");
        setRequests((prevRequests) =>
          prevRequests.filter((req) => req.requestId !== requestId)
        );
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question.");
    }
  };

  const handleLevelChange = (requestId, level) => {
    setSelectedLevels((prev) => ({
      ...prev,
      [requestId]: level.trim(),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <div className="flex py-10">
    <Sidebar/>

    <div className="container flex-1 p-4 py-10 md:ml-64">
      <ToastContainer />
      <h1 className="mb-6 text-2xl font-bold">Request QuestionId</h1>
      <div className="space-y-4">
        {requests.map((request) => {
          const isAccepted = acceptedRequests[request.requestId];

          return (
            <div key={request.requestId} className="p-4 border rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={`https://questionprep.azurewebsites.net/ProfilePhoto/${request.photo}`}
                  alt={request.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{request.userName}</p>
                  <p className="text-sm text-gray-600">{request.email}</p>
                </div>
              </div>
              <p className="mb-2"><strong>Question:</strong> {request.questions}</p>
              <p className="mb-2 whitespace-pre-wrap"><strong>Answer:</strong> {request.answers}</p>
              <p className="text-sm text-gray-500">
                <strong>Date:</strong> {new Date(request.dateRequest).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2 mt-4">
                {!isAccepted && (
                  <>
                    <select
                      value={selectedLevels[request.requestId] || "beginner"}
                      onChange={(e) => handleLevelChange(request.requestId, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    <button
                      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                      onClick={() => handleAccept(request.requestId)}
                    >
                      Accept
                    </button>
                  </>
                )}
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => handleDelete(request.requestId)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div> 
    </div>

  );
}

export default RequestQuestionId;