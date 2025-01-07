import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Saved_questions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { savedQuestions, setSavedQuestions } = location.state || { savedQuestions: [] }; // Assuming savedQuestions are passed down
  const [activeIndex, setActiveIndex] = useState(null); // Track which question is expanded

  const toggleAnswer = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null); // Close the answer if it's already expanded
    } else {
      setActiveIndex(index); // Expand the answer for the clicked question
    }
  };

  const handleSaveQuestion = (faq) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this question from your saved list?");
    if (isConfirmed) {
      // Remove the question from the savedQuestions list
      const updatedSavedQuestions = savedQuestions.filter((saved) => saved.question !== faq.question); // Remove the question
      setSavedQuestions(updatedSavedQuestions); // Update the state with the new list of saved questions
    }
  };

  const isQuestionSaved = (faq) => {
    return savedQuestions.some((saved) => saved.question === faq.question); // Check if the question is saved
  };

  return (
    <div className="container py-10">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-6">
        <i
          className="text-2xl font-bold cursor-pointer fa-solid fa-chevron-left text-primary"
          onClick={() => navigate(-1)} // Navigate back to the previous page
        ></i>
        <h1 className="text-xl font-bold">Saved Questions</h1>
      </div>

      {/* Saved Questions List */}
      <div className="container max-w-4xl mx-auto">
        <div className="grid gap-4 py-10 sm:grid-cols-1 md:grid-cols-1">
          {savedQuestions.length > 0 ? (
            savedQuestions.map((faq, index) => (
              <div key={index} className="p-4 bg-[#6BE9D112] border rounded-lg shadow-md">
                <button
                  onClick={() => toggleAnswer(index)} // Toggle answer visibility
                  className="flex items-center justify-between w-full text-lg font-semibold text-left"
                >
                  {faq.question}
                  <div className="flex gap-8">
                    <i
                      className={`cursor-pointer fa-regular fa-bookmark ${isQuestionSaved(faq) ? "text-primary font-bold" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent answer toggle when clicking bookmark
                        handleSaveQuestion(faq); // Remove question from saved list with confirmation
                      }}
                    ></i>
                    {activeIndex === index ? (
                      <FaChevronUp className="text-secondary" />
                    ) : (
                      <FaChevronDown className="text-secondary" />
                    )}
                  </div>
                </button>
                {activeIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
              </div>
            ))
          ) : (
            <p className="text-2xl font-bold text-center text-secondary md:text-3xl">No saved questions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Saved_questions;
