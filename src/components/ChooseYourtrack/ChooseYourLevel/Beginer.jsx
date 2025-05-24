/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaChevronLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

function Beginner({ savedQuestions, setSavedQuestions, isSaved, setIsSaved }) {
  const [beginnerQuestions, setBeginnerQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();
  const { frameworkId, frameworkName } = location.state || {};
  const token = localStorage.getItem("token");

  // Fetch beginner questions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://redasaad.azurewebsites.net/api/Questions/Q_BeginnerLevel/${frameworkId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Beginner questions");
        }
        const data = await response.json();
        setBeginnerQuestions(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [frameworkId]);

  // Fetch saved questions
  const fetchSavedQuestions = async () => {
    try {
      if (!token) return;
      
      const response = await fetch(
        "https://redasaad.azurewebsites.net/api/Save/GetSaveQuestions",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch saved questions");
      }

      const data = await response.json();
      setSavedQuestions(data);
      setIsSaved(data.map((q) => q.questionId));
    } catch (error) {
      console.error("Error fetching saved questions:", error);
    }
  };

  useEffect(() => {
    fetchSavedQuestions();
  }, []);

  // Handle saving questions
  const handleSaveQuestion = async (faq) => {
    try {
      if (!token) {
        toast.error("Please LogIn First (o _ o) !");
        return;
      }

      const response = await fetch(
        "https://redasaad.azurewebsites.net/api/Save/AddtoSave",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            questionId: faq.questionId,
            question: faq.questions,
            answer: faq.answers,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save question");
      }

      const savedQuestion = await response.json();
      setSavedQuestions((prev) => [...prev, savedQuestion]);
      setIsSaved((prev) => [...prev, faq.questionId]);
      toast.success("Question saved successfully!");
    } catch (error) {
      console.error("Error saving question:", error);
      toast.error(
        error.message.includes("already")
          ? "This question is already saved!"
          : "Failed to save question"
      );
    }
  };

  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Add function to handle code highlighting
  const handleCodeHighlight = (text) => {
    try {
      // Try to detect the language automatically
      const result = hljs.highlightAuto(text);
      return result.value;
    } catch (error) {
      return text;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-4xl text-secondary animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    );
  }

  if (!beginnerQuestions.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-xl text-gray-600">No Beginner questions found.</p>
        <Link
          to="/add_question"
          state={{ frameworkId, frameworkName }}
          className="px-4 py-2 font-bold text-white rounded-full bg-secondary hover:bg-primary"
        >
          Add First Question
        </Link>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <FaChevronLeft className="text-2xl font-bold text-primary" />
          <h1 className="text-2xl font-bold">{frameworkName}</h1>
          <FaChevronLeft className="text-2xl font-bold text-primary" />
          <h2 className="text-2xl text-gray-600">
            {beginnerQuestions[0]?.levelName}
          </h2>
        </div>

        <Link
          state={{ frameworkId, frameworkName }}
          to="/add_question"
          className="flex items-center self-start gap-2 px-4 py-2 font-bold text-white transition-all duration-300 rounded-full bg-secondary hover:bg-primary md:self-auto"
        >
          <span className="text-xl">+</span>
          <span>Add Question</span>
        </Link>
      </div>

      {/* Questions List */}
      <div className="container max-w-4xl mx-auto">
        <div className="grid gap-4 py-6">
          {beginnerQuestions.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-[#6BE9D112] border rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
            >
              <div
                onClick={() => toggleAnswer(index)}
                className="flex items-center justify-between w-full cursor-pointer"
                aria-expanded={activeIndex === index}
              >
                <span className="text-lg font-semibold">{faq.questions}</span>

                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveQuestion(faq);
                    }}
                    className="text-xl transition-transform hover:scale-110"
                    disabled={isSaved.includes(faq.questionId)}
                    aria-label={
                      isSaved.includes(faq.questionId)
                        ? "Question saved"
                        : "Save question"
                    }
                  >
                    {isSaved.includes(faq.questionId) ? (
                      <FaBookmark className="text-primary" />
                    ) : (
                      <FaRegBookmark className="text-primary" />
                    )}
                  </button>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-secondary" />
                  ) : (
                    <FaChevronDown className="text-secondary" />
                  )}
                </div>
              </div>
              
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                  className="mt-3"
                >
                  <pre className="p-4 bg-[#f5fdfc] rounded-lg overflow-x-auto border border-gray-200">
                    <code 
                      className="text-sm font-mono"
                      dangerouslySetInnerHTML={{ 
                        __html: handleCodeHighlight(faq.answers) 
                      }} 
                    />
                  </pre>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Beginner;