import { useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom"; // استيراد useParams و useLocation

function Add_question() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  // الحصول على frameworkId من الرابط أو حالة التنقل
  const { frameworkId } = useParams(); // إذا كان frameworkId جزءًا من الرابط
  const location = useLocation(); // إذا كان frameworkId جزءًا من حالة التنقل
  const resolvedFrameworkId = frameworkId || location.state?.frameworkId;

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim()) {
      alert("Please fill out both fields.");
      return;
    }

    if (!resolvedFrameworkId) {
      alert("Framework ID is missing.");
      return;
    }

    try {
      const response = await axios.post(
        "https://questionprep.azurewebsites.net/api/Request/AddQuestionRequest",
        {
          frameworkId: resolvedFrameworkId, // استخدام frameworkId بدلاً من frameworkName
          questions: question,
          answers: answer,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setQuestion("");
        setAnswer("");
        setMessage("Question added successfully!");
        setTimeout(() => setMessage(""), 4000);
      }
    } catch (error) {
      console.error("Error adding question:", error);
      setMessage("Failed to add question.");
    }
  };

  return (
    <div className="container ">
      <div className="flex gap-3">
        <div className="flex items-center justify-center gap-3">
          <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
          <h1> Front-end</h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
          <h1> Add question</h1>
        </div>
      </div>
      <div className="pt-10 pb-20">
        <input
          className="w-full p-4 mb-4 border-[3px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-none border-secondary"
          type="text"
          placeholder="Write the right answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <textarea
          className="w-full p-4 mb-4 border-[3px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-none border-secondary"
          placeholder="Write your question"
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <div className="">
          <button
            className="relative z-10 px-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary "
            onClick={handleSubmit}
          >
            Submit
          </button>
          {message && (
            <div className="flex w-[30%] overflow-hidden bg-white border-2 shadow-lg rounded-xl border-[#66cd70] mt-5 absolute top-12 right-24">
              <svg width="16" height="75" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 8 0 
               Q 4 4.8, 8 9.6 
               T 8 19.2 
               Q 4 24, 8 28.8 
               T 8 38.4 
               Q 4 43.2, 8 48 
               T 8 57.6 
               Q 4 62.4, 8 67.2 
               T 8 76.8 
               Q 4 81.6, 8 86.4 
               T 8 96 
               L 0 96 
               L 0 0 
               Z"
                  fill="#66cd70"
                  stroke="#66cd70"
                ></path>
              </svg>
              <div className="mx-2.5 overflow-hidden w-full">
                <p className="mt-1.5 text-xl font-bold text-[#66cd70] leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap">
                  {message}
                </p>
                <p className="overflow-hidden leading-5 break-all text-zinc-400 max-h-10">
                  The question is reviewed before publishing
                </p>
              </div>
              <button className="w-16 cursor-pointer focus:outline-none text-[#66cd70]">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="mediumseagreen"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Add_question;