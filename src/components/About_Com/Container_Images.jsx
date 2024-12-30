import React from 'react'
import About_Hero_img from './About_Hero_img';


//Images
import amico from "../../assets/About_Images/amico.png";
import amicoresume from "../../assets/About_Images/amico-resume.png";
import bro from "../../assets/About_Images/bro.png";
import cuate from "../../assets/About_Images/cuate.png";


const Container_Images = () => {
    return (
        <div className="images grid md:grid-cols-4 gap-3 sm:grid-cols-2">
            <About_Hero_img img={amico} style={{ width: '180px', height: '200px' }} />
            <About_Hero_img img={bro} style={{ width: '180px', height: '150px' }} />
            <About_Hero_img img={cuate} style={{ width: '180px', height: '200px' }} />
            <About_Hero_img img={amicoresume} style={{ width: '180px', height: '150px' }} />
        </div>
    )
}

export default Container_Images;