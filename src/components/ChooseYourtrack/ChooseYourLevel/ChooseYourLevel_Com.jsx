import { Link, useLocation } from 'react-router-dom';

// Image
import card_img from "../../../assets/ChooseTrack/Card-img.png";

// CSS
import "../Z_Track.css";

const ChooseLanguage_Com = () => {
  const location = useLocation();
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
              <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>
              <h1 className="text-2xl font-bold">{frameworkName}</h1>
            </div>
            <h1 className="text-sm text-gray-600 md:text-xl ms-6">
              Choose the framework
            </h1>
          </div>
        </div>
      </div>

      {/* Choose Your Level */}
      <div className="grid grid-cols-1 gap-32 my-20 md:grid-cols-3 sm:grid-cols-2 lg:px-32 md:px-10">
        {levels.map((level) => (
          <Link
            key={level.id}
            to={`${location.pathname}/${level.path}`}
            state={{ frameworkId, frameworkName }}
            className="h-full Levels"
          >
            <div className="bg_card">
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