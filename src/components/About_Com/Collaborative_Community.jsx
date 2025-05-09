import React from "react";

const Collaborative_Community = () => {
    return (
        <div className="Collaborative-Community text-center  py-10 my-5">
            <h2 className="my-5">
                <span className="text-primary text-2xl font-bold ">
                    Collaborative Community
                </span>
            </h2>
            <h1 >Join a vibrant forum where users:</h1>
            <ul className="pb-4">
                <li className="flex items-start gap-2">
                    <span className="text-lg">•</span>
                    <h2>Share tips and tricks.</h2>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-lg">•</span>
                    <h2>Discuss experiences.</h2>
                </li>
                <li className="flex items-start gap-2">
                    <span className="text-lg">•</span>
                    <h2>Vote on the most critical and relevant questions.</h2>
                </li>
            </ul>
        </div>
    );
};

export default Collaborative_Community;
