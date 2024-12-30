import React from "react";
import ProgressCuate from "../../assets/About_Images/Progress-cuate.png";
const Progress_Tracking = () => {
    return (
        <div class="flex flex-col md:flex-row items-center gap-6 p-6 ">
            <div class="w-full md:w-3/5 text-left">
                <h1 class="text-xl font-bold text-gray-800 md:text-4xl">
                    <span className="text-primary">Progress Tracking </span>
                </h1>
                <div className="ps-8 pt-5">
                    <ul className="text-lg list-disc lg:text-2xl sm:text-xl">
                        <li>Monitor your readiness through a personalized dashboard.</li>
                        <li>Save important questions for later review.</li>
                        <li>Receive tailored recommendations to stay on track.</li>
                    </ul>
                </div>
            </div>

            <img
                class="w-full md:w-2/5 h-auto rounded-lg shadow-md"
                src={ProgressCuate}
                alt="Description"
            />
        </div>
    );
};

export default Progress_Tracking;
