import { useState, useEffect } from "react";
import Test_level from "../../assets/Test_level.png";
import Test_level_2 from "../../assets/Test_level_2.png";
import Lottie from "lottie-react";
import TestYourLevel_animation from "../../../public/animations/TestYourLevel_animation.json";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TestYourLevel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { frameworkId, frameworkName } = location.state || {};

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(
          `https://redasaad.azurewebsites.net/api/TestLevel/QuestionForTesting/${frameworkId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        // console.log("Data:", data);

        if (!response.ok) {
          throw new Error(
            `API returned status ${response.status}: ${response.statusText}`
          );
        }

        const mappedQuestions = data.map((question) => ({
          id: question.q_Id,
          question: question.qeuestion,
          options: [question.a_1, question.a_2, question.a_3, question.a_4].filter(Boolean), // Ensure all options are included
          correctAnswer: question.correctAnswers, // Corrected property name
        }));

        setQuestions(mappedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [token, frameworkId]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setIsSubmitted(true);
    }
  };

  const getLevel = () => {
    const percentage = (score / questions.length) * 100;

    if (percentage <= 50) return "Beginner";
    if (percentage <= 80) return "Intermediate";
    return "Advanced";
  };

if (loading) {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 border-4 rounded-full border-t-secondary border-r-secondary border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute border-4 rounded-full inset-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin animation-delay-200"></div>
      </div>
      <h2 className="text-2xl font-bold text-primary">Preparing Your Test</h2>
      <p className="text-gray-600">Loading questions for {frameworkName}</p>
    </div>
  );
}

  if (error) {
    return (
      <div className="container text-center text-red-500">
        <p>Error: {error}</p>
        <p>Please check your connection or try again later.</p>
      </div>
    );
  }

  if (isSubmitted) {
    const level = getLevel();

    return (
      <div className="container relative flex items-center justify-center">
        <div className="w-full p-6 text-center rounded-lg">
          <img src={Test_level} alt="" className="mx-auto md:w-[40%]" />
          <Lottie
            animationData={TestYourLevel_animation}
            className="absolute top-0"
          />

          <img
            src={Test_level_2}
            alt=""
            className="absolute hidden w-24 top-20 left-20 md:block animate-slide"
          />
          <img
            src={Test_level_2}
            alt=""
            className="absolute hidden w-24 right-20 md:block animate-slide"
          />
          <Lottie
            animationData={TestYourLevel_animation}
            className="absolute top-0 right-0"
          />

          <p className="text-gray-600">
            Your score is: <span className="text-blue-500">{score}</span> out of{" "}
            {questions.length}.
          </p>
          <p className="py-8 text-2xl font-bold text-secondary">
            Your Level: {level}
          </p>
          <Link
            to="/"
            className="px-10 py-2 font-bold text-white rounded-md bg-secondary hover:bg-[#33439f] transition-all my-3"
          >
            Home
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <div className="flex gap-3">
        <div className="flex items-center justify-center gap-3">
          <i 
            className="text-2xl font-bold cursor-pointer fa-solid fa-chevron-left text-primary"
            onClick={() => navigate(-1)}
          ></i>
          <h1> {frameworkName} </h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <i 
            className="text-2xl font-bold cursor-pointer fa-solid fa-chevron-left text-primary"
            onClick={() => navigate(-1)}
          ></i>
          <h1>Test your level</h1>
        </div>
      </div>

      <div className="flex items-center justify-center py-10">
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-lg font-bold bg-[#67e1cb35] text-center py-3 rounded-md">
            {currentQuestionIndex + 1}- {currentQuestion.question}
          </h1>
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${selectedOption === option && "bg-blue-50 border-secondary"
                  }`}
              >
                <input
                  type="radio"
                  name="quiz"
                  value={option}
                  className="mr-2"
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleSkip}
              className="relative z-10 px-2 py-2 overflow-hidden font-bold border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white"
            >
              {currentQuestionIndex < questions.length - 1 ? "Skip" : "Submit"}
            </button>
            <button
              onClick={handleNext}
              className="relative z-10 px-2 py-2 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
              disabled={!selectedOption}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestYourLevel;