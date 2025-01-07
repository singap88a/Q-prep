import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Questions() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const navigate = useNavigate();

  const faqs = [
    { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
    { question: "What is Tailwind CSS?", answer: "Tailwind CSS is a utility-first CSS framework for creating custom designs." },
    { question: "How do I install React?", answer: "You can install React using npm with the command: npm install react." },
  ];

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

  const goToSavedQuestions = () => {
    navigate("/saved_questions", { state: { savedQuestions } });
  };

  const isQuestionSaved = (faq) => savedQuestions.some((saved) => saved.question === faq.question);

  return (
    <div className="container">
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-3">
          <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
          <h1>Front-end</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={goToSavedQuestions}
            className="px-5 py-1 border-2 rounded-full border-secondary text-secondary hover:text-white"
          >
            View Saved Questions
          </button>
          <Link
            to="/add_question"
            className="relative flex items-center gap-2 px-5 py-1 overflow-hidden border-2 rounded-full isolation-auto border-secondary text-secondary hover:text-white"
          >
            <i className="text-xl fa-solid fa-plus"></i>
            <h1 className="text-xl">Add question</h1>
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container max-w-4xl mx-auto">
        <div className="grid gap-4 py-10 sm:grid-cols-1 md:grid-cols-1">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 bg-[#6BE9D112] border rounded-lg shadow-md">
              <button
                onClick={() => toggleAnswer(index)}
                className="flex items-center justify-between w-full text-lg font-semibold text-left"
              >
                {faq.question}
                <div className="flex gap-8">
                  <i
                    className={`cursor-pointer fa-regular fa-bookmark ${isQuestionSaved(faq) ? "text-primary  font-bold" : ""}`}
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
              {activeIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Questions;
