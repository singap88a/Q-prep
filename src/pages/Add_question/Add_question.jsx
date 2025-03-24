import { useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_question() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // الحصول على frameworkId و frameworkName من الرابط أو حالة التنقل
  const { frameworkId } = useParams(); // إذا كان frameworkId جزءًا من الرابط
  const location = useLocation(); // إذا كان frameworkId جزءًا من حالة التنقل
  const resolvedFrameworkId = frameworkId || location.state?.frameworkId;
  const frameworkName = location.state?.frameworkName; // الحصول على اسم الفريم ورك

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim()) {
      toast.error("Please fill out both fields.");
      return;
    }

    if (!resolvedFrameworkId) {
      toast.error("Framework ID is missing.");
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
        toast.success("Question added successfully!");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question.");
    }
  };

  return (
    <div className="container ">
      <div className="flex gap-3">
        <div className="flex items-center justify-center gap-3">
          <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
          <h1>{frameworkName}</h1> {/* عرض اسم الفريم ورك هنا */}
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
          placeholder="Write your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          className="w-full p-4 mb-4 border-[3px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-none border-secondary"
          placeholder="Write the right answer"
          rows="4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
        <div className="">
          <button
            className="relative z-10 px-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Add_question;