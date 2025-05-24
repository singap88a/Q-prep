import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEllipsisV, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";

const ManageQuestions = () => {
  const { frameworkId } = useParams();
  const navigate = useNavigate();
  const [questionsByLevel, setQuestionsByLevel] = useState({
    beginner: [],
    intermediate: [],
    advanced: [],
  });
  const [newQuestion, setNewQuestion] = useState({
    questions: "",
    answers: "",
  });
  const [editQuestion, setEditQuestion] = useState({
    questionId: null,
    questions: "",
    answers: "",
  });
  const [level, setLevel] = useState("Q_BeginnerLevel");
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const [showActions, setShowActions] = useState(null);

  useEffect(() => {
    if (token && frameworkId) {
      fetchQuestions();
    }
  }, [token, frameworkId]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const [beginnerResponse, intermediateResponse, advancedResponse] =
        await Promise.all([
          axios.get(
            `https://redasaad.azurewebsites.net/api/Questions/Q_BeginnerLevel/${frameworkId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            `https://redasaad.azurewebsites.net/api/Questions/Q_IntermediateLevel/${frameworkId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            `https://redasaad.azurewebsites.net/api/Questions/Q_AdvancedLevel/${frameworkId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

      setQuestionsByLevel({
        beginner: beginnerResponse.data,
        intermediate: intermediateResponse.data,
        advanced: advancedResponse.data,
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async () => {
    if (!newQuestion.questions || !newQuestion.answers) {
      toast.error("Please fill all fields (Question and Answer).");
      return;
    }

    try {
      await axios.post(
        `https://redasaad.azurewebsites.net/api/Questions/AddQuestionFromAdmin/${level}`,
        {
          frameworkId: frameworkId, // إضافة frameworkId هنا
          questions: newQuestion.questions,
          answers: newQuestion.answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // إعادة جلب الأسئلة بعد الإضافة
      fetchQuestions();

      setNewQuestion({ questions: "", answers: "" });
      toast.success("Question added successfully!");
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question. Please try again.");
    }
  };

  const updateQuestion = async () => {
    if (!editQuestion.questions || !editQuestion.answers) {
      toast.error("Please fill all fields (Question and Answer).");
      return;
    }

    try {
      await axios.put(
        `https://redasaad.azurewebsites.net/api/Questions/UpdateQuestion/${editQuestion.questionId}`,
        {
          questions: editQuestion.questions,
          answers: editQuestion.answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEditQuestion({ questionId: null, questions: "", answers: "" });
      fetchQuestions(); // إعادة جلب البيانات لتحديث القائمة
      toast.success("Question updated successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" }); // التمرير لأعلى
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Failed to update question. Please try again.");
    }
  };

  const deleteQuestion = async (questionId, level) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(
          `https://redasaad.azurewebsites.net/api/Questions/DeleteQuestion/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // تحديث الأسئلة للمستوى المحدد
        setQuestionsByLevel((prev) => ({
          ...prev,
          [level]: prev[level].filter(
            (question) => question.questionId !== questionId
          ),
        }));

        toast.success("Question deleted successfully!");
      } catch (error) {
        console.error("Error deleting question:", error);
        toast.error("Failed to delete question. Please try again.");
      }
    }
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 md:p-4 md:ml-64">
        <ToastContainer />
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8 md:nt-0 mt-9">
            <h1 className="md:text-2xl sm:text-lg text-[17px] font-bold text-gray-800">
              Manage Questions
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-white   rounded-lg bg-secondary hover:bg-[#552f8f]"
            >
              Back to Frameworks
            </button>
          </div>

          {/* Add/Edit Question Form */}
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md ">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              {editQuestion.questionId ? "Edit Question" : "Add New Question"}
            </h2>
            <div className="space-y-4">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="Q_BeginnerLevel">Beginner</option>
                <option value="Q_IntermediateLevel">Intermediate</option>
                <option value="Q_AdvancedLevel">Advanced</option>
              </select>
              <textarea
                placeholder="Question"
                value={
                  editQuestion.questionId
                    ? editQuestion.questions
                    : newQuestion.questions
                }
                onChange={(e) =>
                  editQuestion.questionId
                    ? setEditQuestion({
                      ...editQuestion,
                      questions: e.target.value,
                    })
                    : setNewQuestion({
                      ...newQuestion,
                      questions: e.target.value,
                    })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                rows={3}
              />
              <textarea
                placeholder="Answer"
                value={
                  editQuestion.questionId
                    ? editQuestion.answers
                    : newQuestion.answers
                }
                onChange={(e) =>
                  editQuestion.questionId
                    ? setEditQuestion({
                      ...editQuestion,
                      answers: e.target.value,
                    })
                    : setNewQuestion({
                      ...newQuestion,
                      answers: e.target.value,
                    })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                rows={5}
              />
              <div className="flex gap-2">
                <button
                  onClick={
                    editQuestion.questionId ? updateQuestion : addQuestion
                  }
                  className={`flex-1 p-3 text-white rounded-lg focus:outline-none focus:ring-2 ${editQuestion.questionId
                      ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                      : "bg-secondary hover:bg-[#552f8f] focus:ring-secondary"
                    }`}
                >
                  {editQuestion.questionId ? "Update Question" : "Add Question"}
                </button>
                {editQuestion.questionId && (
                  <button
                    onClick={() =>
                      setEditQuestion({
                        questionId: null,
                        questions: "",
                        answers: "",
                      })
                    }
                    className="flex-1 p-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Questions List
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {/* Beginner Questions */}
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  Beginner Questions
                </h3>
                <ul className="mb-6 space-y-4">
                  {questionsByLevel.beginner.map((question) => (
                    <li
                      key={question.questionId}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {question.questions}
                          </h3>
                          <p className="text-gray-600 whitespace-pre-wrap">
                            {question.answers}
                          </p>
                        </div>
                        <div className="relative actions-container">
                          <button
                            onClick={() => toggleActions(question.questionId)}
                            className="p-2 text-gray-600 hover:text-gray-800"
                          >
                            {showActions === question.questionId ? (
                              <FaTimes />
                            ) : (
                              <FaEllipsisV />
                            )}
                          </button>
                          {showActions === question.questionId && (
                            <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg">
                              <button
                                onClick={() => {
                                  setEditQuestion(question);
                                  setShowActions(null);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  }); // التمرير لأعلى
                                }}
                                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                <FaEdit className="mr-2" /> Edit
                              </button>
                              <button
                                onClick={() =>
                                  deleteQuestion(
                                    question.questionId,
                                    "beginner"
                                  )
                                }
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

                {/* Intermediate Questions */}
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  Intermediate Questions
                </h3>
                <ul className="mb-6 space-y-4">
                  {questionsByLevel.intermediate.map((question) => (
                    <li
                      key={question.questionId}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {question.questions}
                          </h3>
                          <p className="text-gray-600 whitespace-pre-wrap">
                            {question.answers}
                          </p>
                        </div>
                        <div className="relative actions-container">
                          <button
                            onClick={() => toggleActions(question.questionId)}
                            className="p-2 text-gray-600 hover:text-gray-800"
                          >
                            {showActions === question.questionId ? (
                              <FaTimes />
                            ) : (
                              <FaEllipsisV />
                            )}
                          </button>
                          {showActions === question.questionId && (
                            <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg">
                              <button
                                onClick={() => {
                                  setEditQuestion(question);
                                  setShowActions(null);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  }); // التمرير لأعلى
                                }}
                                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                <FaEdit className="mr-2" /> Edit
                              </button>
                              <button
                                onClick={() =>
                                  deleteQuestion(
                                    question.questionId,
                                    "intermediate"
                                  )
                                }
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

                {/* Advanced Questions */}
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  Advanced Questions
                </h3>
                <ul className="space-y-4">
                  {questionsByLevel.advanced.map((question) => (
                    <li
                      key={question.questionId}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {question.questions}
                          </h3>
                          <p className="text-gray-600 whitespace-pre-wrap">
                            {question.answers}
                          </p>
                        </div>
                        <div className="relative actions-container">
                          <button
                            onClick={() => toggleActions(question.questionId)}
                            className="p-2 text-gray-600 hover:text-gray-800"
                          >
                            {showActions === question.questionId ? (
                              <FaTimes />
                            ) : (
                              <FaEllipsisV />
                            )}
                          </button>
                          {showActions === question.questionId && (
                            <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg">
                              <button
                                onClick={() => {
                                  setEditQuestion(question);
                                  setShowActions(null);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  }); // التمرير لأعلى
                                }}
                                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                              >
                                <FaEdit className="mr-2" /> Edit
                              </button>
                              <button
                                onClick={() =>
                                  deleteQuestion(
                                    question.questionId,
                                    "advanced"
                                  )
                                }
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageQuestions;
