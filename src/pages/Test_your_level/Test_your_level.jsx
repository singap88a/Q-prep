import { useState } from "react";
import Test_level from "../../assets/Test_level.png";
import Test_level_2 from "../../assets/Test_level_2.png";
import Lottie from "lottie-react";
import TestYourLevel_animation from "../../../public/animations/TestYourLevel_animation.json"
import { Link } from "react-router-dom";
const TestYourLevel = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question:
        "What is the difference between div and span? When should each be used?",
      options: [
        "div is an inline element, and span is a block-level element.",
        "div is used only for styling text, while span is used for layout and structure.",
        "div is a block-level element used for structure, and span is an inline element used for styling.",
        "div and span are interchangeable and have no functional difference.",
      ],
      correctAnswer:
        "div is a block-level element used for structure, and span is an inline element used for styling.",
    },
    {
      id: 2,
      question: "What is the primary purpose of React.js?",
      options: [
        "To build server-side applications.",
        "To style web pages.",
        "To build user interfaces and manage UI state.",
        "To perform database queries.",
      ],
      correctAnswer: "To build user interfaces and manage UI state.",
    },
    {
      id: 3,
      question: "What is JSX in React?",
      options: [
        "A CSS preprocessor.",
        "A syntax extension for JavaScript.",
        "A state management library.",
        "A tool for server-side rendering.",
      ],
      correctAnswer: "A syntax extension for JavaScript.",
    },
  ];

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

  if (isSubmitted) {
    const level = getLevel();

    return (

      
      <div className="container relative flex items-center justify-center ">

        <div className="w-full p-6 text-center rounded-lg ">
          <img src={Test_level} alt="" className="mx-auto   md:w-[40%]  "  />
          <Lottie animationData={TestYourLevel_animation} className="absolute top-0"/>

          <img src={Test_level_2} alt="" className="absolute hidden w-24 top-20 left-20 md:block animate-slide" />
          <img src={Test_level_2} alt="" className="absolute hidden w-24 right-20 md:block animate-slide" />
          <Lottie animationData={TestYourLevel_animation} className="absolute top-0 right-0"/>

          <p className="text-gray-600">
            Your score is: <span className="text-blue-500">{score}</span> out of
            {questions.length}.
          </p>
          <p className="py-8 text-2xl font-bold text-secondary">
            Your Level: {level}
          </p>
          <Link to="/" className="px-10 py-2  font-bold text-white rounded-md bg-secondary hover:bg-[#33439f] transition-all my-3  ">
            Next
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
          <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
          <h1> Front-end </h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
          <h1>Test your level</h1>
        </div>
      </div>
      {/* ///////////////////////////////////// */}
      <div className="flex items-center justify-center py-10 ">
        <div className="w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-lg font-bold bg-[#67e1cb35] text-center py-3 rounded-md">
            {currentQuestionIndex + 1}- {currentQuestion.question}
          </h1>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
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
      </div>, 
    </div>
  );
};

export default TestYourLevel;




















































// import { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import Test_level from "../../assets/Test_level.png";
// import Test_level_2 from "../../assets/Test_level_2.png";
// import Lottie from "lottie-react";
// import TestYourLevel_animation from "../../../public/animations/TestYourLevel_animation.json";

// const TestYourLevel = () => {
//   const { framework } = useParams(); // الحصول على الإطار (framework) من الرابط
//   const navigate = useNavigate(); // للتنقل بين الصفحات
//   const [questions, setQuestions] = useState([]); // حالة لتخزين الأسئلة
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [loading, setLoading] = useState(true); // حالة التحميل
//   const [error, setError] = useState(null); // حالة الخطأ

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // استخراج الـ token من localStorage
//     if (!token) {
//       navigate("/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن هناك token
//       return;
//     }

//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(
//           `https://questionprep.azurewebsites.net/api/TestLevel/QuestionForTesting/${framework}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`, // إضافة الـ token إلى رؤوس الطلبات
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch questions");
//         }

