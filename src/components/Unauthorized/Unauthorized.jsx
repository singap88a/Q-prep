import react from "react";

import Access_Denied from "../../../public/animations/Access_Denied.json"
import Lottie from "lottie-react";
// import { Angry } from 'lucide-react';
import { FaAngry } from "react-icons/fa";



const Unauthorized = () => {
    return (
        <div className="text-center p-10">
            <div className="flex items-center justify-center  gap-2 text-red-600 text-3xl font-bold">
                <h1 className="text-3xl font-bold ">Access Denied</h1>
                <FaAngry />
            </div>
            <p className="text-gray-600">You are not authorized to view this page .</p>
            <Lottie
                animationData={Access_Denied}
                className="md:w-[75%] m-auto  mt-10"
            />
        </div>
    );
};

export default Unauthorized;