//  import Group51 from "../../assets/About_Images/Group 51.png"
import Personalized__Learning from "../../../public/animations/Personalized__Learning.json"
import Lottie from "lottie-react";

const Personalized_Learning = () => {
    return (
        <div className='Personalized_Learning'>
            <div className="flex flex-col gap-6 md:flex-row md:items-center ">

                <div className="flex justify-center w-full md:w-1/2 sm:w-4/5">
                    {/* <img src={Group51} alt="Illustration" className="h-auto lg:w-full" /> */}
                    <Lottie animationData={Personalized__Learning} className=""/>

                </div>

                <div className="w-full md:w-1/2 md:text-left">
                    <h2 className="text-lg font-bold text-gray-800 lg:text-3xl md:text-2xl">
                        Personalized Learning Journey
                    </h2>
                    <ul className="mt-4 space-y-3 text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="text-lg">•</span>
                            <p>Take a quick assessment to determine your level: Beginner, Intermediate, or Advanced.</p>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-lg">•</span>
                            <p>Enjoy tailored questions and resources that match your expertise, ensuring effective preparation.</p>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Personalized_Learning