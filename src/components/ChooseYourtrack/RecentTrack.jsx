import React from 'react'

// Iamge-Card
import card_img from "../../assets/ChooseTrack/Card-img.png";

// Css
import "./Z_Track.css";
import { Link } from 'react-router-dom';

const RecentTrack = () => {

    const recent = [
        {
            id: 1,
            name: "Fornt-End",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 2,
            name: "Vue.js",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 3,
            name: "Anglur",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 4,
            name: "Dev-Ops",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 5,
            name: "BackEnd",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
        {
            id: 6,
            name: "Data Science",
            category:
                "A Front-end Developer builds the user interface of websites, ensuring they are interactive, responsive, and visually appealing.",
        },
    ];

    return (
        <div className="recent container">
            <h1 className="text-2xl font-semibold">Recent Use</h1>
            <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 my-10">
                {recent.map((item) => (
                    <Link to='../choosetrack/frontend' key={item.id} className="card rounded-lg  h-[280px] flex justify-center items-center flex-col overflow-hidden px-8 cursor-pointer" >
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
    )
}

export default RecentTrack