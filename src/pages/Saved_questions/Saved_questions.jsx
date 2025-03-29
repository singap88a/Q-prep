import { useState, useEffect, useId } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

function Saved_questions({ isSaved, setIsSaved }) {

    console.log("isSaved :", isSaved)
    const navigate = useNavigate();
    const [savedQuestions, setSavedQuestions] = useState([]);
    console.log(savedQuestions)
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");


    const fetchSavedQuestions = async () => {
        try {
            if (!token) {
                throw new Error("No token found. Please log in.");
            }

            const response = await fetch("https://questionprep.azurewebsites.net/api/Save/GetSaveQuestions", {
                method: "GET",
                headers: {
                    // "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch saved questions");
            }

            const data = await response.json();
            console.log("data", data);
            setSavedQuestions(data);
            // const filteredQuestions = data.filter(q => q.token === token);

            // setSavedQuestions(filteredQuestions);
            const savedIds = data.map((q) => q.id);
            setIsSaved(savedIds);

        } catch (error) {
            setError(error.message);
            console.error("Error fetching saved questions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchSavedQuestions();
        }
    }, [token]);


    const toggleAnswer = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleSaveQuestion = async (faq) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to remove this question from your saved list?"
        );
        if (isConfirmed) {
            try {
                const response = await fetch(
                    `https://questionprep.azurewebsites.net/api/Save/DeleteFromSave?Id=${faq.id}`, // إرسال Id كـ query parameter
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to delete question");
                }

                const updatedSavedQuestions = savedQuestions.filter(
                    (saved) => saved.id !== faq.id
                );
                setSavedQuestions(updatedSavedQuestions);

                setIsSaved((prev) => prev.filter((id) => id !== faq.id));
            } catch (error) {
                console.error("Error deleting question:", error);
            }
        }
        fetchSavedQuestions();
    };

    const isQuestionSaved = (faq) => isSaved.includes(faq.id);

    // const ClearSavedQuestion = () => {

    // }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <ClipLoader color="#4A90E2" size={50} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-2xl font-bold text-center text-secondary md:text-3xl">
                <p className="py-10">{error}</p>
            </div>
        );
    }

    return (
        <div className="container py-10">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-6">
                <i
                    className="text-2xl font-bold cursor-pointer fa-solid fa-chevron-left text-primary"
                    onClick={() => navigate(-1)}
                ></i>
                <h1 className="text-xl font-bold">Saved Questions</h1>
            </div>

            {/* Saved Questions List */}
            <div className="container max-w-4xl mx-auto">
                <div className="grid gap-4 py-10 sm:grid-cols-1 md:grid-cols-1">
                    {savedQuestions.length > 0 ? (
                        savedQuestions.map((faq, index) => (
                            <div
                                key={index}
                                className="p-4 bg-[#6BE9D112] border rounded-lg shadow-md"
                            >
                                <button
                                    onClick={() => toggleAnswer(index)}
                                    className="flex items-center justify-between w-full text-lg font-semibold text-left"
                                >
                                    {faq.question}
                                    <div className="flex gap-8">
                                        <i
                                            className={`cursor-pointer fa-regular fa-bookmark ${isQuestionSaved(faq) ? "text-primary font-bold" : ""
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
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
                                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-2xl font-bold text-center text-secondary md:text-3xl">
                            No saved questions yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Saved_questions;
