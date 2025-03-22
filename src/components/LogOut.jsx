import React from 'react'
import { FaDoorOpen, FaRunning } from 'react-icons/fa';
import { motion } from "framer-motion";


import { useNavigate } from "react-router-dom";


const LogOut = ({ setIsLoggedIn }) => {

    const navigate = useNavigate();


    const logOut = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    }
    return (
        <>

            <button
                onClick={logOut}
                // className="px-4 py-1 text-red-600 border-2 border-red-600 rounded-md md:flex font-semibold hover:bg-red-600 hover:text-white transition"
                className="relative z-10 px-2 py-1 overflow-hidden font-semibold text-white border-2 rounded-md md:px-2 isolation-auto border-red-600 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-red-600 bg-red-600 "
            >
                <div
                    className='flex items-center justify-center gap-2'
                    whileHover="hover" >
                    {/* <p>LogOut</p> */}
                    <motion.span className='text-xl px-2'
                        initial={{ x: 0 }}
                        animate={{ x: 0 }} // Default position
                        whileHover={{ x: 20 }} // Moves right when hovering over the button
                        transition={{ duration: 1, repeatType: "reverse" }}>
                        <FaRunning />
                    </motion.span>
                    <span className='text-xl'><FaDoorOpen /></span>
                </div>
            </button>
        </>
    )
}

export default LogOut