//         const data = await response.json();
//         setQuestions(data); // تخزين الأسئلة في الحالة
//       } catch (error) {
//         setError(error.message); // تخزين رسالة الخطأ
//       } finally {
//         setLoading(false); // إيقاف التحميل
//       }
//     };

//     fetchQuestions();
//   }, [framework, navigate]);

//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//   };

//   const handleNext = () => {
//     if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
//       setScore(score + 1);
//     }

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption(null);
//     } else {
//       setIsSubmitted(true);
//     }
//   };

//   const handleSkip = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setSelectedOption(null);
//     } else {
//       setIsSubmitted(true);
//     }
//   };

//   const getLevel = () => {
//     const percentage = (score / questions.length) * 100;

//     if (percentage <= 50) return "Beginner";
//     if (percentage <= 80) return "Intermediate";
//     return "Advanced";
//   };

//   if (loading) {
//     return <div className="container py-10 text-center">Loading questions...</div>;
//   }

//   if (error) {
//     return (
//       <div className="container py-10 text-center text-red-500">
//         Error: {error}
//         <br />
//         <Link to="/login" className="text-blue-500 underline">
//           Go to Login
//         </Link>
//       </div>
//     );
//   }

//   if (isSubmitted) {
//     const level = getLevel();

//     return (
//       <div className="container relative flex items-center justify-center">
//         <div className="w-full p-6 text-center rounded-lg">
//           <img src={Test_level} alt="" className="mx-auto md:w-[40%]" />
//           <Lottie animationData={TestYourLevel_animation} className="absolute top-0" />

//           <img src={Test_level_2} alt="" className="absolute hidden w-24 top-20 left-20 md:block animate-slide" />
//           <img src={Test_level_2} alt="" className="absolute hidden w-24 right-20 md:block animate-slide" />
//           <Lottie animationData={TestYourLevel_animation} className="absolute top-0 right-0" />

//           <p className="text-gray-600">
//             Your score is: <span className="text-blue-500">{score}</span> out of {questions.length}.
//           </p>
//           <p className="py-8 text-2xl font-bold text-secondary">Your Level: {level}</p>
//           <Link
//             to="/"
//             className="px-10 py-2 font-bold text-white rounded-md bg-secondary hover:bg-[#33439f] transition-all my-3"
//           >
//             Next
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // التحقق من وجود الأسئلة
//   if (questions.length === 0) {
//     return (
//       <div className="container py-10 text-center">
//         <p className="text-red-500">No questions available for this framework.</p>
//         <Link to="/" className="text-blue-500 underline">
//           Go back
//         </Link>
//       </div>
//     );
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div className="container">
//       <div className="flex gap-3">
//         <div className="flex items-center justify-center gap-3">
//           <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
//           <h1> Front-end </h1>
//         </div>
//         <div className="flex items-center justify-center gap-3">
//           <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
//           <h1>Test your level</h1>
//         </div>
//       </div>
//       <div className="flex items-center justify-center py-10">
//         <div className="w-full p-6 bg-white rounded-lg shadow-lg">
//           <h1 className="mb-4 text-lg font-bold bg-[#67e1cb35] text-center py-3 rounded-md">
//             {currentQuestionIndex + 1}- {currentQuestion.question}
//           </h1>
//           <div className="space-y-4">
//             {currentQuestion.options.map((option, index) => (
//               <label
//                 key={index}
//                 className={`block p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
//                   selectedOption === option && "bg-blue-50 border-secondary"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="quiz"
//                   value={option}
//                   className="mr-2"
//                   checked={selectedOption === option}
//                   onChange={() => handleOptionChange(option)}
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>

//           <div className="flex justify-between mt-6">
//             <button
//               onClick={handleSkip}
//               className="relative z-10 px-2 py-2 overflow-hidden font-bold border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white"
//             >
//               {currentQuestionIndex < questions.length - 1 ? "Skip" : "Submit"}
//             </button>
//             <button
//               onClick={handleNext}
//               className="relative z-10 px-2 py-2 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
//               disabled={!selectedOption}
//             >
//               {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestYourLevel;