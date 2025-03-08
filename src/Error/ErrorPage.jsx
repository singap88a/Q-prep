  import Lottie from "lottie-react";
import Hero_animation from  "../../public/animations/404.json";
import { Link } from "react-router-dom";
const ErrorPage = () => {
    return (
        <div className="ErrorPage">
            <div className="w-[100%]  ">
                 <Lottie animationData={Hero_animation} className=""></Lottie>
            </div>
           <div className="absolute top-[75%] right-[67%] text-center">

                         <p className="text-[#1a2169] text-xl font-bold pb-3 ">Page Not Found</p>
            <Link to="/" className="px-4 py-2 rounded-xl bg-[#1a2169] text-white hover:bg-[#373f9a] transition-all">Go Back Home</Link>
           </div>

            
            
        </div>
    );
};

export default ErrorPage;
