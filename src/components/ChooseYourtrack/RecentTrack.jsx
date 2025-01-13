 
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
                "A Front-end Developer builds the user interface of websites, ensuring  ",
        },
        {
            id: 2,
            name: "Vue.js",
            category:
            "A Front-end Developer builds the user interface of websites, ensuring  ",
        },
        {
            id: 3,
            name: "Anglur",
            category:
            "A Front-end Developer builds the user interface of websites, ensuring  ",
        },
        {
            id: 4,
            name: "Dev-Ops",
            category:
            "A Front-end Developer builds the user interface of websites, ensuring  ",
        },
        {
            id: 5,
            name: "BackEnd",
            category:
            "A Front-end Developer builds the user interface of websites, ensuring  ",
        },
        {
            id: 6,
            name: "Data Science",
            category:
            "A Front-end Developer builds the user interface of websites, ensuring  ",
        },
    ];

    return (
        <div className="container recent">
            <h1 className="text-2xl font-semibold">Recent Use</h1>
            <div className="grid grid-cols-1 gap-10 my-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {recent.map((item) => (
                    <Link to='../choosetrack/frontend' key={item.id} className="card " >
                        <div className="bg_card">
                            <img src={card_img} alt="" className="m-auto" />
                        </div>
                        <h3 className="">
                            {item.name}
                        </h3>
                        <p className="">
                            {item.category}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default RecentTrack