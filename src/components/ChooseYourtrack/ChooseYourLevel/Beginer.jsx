/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

 function Beginer({ savedQuestions, setSavedQuestions }) {
  const [BeginQuestions, setBeginQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { frameworkId, frameworkName } = location.state || {};

  console.log("Received Framework ID: in Beginer :", frameworkId);
  console.log("Received Framework Name: in Beginer :", frameworkName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://questionprep.azurewebsites.net/api/Questions/Q_BeginnerLevel/${frameworkId}`
        );
        const data = await response.json();
        console.log(data);
        setBeginQuestions(data);
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleSaveQuestion = (faq) => {
     if (!savedQuestions.some((saved) => saved.question === faq.question)) {
      setSavedQuestions([...savedQuestions, faq]);
    }
  };

   const isQuestionSaved = (faq) =>
    savedQuestions.some((saved) => saved.question === faq.question);

  if (loading) {
    console.log("Loading state:", loading);
    return (
      <div className="flex justify-center text-center text-black text-gl">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="mt-10 font-semibold text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-3">
          <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
          <h1 className="text-2xl font-bold">
            {BeginQuestions[0]?.frameworkName}
          </h1>
          <h1>{BeginQuestions[0]?.levelName}</h1>
        </div>
        <div className="flex gap-4">
          <Link
            to="/add_question"
            className="relative flex items-center gap-3 px-4 py-1 overflow-hidden font-bold border-2 rounded-full isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white"
          >
            <i className="text-xl fa-solid fa-plus"></i>
            <h1 className="text-xl">Add question</h1>
          </Link>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto">
        <div className="grid gap-4 py-10 sm:grid-cols-1 md:grid-cols-1">
          {BeginQuestions.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-[#6BE9D112] border rounded-lg shadow-md"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="flex items-center justify-between w-full text-lg font-semibold text-left"
              >
                {faq.questions} {faq.questionId}
                <div className="flex gap-8">
                  <i
                    className={`cursor-pointer fa-regular fa-bookmark ${
                      isQuestionSaved(faq) ? "text-primary  font-bold" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent button click from toggling answer
                      handleSaveQuestion(faq);
                    }}
                  ></i>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-secondary" />
                  ) : (
                    <FaChevronDown className="text-secondary" />
                  )}
                </div>
              </button>
              {activeIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answers}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Beginer;
