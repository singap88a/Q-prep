import React from 'react'


//Images 
import dynami_cuate from "../../assets/About_Images/Dynamic_cuate.png"
import rafiki from "../../assets/About_Images/rafiki.png"
import Character from "../../assets/About_Images/Character.png"

const Dynamic_Resources = () => {
    return (
        <div className='Dynamic-Resources  py-10'>
            <div className="grid md:grid-cols-3  gap-4">

                <div>
                    <div className="img rounded-full ">
                        <img src={rafiki} alt="rafiki_img" className='md:w-full'/>
                    </div>
                    <div className="content mx-5 mt-4">
                        <h1 className='text-primary'>Extensive Resources</h1>
                        <h2 className='font-medium'>Access curated content, including:</h2>
                        <ul className='list-disc ps-6'>
                            <li>Skill requirements.</li>
                            <li>Recommended books and articles.</li>
                            <li>Links to courses relevant to your track</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="img rounded-full ">
                        <img src={dynami_cuate} alt=""  className='md:w-full'/>
                    </div>
                    <div className="content  mx-5 mt-4">
                        <h1 className='text-primary'>Dynamic Updates</h1>
                        <ul className='list-disc ps-6'>
                            <li>Benefit from a constantly updated database.</li>
                            <li>Explore real-life interview questions contributed by users like you.</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="img rounded-full">
                        <img src={Character} alt=""  className='md:w-full'/>
                    </div>
                    <div className="content mx-5 mt-4">
                        <h1 className='text-primary'>Gamified Experience</h1>
                        <h2 className='font-medium'>Earn points for:</h2>
                        <ul className='list-disc ps-6'>
                            <li>Completing challenges.</li>
                            <li>Answering questions correctly.</li>
                            <li>Take on daily and weekly challenges to make learning fun and engaging!</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dynamic_Resources