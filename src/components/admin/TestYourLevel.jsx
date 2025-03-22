/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEllipsisV, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

const TestYourLevel = () => {
  const { frameworkId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    qeuestion: "",
    a_1: "",
    a_2: "",
    a_3: "",
    a_4: "",
    correctAnswers: "",
    frameworkId: frameworkId,
  });
  const [editQuestion, setEditQuestion] = useState({
    q_Id: null,
    qeuestion: "",
    a_1: "",
    a_2: "",
    a_3: "",
    a_4: "",
    correctAnswers: "",
    frameworkId: frameworkId,
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(null); // حالة إظهار الأزرار
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    if (frameworkId) {
      fetchQuestions();
    }
  }, [frameworkId]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://questionprep.azurewebsites.net/api/TestLevel/QuestionForTesting/${frameworkId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async () => {
    if (
      !newQuestion.qeuestion ||
      !newQuestion.a_1 ||
      !newQuestion.a_2 ||
      !newQuestion.a_3 ||
      !newQuestion.a_4 ||
      !newQuestion.correctAnswers
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `https://questionprep.azurewebsites.net/api/TestLevel/AddQuestionInTest`,
        newQuestion,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setQuestions([...questions, response.data]);
      setNewQuestion({
        qeuestion: "",
        a_1: "",
        a_2: "",
        a_3: "",
        a_4: "",
        correctAnswers: "",
        frameworkId: frameworkId,
      });
      toast.success("Question added successfully!");
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question. Please try again.");
    }
  };

  const updateQuestion = async () => {
    if (
      !editQuestion.qeuestion ||
      !editQuestion.a_1 ||
      !editQuestion.a_2 ||
      !editQuestion.a_3 ||
      !editQuestion.a_4 ||
      !editQuestion.correctAnswers
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      await axios.put(
        `https://questionprep.azurewebsites.net/api/TestLevel/UpdateQuestionInTest/${editQuestion.q_Id}`,
        editQuestion,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditQuestion({
        q_Id: null,
        qeuestion: "",
        a_1: "",
        a_2: "",
        a_3: "",
        a_4: "",
        correctAnswers: "",
        frameworkId: frameworkId,
      });
      setIsEditing(false);
      fetchQuestions();
      toast.success("Question updated successfully!");
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Failed to update question. Please try again.");
    }
  };

  const deleteQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(
          `https://questionprep.azurewebsites.net/api/TestLevel/DeleteQuestionInTest/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuestions(questions.filter((question) => question.q_Id !== questionId));
        toast.success("Question deleted successfully!");
      } catch (error) {
        console.error("Error deleting question:", error);
        toast.error("Failed to delete question. Please try again.");
      }
    }
  };

  const handleEditClick = (question) => {
    setEditQuestion(question);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // التمرير لأعلى
  };

  const toggleActions = (questionId) => {
    setShowActions(showActions === questionId ? null : questionId);
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
        <h1 className="text-3xl font-bold text-center text-gray-800">Test Your Level</h1>

        {/* Add/Edit Question Form */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            {isEditing ? "Edit Question" : "Add New Question"}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Question"
              value={isEditing ? editQuestion.qeuestion : newQuestion.qeuestion}
              onChange={(e) =>
                isEditing
                  ? setEditQuestion({ ...editQuestion, qeuestion: e.target.value })
                  : setNewQuestion({ ...newQuestion, qeuestion: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Answer 1"
              value={isEditing ? editQuestion.a_1 : newQuestion.a_1}
              onChange={(e) =>
                isEditing
                  ? setEditQuestion({ ...editQuestion, a_1: e.target.value })
                  : setNewQuestion({ ...newQuestion, a_1: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Answer 2"
              value={isEditing ? editQuestion.a_2 : newQuestion.a_2}
              onChange={(e) =>
                isEditing
                  ? setEditQuestion({ ...editQuestion, a_2: e.target.value })
                  : setNewQuestion({ ...newQuestion, a_2: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Answer 3"
              value={isEditing ? editQuestion.a_3 : newQuestion.a_3}
              onChange={(e) =>
                isEditing
                  ? setEditQuestion({ ...editQuestion, a_3: e.target.value })
                  : setNewQuestion({ ...newQuestion, a_3: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Answer 4"
              value={isEditing ? editQuestion.a_4 : newQuestion.a_4}
              onChange={(e) =>
                isEditing
                  ? setEditQuestion({ ...editQuestion, a_4: e.target.value })
                  : setNewQuestion({ ...newQuestion, a_4: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Correct Answer"
              value={isEditing ? editQuestion.correctAnswers : newQuestion.correctAnswers}
              onChange={(e) =>
                isEditing
                  ? setEditQuestion({ ...editQuestion, correctAnswers: e.target.value })
                  : setNewQuestion({ ...newQuestion, correctAnswers: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={isEditing ? updateQuestion : addQuestion}
                className={`flex-1 p-3 text-white rounded-lg focus:outline-none focus:ring-2 ${
                  isEditing
                    ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                    : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                }`}
              >
                {isEditing ? "Update Question" : "Add Question"}
              </button>
              {isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditQuestion({
                      q_Id: null,
                      qeuestion: "",
                      a_1: "",
                      a_2: "",
                      a_3: "",
                      a_4: "",
                      correctAnswers: "",
                      frameworkId: frameworkId,
                    });
                  }}
                  className="flex-1 p-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Questions List</h2>
          {loading ? (
            <div className="flex items-center justify-center">
              <CircleLoader color="#3B82F6" loading={loading} size={50} />
            </div>
          ) : questions.length === 0 ? (
            <p>No questions available.</p>
          ) : (
            <ul className="space-y-4">
              {questions.map((question) => (
                <li key={question.q_Id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{question.qeuestion}</h3>
                      <p className="text-gray-600">A1: {question.a_1}</p>
                      <p className="text-gray-600">A2: {question.a_2}</p>
                      <p className="text-gray-600">A3: {question.a_3}</p>
                      <p className="text-gray-600">A4: {question.a_4}</p>
                      <p className="text-gray-600">Correct Answer: {question.correctAnswers}</p>
                    </div>
                    <div className="relative actions-container">
                      <button
                        onClick={() => toggleActions(question.q_Id)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                      >
                        {showActions === question.q_Id ? <FaTimes /> : <FaEllipsisV />}
                      </button>
                      {showActions === question.q_Id && (
                        <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg">
                          <button
                            onClick={() => {
                              handleEditClick(question);
                              setShowActions(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaEdit className="mr-2" /> Edit
                          </button>
                          <button
                            onClick={() => deleteQuestion(question.q_Id)}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <FaTrash className="mr-2" /> Delete
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

export default TestYourLevel;