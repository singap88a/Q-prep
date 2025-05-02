import React from "react";

const MessageWelcome = () => {
    return (
        <div className="container">
            <div className="MessageWelcome py-10">
                <h1 >Welcome to <span className="text-secondary">Q-Prep</span></h1>
                <h2 className="text-gray-600 md:text-2xl text-lg">
                    Your ultimate companion for interview preparation! Our platform is
                    designed to simplify and enhance your journey toward acing interviews in
                    your chosen track. Here's what makes Q-Prep unique
                </h2>
            </div>
        </div>
    );
};

export default MessageWelcome;
