import React from 'react'
import Group51 from "../../assets/About_Images/Group 51.png"

const Personalized_Learning = () => {
    return (
        <div className='Personalized_Learning'>
            <div class="flex flex-col md:flex-row md:items-center  gap-6 p-6 lg:p-12 ">

                <div class="w-full md:w-1/2 sm:w-4/5 flex justify-center">
                    <img src={Group51} alt="Illustration" class=" lg:w-full h-auto " />
                </div>

                <div class="w-full md:w-1/2 md:text-left">
                    <h2 class="text-lg lg:text-3xl md:text-2xl font-bold text-gray-800">
                        Personalized Learning Journey
                    </h2>
                    <ul class="mt-4 text-gray-600 space-y-3">
                        <li class="flex items-start gap-2">
                            <span class="text-lg">•</span>
                            <p>Take a quick assessment to determine your level: Beginner, Intermediate, or Advanced.</p>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-lg">•</span>
                            <p>Enjoy tailored questions and resources that match your expertise, ensuring effective preparation.</p>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Personalized_Learning