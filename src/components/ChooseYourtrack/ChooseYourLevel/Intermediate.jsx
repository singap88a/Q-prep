/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaStar, FaCheck, FaChevronLeft } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

function Intermediate({
    savedQuestions,
    setSavedQuestions,
    isSaved,
    setIsSaved,
}) {
    const [intermediateQuestions, setIntermediateQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    const location = useLocation();
    const { frameworkId, frameworkName } = location.state || {
        frameworkId: null,
        frameworkName: "Intermediate Level",
    };

    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

    useEffect(() => {
        if (!frameworkId) {
            setError("Framework ID is missing.");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://questionprep.azurewebsites.net/api/Questions/Q_IntermediateLevel/${frameworkId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch intermediate questions");
                }
                const data = await response.json();
                setIntermediateQuestions(data);
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
            if (!token) return;

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
            console.log("setSavedQuestions", data);
            setSavedQuestions(data);
        } catch (error) {
            console.error("Error fetching saved questions:", error);
        }
    };

    useEffect(() => {
        fetchSavedQuestions();
    }, []);

    const toggleAnswer = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleSaveQuestion = async (faq) => {
        console.log("isSaved[faq.id]", isSaved[faq.id]);
        if (!isSaved[faq.id]) {
            try {
                const response = await fetch(
                    "https://questionprep.azurewebsites.net/api/Save/AddtoSave",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            id: faq.questionId,
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
                setIsSaved((prev) => [...prev, faq.id]);

                alert("Question saved successfully!");
            } catch (error) {
                console.error("Error saving question:", error);
                alert("This Question Is Aready Saved!");
            }
        }
        fetchSavedQuestions();
    };

    useEffect(() => {
        const savedIds = savedQuestions.map((q) => q.id);
        setIsSaved(savedIds);
    }, [savedQuestions]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                <p className="text-xl font-semibold">{error}</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <ClipLoader color="#4A90E2" size={50} />
            </div>
        );
    }


    if (!intermediateQuestions.length) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-600">
                <p className="text-xl">
                    No intermediate questions available for this framework.
                </p>
            </div>
        );
    }

    return (
        <div className="container px-4 mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between py-6">
                <div className="flex items-center gap-3">

                    <FaChevronLeft className="text-2xl font-bold text-primary" />

                    <h1 className="text-2xl font-bold">{frameworkName}</h1>
                    <FaChevronLeft className="text-2xl font-bold text-primary" />

                    <h2 className="text-2xl text-gray-600">
                        {intermediateQuestions[0]?.levelName || "Intermediate Level"}
                    </h2>
                </div>
                <Link
                    state={{ frameworkId, frameworkName }} // تمرير frameworkName هنا
                    to="/add_question"
                    className="flex items-center gap-2 px-4 py-2 font-bold text-white transition-all duration-300 rounded-full bg-secondary hover:bg-primary"
                >
                    <span className="text-xl">+</span>
                    <span>Add Question</span>
                </Link>
            </div>

            {/* Questions List */}
            <div className="max-w-4xl mx-auto">
                <div className="grid gap-4 py-6">
                    {intermediateQuestions.map((faq, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white border rounded-lg shadow-md"
                        >
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
                                        aria-label={
                                            isSaved[faq.questionId] ? "Unsave question" : "Save question"
                                        }
                                        className="text-xl text-gray-500 hover:text-primary"
                                        disabled={isSaved.includes(faq.questionId)}
                                    >
                                        {/* {savedQuestions.some((saved) => isSaved[saved.id]) ? <FaCheck /> : <FaStar />} */}
                                        {isSaved.includes(faq.questionId) ? <FaCheck /> : <FaStar />}

                                    </button>
                                    {activeIndex === index ? (
                                        <FaChevronUp className="text-secondary" />
                                    ) : (
                                        <FaChevronDown className="text-secondary" />
                                    )}
                                </div>
                            </a>
                            {activeIndex === index && (
                                <p className="mt-3 text-gray-600 whitespace-pre-wrap">{faq.answers}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Intermediate;
