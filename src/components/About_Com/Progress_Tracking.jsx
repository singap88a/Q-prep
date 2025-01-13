//   import ProgressCuate from "../../assets/About_Images/Progress-cuate.png";
import Progress__Tracking from "../../../public/animations/Progress_Tracking.json"
import Lottie from "lottie-react";

const Progress_Tracking = () => {
    return (
        <div className="flex flex-col items-center gap-6 p-6 md:flex-row ">
            <div className="w-full text-left md:w-3/5">
                <h1 className="text-xl font-bold text-gray-800 md:text-4xl">
                    <span className="text-primary">Progress Tracking </span>
                </h1>
                <div className="pt-5 ps-8">
                    <ul className="text-lg list-disc lg:text-2xl sm:text-xl">
                        <li>Monitor your readiness through a personalized dashboard.</li>
                        <li>Save important questions for later review.</li>
                        <li>Receive tailored recommendations to stay on track.</li>
                    </ul>
                </div>
            </div>

            <Lottie animationData={Progress__Tracking} className="md:w-[50%] w-full"/>

        </div>
    );
};

export default Progress_Tracking;
