
import { Link, useLocation } from 'react-router-dom';
// Iamge-Card
import card_img from "../../../assets/ChooseTrack/Card-img.png";

// Css
import "../Z_Track.css";


const ChooseLanguage_Com = () => {


  const location = useLocation();
  const { frameworkId, frameworkName } = location.state || {}; // Fallback to empty object

  // console.log("Received Framework ID : In Your Level:", frameworkId);
  // console.log("Received Framework Name: In Your Level: ", frameworkName);

  return (
    <>
      <div>

        {/* Head */}
        <div className="flex items-center justify-between head">
          <div className="headRight">
            <div className="flex gap-3">
              <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
              <h1 className="text-2xl font-bold">{frameworkName}</h1>
            </div>

            <h1 className="text-sm text-gray-600 md:text-xl ms-6">Choose the Framework</h1>
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

        {/* Choose Your Level  */}
        <div className="grid grid-cols-1 gap-32 my-20 md:grid-cols-3 sm:grid-cols-2 lg:px-32 md:px-10">

          <Link to={`${location.pathname}/beginer`} state={{ frameworkId, frameworkName }} className="h-full Levels" >
            <div className=" bg_card">
              <img src={card_img} alt="" className="m-auto" />
            </div>
            <h3 className="">
              Beginer
            </h3>
          </Link>

          <Link to={`${location.pathname}/intermediate`} state={{ frameworkId, frameworkName }} className="h-full Levels" >
            <div className=" bg_card">
              <img src={card_img} alt="" className="m-auto" />
            </div>
            <h3 className="">
              Intermediate
            </h3>
          </Link>


          <Link to={`${location.pathname}/advanced`} state={{ frameworkId, frameworkName }} className="h-full Levels" >
            <div className=" bg_card">
              <img src={card_img} alt="" className="m-auto" />
            </div>
            <h3 className="">
              Advanced
            </h3>
          </Link>

        </div>

      </div>
    </>
  )
}

export default ChooseLanguage_Com;