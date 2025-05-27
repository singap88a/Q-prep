import { Link, useLocation, useNavigate } from 'react-router-dom';

// Image
import card_img from "../../../assets/ChooseTrack/Card-img.png";

// CSS
import "../Z_Track.css";

import {motion} from "framer-motion"

const ChooseLanguage_Com = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { frameworkId, frameworkName } = location.state || {}; // Fallback to empty object


  const levels = [
    { id: 1, name: "Beginner", path: "beginer" },
    { id: 2, name: "Intermediate", path: "intermediate" },
    { id: 3, name: "Advanced", path: "advanced" },
  ];

  return (
    <div>
      <div>
        {/* Head */}
        <div className="flex items-center justify-between head">
          <div className="headRight">
            <div className="flex gap-3">
              <i 
                className="text-2xl font-bold fa-solid fa-chevron-left text-primary cursor-pointer"
                onClick={() => navigate(-1)}
              ></i>
              <h1 className="text-2xl font-bold">{frameworkName}</h1>
            </div>
            <h1 className="text-sm text-gray-600 md:text-xl ms-6">
              Choose Your Level
            </h1>
          </div>
          <Link to="/test_your_level"  state={{ frameworkId, frameworkName }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 px-2 py-2 overflow-hidden font-bold border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white"
            >
              Test your level
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Choose Your Level */}
      <div className="grid grid-cols-1 gap-16 my-20 md:grid-cols-3 sm:grid-cols-2  lg:px-32 md:px-10">
        {levels.map((level) => (
          <Link
            key={level.id}
            to={`${location.pathname}/${level.path}`}
            state={{ frameworkId, frameworkName }}
            className="h-full Levels"
          >
            <div className="bg_card ">
              <img src={card_img} alt="" className="m-auto" />
            </div>
            <h3>{level.name}</h3>
          </Link>
        ))}
      </div>
    </div >
  );
};

export default ChooseLanguage_Com;