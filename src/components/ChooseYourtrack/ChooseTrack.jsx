import   { useState } from "react";
import card_img from "../../assets/ChooseTrack/Card-img.png";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Pagination
import { Pagination, Stack } from "@mui/material";

// Search
import Fuse from "fuse.js";

// Navigate
import { useNavigate } from "react-router-dom";

// CSS
import "./Z_Track.css";

const ChooseTrack = () => {
    // Navigation and Pagination
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
        navigate(`/choosetrack/${value}`);
    };

    // Data for tracks
    const data = [
        { id: 1, name: "Front-End", category: "Builds the user interface of websites." },
        { id: 2, name: "React", category: "A library for building interactive UIs." },
        { id: 3, name: "Vue.js", category: "A progressive framework for UIs." },
        { id: 4, name: "Angular", category: "A platform for building mobile and desktop apps." },
        { id: 5, name: "DevOps", category: "Ensures smooth development and operations." },
        { id: 6, name: "Back-End", category: "Handles server-side logic and databases." },
        { id: 7, name: "Data Science", category: "Analyzes and interprets complex data." },
    ];

    const recent = [
        { id: 1, name: "Front-End", category: "Builds the user interface of websites." },
        { id: 3, name: "Vue.js", category: "A progressive framework for UIs." },
        { id: 4, name: "Angular", category: "A platform for building mobile and desktop apps." },
        { id: 5, name: "DevOps", category: "Ensures smooth development and operations." },
        { id: 6, name: "Back-End", category: "Handles server-side logic and databases." },
        { id: 7, name: "Data Science", category: "Analyzes and interprets complex data." },
    ];

    // Search functionality
    const [querySearch, setQuerySearch] = useState("");
    const [results, setResults] = useState(data);

    const fuse = new Fuse(data, {
        keys: ["name", "category"],
        threshold: 0.3,
    });

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuerySearch(value);

        setResults(value.trim() === "" ? data : fuse.search(value).map((result) => result.item));
    };

    return (
        <div className="container my-10 chooseTrack">
            {/* Header */}
            <div className="flex flex-col items-center justify-center headTitle">
                <h1 className="text-2xl font-bold text-secondary md:text-4xl sm:text-3xl">
                    Choose Your Track Now!
                </h1>
                <p className="px-5 py-3 text-sm text-center text-gray-600 sm:text-xl md:text-2xl">
                    Whether youre a beginner or a professional, were here to help you achieve your goals with confidence.
                </p>
            </div>

            {/* Search and Cards */}
            <div className="flex flex-col items-center justify-center" style={{ padding: "20px" }}>
                {/* Search Input */}
                <div className="relative w-full max-w-lg mx-auto mt-5">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2"
                    />
                    <input
                        type="text"
                        value={querySearch}
                        onChange={handleSearch}
                        placeholder="Find Your Track..."
                        className="w-full text-sm bg-white border border-gray-300 rounded-full py-2.5 pl-10 pr-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Cards */}
                <ul className="mt-5">
                    <h1 className="text-2xl font-semibold">Popular Tracks</h1>
                    <div className="grid grid-cols-1 gap-10 my-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                        {results.map((item, index) => (
                            <div
                                key={index}
                                className="card rounded-lg h-[280px] flex justify-center items-center flex-col overflow-hidden px-8 cursor-pointer"
                                style={{ boxShadow: "0 0 5px #93c5fd" }}
                            >
                                <div className="img-card mb-4 bg-zinc-300 rounded-full p-3 w-[100px] h-[100px]">
                                    <img src={card_img} alt="" className="m-auto" />
                                </div>
                                <h3 className="mb-2 text-2xl font-medium text-center text-primary">{item.name}</h3>
                                <p className="px-2 text-sm text-center text-gray-600">{item.category}</p>
                            </div>
                        ))}
                    </div>
                </ul>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center my-7">
                <Stack spacing={2}>
                    <Pagination
                        count={6}
                        variant="outlined"
                        page={page}
                        shape="rounded"
                        onChange={handleChange}
                    />
                </Stack>
            </div>

            {/* Recent Tracks */}
            <div className="container recent">
                <h1 className="text-2xl font-semibold">Recent Use</h1>
                <div className="grid grid-cols-1 gap-10 my-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                    {recent.map((item, index) => (
                        <div
                            key={index}
                            className="card rounded-lg h-[280px] flex justify-center items-center flex-col overflow-hidden px-8 cursor-pointer"
                            style={{ boxShadow: "0 0 5px #93c5fd" }}
                        >
                            <div className="img-card mb-4 bg-zinc-300 rounded-full p-3 w-[100px] h-[100px]">
                                <img src={card_img} alt="" className="m-auto" />
                            </div>
                            <h3 className="mb-2 text-2xl font-medium text-center text-primary">{item.name}</h3>
                            <p className="px-2 text-sm text-center text-gray-600">{item.category}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChooseTrack;
