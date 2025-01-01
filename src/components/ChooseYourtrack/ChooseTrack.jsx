import React, { useState } from "react";

// Iamge-Card
import card_img from "../../assets/ChooseTrack/Card-img.png";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// pagination
import { Pagination, Stack } from "@mui/material";

// Search
import Fuse from "fuse.js";

// Navigate
import { Link, useNavigate, useParams } from "react-router-dom";

// Css
import "./Z_Track.css";

const ChooseTrack = () => {
    const data = [
        {
            id: 1,
            name: "Fornt-End",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
            content: ["HTML", "CSS", "JavaScript", "React", "Vue"],
        },
        {
            id: 2,
            name: "React",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
            content: ["HTML", "CSS", "JavaScript", "React", "Vue"],
        },
        {
            id: 3,
            name: "Vue.js",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
            content: ["HTML", "CSS", "JavaScript", "React", "Vue"],
        },
        {
            id: 4,
            name: "Anglur",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
            content: ["HTML", "CSS", "JavaScript", "React", "Vue"],
        },
        {
            id: 5,
            name: "Dev-Ops",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
            content: ["Git", "Docker", "Webpack", "Postman", "Figma"],
        },
        {
            id: 6,
            name: "BackEnd",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
            content: ["Node.js", "Python", "Ruby", "Java", "PHP"],
        },
        {
            id: 7,
            name: "Data Science",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
            content: ["HTML", "CSS", "JavaScript", "React", "Vue"],
        },
        {
            id: 8,
            name: "BackEnd",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
            content: ["Node.js", "Python", "Ruby", "Java", "PHP"],
        },
    ];



    // Pagination
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);

    // Search
    const handleChange = (event, value) => {
        setPage(value);
        navigate(`/choosetrack/${value}`);
    };



    const [querySearch, setquerySearch] = useState("");
    const [results, setResults] = useState(data);

    const fuse = new Fuse(data, {
        keys: ["name", "category"],
        threshold: 0.3,
    });

    const handleSearch = (e) => {
        const value = e.target.value;
        setquerySearch(value);
        console.log("fire");
        if (value.trim() === "") {
            setResults(data);
        } else {
            const fuzzyResults = fuse.search(value);
            setResults(fuzzyResults.map((result) => result.item));
        }
    };



    return (
        <div className="chooseTrack my-10 container">
            <div className="headTitle flex justify-center items-center flex-col">
                <h1 className="text-secondary text-2xl md:text-4xl sm:text-3xl font-bold">
                    Choose Your track now!
                </h1>
                <p
                    style={{ margin: "auto" }}
                    className="text-center text-sm text-gray-600 sm:text:xl md:text-2xl py-3 px-5"
                >
                    Whether you're a beginner or a professional, we're here to help you
                    achieve your goals with confidence.
                </p>
            </div>

            {/* --cards && search-- */}
            <div className="flex justify-center items-center flex-col" style={{ padding: "20px" }} >
                {/* --Search-- */}
                <div className="relative w-full max-w-lg mx-auto mt-5">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        value={querySearch}
                        onChange={handleSearch}
                        placeholder="Find Your Track..."
                        className="w-full placeholder:text-gray-400 placeholder:font-medium text-sm bg-white border border-gray-300 rounded-full py-2.5 pl-10 pr-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:focus:opacity-0"
                    />
                </div>

                {/* --Cards-- */}
                <ul style={{ marginTop: "20px" }}>
                    <h1 className="text-2xl font-semibold">Popular Tracks</h1>
                    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 my-10">
                        {results.map((item) => (

                            <Link to={`../choosetrack/lang`} className="card rounded-lg  h-[280px] flex justify-center items-center flex-col overflow-hidden px-8 cursor-pointer" >
                                <div className="img-card mb-4 bg-zinc-300 rounded-full p-3 w-[100px]  h-[100px] lg:w-[100px] lg:h-[100px] md:w-[95px] md:h-[95px]">
                                    <img src={card_img} alt="" className="m-auto" />
                                </div>
                                <h3 className="title text-center mb-2 text-2xl font-medium text-primary ">
                                    {item.name}
                                </h3>
                                <p className="desc text-center text-sm md:text-xs  sm:text-xs text-gray-600 px-2">
                                    {item.category}
                                </p>
                            </Link>
                        ))}
                    </div>
                </ul>
            </div>

            {/* --Pagination-- */}
            <div className="pagination-cards my-7 flex justify-center items-center">
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

        </div>
    );
}

export default ChooseTrack;