import { Link } from "react-router-dom";
import about_img from "../../assets/home-img/About_Q_Prep.png";

function About_Q_Prep() {
  return (
    <div className="container px-4 py-10 mx-auto">
      <h1 className="mb-10 text-3xl font-bold ">
      About <span className="text-transparent bg-gradient-to-r from-primary via-slate-500 to-secondary bg-clip-text">Q-Prep</span>
      </h1>
      <div className="flex flex-col justify-between gap-10 md:flex-row">
         <div className="w-full md:w-[30%] flex justify-center mb-6 md:mb-0">
          <img
            src={about_img}
            alt="About Q-Prep"
            className=""
          />
        </div>

         <div className="w-full md:w-[55%] flex flex-col justify-center">
          <h1 className="mb-4 text-2xl font-bold text-primary">
            Get Ready for Success with Q-Prep!
          </h1>
          <p className="mb-4 text-xl text-gray-600">
            Welcome to Q-Prep, your ultimate companion for interview preparation! Our platform is designed to simplify and enhance your journey toward acing interviews in your chosen track. Heres what makes Q-Prep unique.
          </p>
          <Link className="text-lg underline text-primary">Read more</Link>
        </div>
      </div>
    </div>
  );
}

export default About_Q_Prep;
