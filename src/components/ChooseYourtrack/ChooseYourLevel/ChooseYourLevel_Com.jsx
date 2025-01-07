 
import { Link } from 'react-router-dom';
// Iamge-Card
import card_img from "../../../assets/ChooseTrack/Card-img.png";

// Css
import "../Z_Track.css";
 

const ChooseLanguage_Com = () => {
    const level = [
        {
            id: 1,
            name: "Beginer",
        },
        {
            id: 2,
            name: "Intermediate",
        },
        {
            id: 3,
            name: "Advanced",
        },

    ];
    return (
        <>
            <div>
            <div className="flex items-center justify-between head">
          <div className="headRight">
            <div className="flex gap-3">
              <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
              <h1>Front-end</h1>
            </div>

            <h1 className="text-sm text-gray-600 md:text-xl ms-6">Choose the framework</h1>
          </div>
          <div className="headLeft">
            <h2 className="my-1 text-sm font-normal text-center md:text-lg md:font-semibold">
              Don’t know your level?
            </h2>
            <Link to="/test_your_level">
              <div className="relative z-10 px-2 py-1 overflow-hidden font-semibold text-center text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary">
                Test your level now!
              </div>
            </Link>
          </div>
        </div>
                    <div className="grid grid-cols-1 gap-10 my-10 md:grid-cols-3 sm:grid-cols-2 lg:px-32 md:px-10">
                        {level.map((item) => (
                            <Link to='/questions' key={item.id} className="card rounded-lg  h-[280px] flex justify-center items-center flex-col overflow-hidden px-8 cursor-pointer" >
                                <div className="img-card mb-4 bg-zinc-300 rounded-full p-3 w-[100px]  h-[100px] lg:w-[100px] lg:h-[100px] md:w-[95px] md:h-[95px]">
                                    <img src={card_img} alt="" className="m-auto" />
                                </div>
                                <h3 className="mb-2 text-2xl font-medium text-center title text-primary ">
                                    {item.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
        </>
    )
}

export default ChooseLanguage_Com;