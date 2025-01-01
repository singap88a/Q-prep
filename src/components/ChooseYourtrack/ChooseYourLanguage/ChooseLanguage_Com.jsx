import React from "react";
import { Link } from "react-router-dom";
// Iamge-Card
import card_img from "../../../assets/ChooseTrack/Card-img.png";

// Css
import "../Z_Track.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const ChooseLanguage_Com = () => {
    const lang = [
        {
            id: 1,
            name: "Html",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 2,
            name: "CSS",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 3,
            name: "JavaScript",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 4,
            name: "React",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 5,
            name: "Vue",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 6,
            name: "Next",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 7,
            name: "TypeScript",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 8,
            name: "JQuery",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
    ];



    return (
        <>
            <div>
                <div className="head flex justify-between items-center">
                    <div className="headRight">
                        <h1 className="md:text-2xl text-lg font-semibold ">
                            <Link to="/choosetrack/1" className="text-blue-950">
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </Link>
                            FrontEnd
                        </h1>
                        <h1 className="md:text-xl ms-6 text-sm">Choose the framework</h1>
                    </div>
                    <div className="headLeft">
                        <h2 className="md:text-lg text-sm md:font-semibold font-normal text-center ">
                            Don’t know your level?
                        </h2>
                        <Link to="/test_your_level">
                            <div className="relative z-10 px-2 py-2 overflow-hidden md:font-bold font-normal md:text-lg text-sm text-center  text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary">
                                Test your level now!
                            </div>
                        </Link>
                    </div>
                </div>

                <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 my-10">
                    {lang.map((item) => (
                        <Link
                            to="level"
                            key={item.id}
                            className="card rounded-lg  h-[280px] flex justify-center items-center flex-col overflow-hidden px-8 cursor-pointer"
                        >
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
            </div>
        </>
    );
};

export default ChooseLanguage_Com;
