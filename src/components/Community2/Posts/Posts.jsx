import React from 'react'

import "../post_style.css"

import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Posts = ({ profile_img, Name, Img_Post, Description }) => {
    return (
        <div>
            <div className="header-left py-7 border-t-solid  border-t-[3px] border-t-black">
                <div className='flex justify-between items-center gap-5'>
                    <div className='flex justify-center items-center gap-5'>
                        <img src={profile_img} alt="profile_img" className="w-12 cursor-pointer" />
                        <h3 className="text-xl font-semibold cursor-pointer">{Name}</h3>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faEllipsis} className='text-3xl cursor-pointer'/>
                    </div>
                </div>

                <p className='font-medium py-2'>{Description}</p>
                <img src={Img_Post} alt="Img_Post" className="w-full" />
                <div className="btns pt-5 flex gap-10">
                    <button className='bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md hover:bg-black hover:text-white '>21K</button>
                    <button className='bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md hover:bg-black hover:text-white '>Share</button>
                </div>
            </div>
        </div>
    )
}

export default Posts