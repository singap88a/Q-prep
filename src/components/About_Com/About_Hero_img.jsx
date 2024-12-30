import React from "react";

//Style
import "../About_Com/About.css";

const About_Hero_img = ({img , style}) => {
    return (
        <>
            <div className="image-container pt-10">
                <div className="img">
                    <img src={img} alt="interview" style={style} />
                </div>
            </div>
        </>
    )
};

export default About_Hero_img;
