
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";



import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';


import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import html from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import ts from "react-syntax-highlighter/dist/esm/languages/prism/typescript";


SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", ts);

function detectLanguage(code) {
    const trimmed = code.trim();

    // HTML: يبدأ بـ <
    if (trimmed.startsWith("<")) return "html";

    // CSS: يحتوي على { و ends with } بدون كلمات JS
    if (
        /^[a-zA-Z0-9\s.#:\[\]\-="'()]+{\s*[^}]+\s*}$/.test(trimmed) || // قواعد CSS مثل body { color: red; }
        /^[-a-zA-Z]+:\s*[^;]+;?$/.test(trimmed) // خصائص مفردة مثل color: red;
    ) {
        return "css";
    }

    // TypeScript: يحتوي على type أو interface أو أنواع مثل :string
    if (/(interface|type\s+\w+\s*=|:\s*(string|number|boolean))/.test(trimmed)) {
        return "typescript";
    }

    // JavaScript: يحتوي على import, export, function, const, let, إلخ
    if (/^\s*(import|export|function|const|let|var|=>)/.test(trimmed)) {
        return "javascript";
    }

    // fallback: jsx
    return "jsx";
}



function Saved_questions({ isSaved, setIsSaved }) {
    // console.log("isSaved :", isSaved)
    const navigate = useNavigate();
    const [savedQuestions, setSavedQuestions] = useState([]);
    // console.log(savedQuestions)
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState(null);

    const token = localStorage.getItem("token");


    const fetchSavedQuestions = async () => {
        try {
            if (!token) {
                setSavedQuestions([]);
                throw new Error("No token found. Please log in.");
                return;
            }

            const response = await fetch("https://redasaad.azurewebsites.net/api/Save/GetSaveQuestions", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // to Edit when Empty
            if (response.status === 404) {
                setSavedQuestions([]);
                setIsSaved([]);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch saved questions");
            }

            const data = await response.json();
            // console.log("data", data);
            setSavedQuestions(data);
            const savedIds = data.map((q) => q.id);
            setIsSaved(savedIds);

        } catch (error) {
            setError(error.message);
            setSavedQuestions([]);
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



    // const handleSaveQuestion = async (faq) => {
    //     const isConfirmed = window.confirm(
    //         "Are you sure you want to remove this question from your saved list?"
    //     );
    //     if (isConfirmed) {
    //         try {
    //             const response = await fetch(
    //                 `https://redasaad.azurewebsites.net/api/Save/DeleteFromSave?Id=${faq.id}`,
    //                 {
    //                     method: "DELETE",
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             );

    //             if (!response.ok) {
    //                 throw new Error("Failed to delete question");
    //             }

    //             const updatedSavedQuestions = savedQuestions.filter(
    //                 (saved) => saved.id !== faq.id
    //             );
    //             setSavedQuestions(updatedSavedQuestions);

    //             setIsSaved((prev) => prev.filter((id) => id !== faq.id));
    //         } catch (error) {
    //             console.error("Error deleting question:", error);
    //         }
    //     }
    //     fetchSavedQuestions();
    // };

    const isQuestionSaved = (faq) => isSaved.includes(faq.id);



    const handleOpenModal = (faq) => {
        setSelectedFaq(faq);
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
        setSelectedFaq(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedFaq) return;

        try {
            const response = await fetch(
                `https://redasaad.azurewebsites.net/api/Save/DeleteFromSave?Id=${selectedFaq.id}`,
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
                (saved) => saved.id !== selectedFaq.id
            );
            setSavedQuestions(updatedSavedQuestions);

            setIsSaved((prev) => prev.filter((id) => id !== selectedFaq.id));
        } catch (error) {
            console.error("Error deleting question:", error);
        } finally {
            setShowModal(false);
            setSelectedFaq(null);
            fetchSavedQuestions();
        }
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <FontAwesomeIcon
                    icon={faSpinner}
                    className="text-4xl text-secondary animate-spin"
                />
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


            <div>
                {/* Modal Confirmation */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-lg font-semibold mb-4">
                                Are you Sure want remove question from Saved
                            </h2>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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
                                                handleOpenModal(faq)
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
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="mt-3"
                                    >
                                        <div className="p-2 bg-[#f5fdfc] rounded-lg border border-gray-200   w-full overflow-hidden sm:text-lg text-xs font-semibold">
                                            <SyntaxHighlighter language="javascript" style={oneLight}>
                                                {faq.answer}
                                            </SyntaxHighlighter>
                                        </div>

                                    </motion.div>
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

                                // {
                                //     activeIndex === index && (
                                //         // <p className="mt-2 text-gray-600">{faq.answer}</p>
                                //         <div className="p-4 bg-[#f5fdfc] rounded-lg border border-gray-200 w-full overflow-hidden sm:text-lg text-xs font-semibold">
                                //             <SyntaxHighlighter language="javascript" style={oneLight}>
                                //                 {faq.answer}
                                //             </SyntaxHighlighter>
                                //         </div>
                                //     )}