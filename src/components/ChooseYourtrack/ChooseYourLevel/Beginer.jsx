/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft


} from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";


import { ClipLoader } from "react-spinners"; // استيراد مكون التحميل

function Beginner({ savedQuestions, setSavedQuestions, isSaved, setIsSaved }) {
  const [beginnerQuestions, setBeginnerQuestions] = useState([]);
  console.log("beginnerQuestions", beginnerQuestions);

  console.log("Isaved: ", isSaved)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const location = useLocation();
  const { frameworkId, frameworkName } = location.state || {};

  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://questionprep.azurewebsites.net/api/Questions/Q_BeginnerLevel/${frameworkId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Beginer questions");
        }
        const data = await response.json();
        setBeginnerQuestions(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [frameworkId]);


  const fetchSavedQuestions = async () => {
    try {
      const response = await fetch(
        "https://questionprep.azurewebsites.net/api/Save/GetSaveQuestions",
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
      console.log("setSavedQuestions", data);

      setIsSaved(data.map((q) => q.questionId));
    }
    catch (error) {
      console.error("Error fetching saved questions:", error);
    }
  }

  useEffect(() => {
    fetchSavedQuestions();
  }, []);


  const handleSaveQuestion = async (faq) => {
    try {
      const response = await fetch("https://questionprep.azurewebsites.net/api/Save/AddtoSave", {
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
      });

      if (!response.ok) {
        throw new Error("Failed to save question");
      }

      const savedQuestion = await response.json();
      setSavedQuestions((prev) => [...prev, savedQuestion]);
      setIsSaved((prev) => [...prev, faq.questionId]);


      toast.success("Question saved successfully!");
    }
    catch (error) {
      if (!token) {
        toast.error("Please LogIn First (o _ o) !")
      }
      else {
        console.error("Error saving question: This Question Is Aready Saved", error);
        toast.error("This Question Is Aready Saved!");
      }
    }
    fetchSavedQuestions();
  };

  // useEffect(() => {
  //   const savedIds = savedQuestions.map((q) => q.id);
  //   setIsSaved(savedIds);
  // }, [savedQuestions]);


  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <ClipLoader color="#4A90E2" size={50} /> {/* تأثير التحميل */}
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



  const toggleAnswer = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  if (!beginnerQuestions.length) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p className="text-xl">No Beginer questions found.</p>
      </div>
    );
  }



  return (
    <div className="container px-4 mx-auto">
      <ToastContainer />
      {/* Header */}
      <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
  <div className="flex items-center gap-3">
    <FaChevronLeft className="text-2xl font-bold text-primary" />
    <h1 className="text-2xl font-bold">{frameworkName}</h1>
    <FaChevronLeft className="text-2xl font-bold text-primary" />
    <h2 className="text-2xl text-gray-600">{beginnerQuestions[0]?.levelName}</h2>
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
            <div key={index} className="p-4 bg-[#6BE9D112] border rounded-lg shadow-md">
              <a
                onClick={() => toggleAnswer(index)}
                className="flex items-center justify-between w-full text-left"
                aria-expanded={activeIndex === index}
              >
                <span className="text-lg font-semibold">{faq.questions}</span>

                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveQuestion(faq);
                    }}
                    // aria-label={isSaved[faq.questionId] ? "Unsave question" : "Save question"}

                    className="text-xl text-gray-500 hover:text-primary"
                    disabled={isSaved.includes(faq.questionId)}
                  >
                    {/* {savedQuestions.some((saved) => isSaved[saved.id]) ? <FaCheck /> : <FaStar />} */}
                    {isSaved.includes(faq.questionId) ? <FaBookmark className="text-primary" /> : <FaRegBookmark className="text-primary" />}

                  </button>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-secondary" />
                  ) : (
                    <FaChevronDown className="text-secondary" />
                  )}
                </div>
              </a>
              {activeIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answers}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Beginner;
