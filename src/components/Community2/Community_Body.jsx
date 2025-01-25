import React from "react";

import Posts from "./Posts/Posts";

import community2_img from "../../assets/community2_imgs/image.png";
import person1 from "../../assets/community2_imgs/person1.png";
import person2 from "../../assets/community2_imgs/person2.png";
import person3 from "../../assets/community2_imgs/personn3.png";
import post1 from "../../assets/community2_imgs/post1.png";
import post2 from "../../assets/community2_imgs/post2.png";
import post3 from "../../assets/community2_imgs/post3.png";

// import    from "../../assets/community2_imgs/dots.png";

const Community_Body = () => {
    return (
        <div className="container max-w-screen-xl mx-auto">
            <div className="body flex flex-col-reverse md:flex-row  gap-10 py-5">
                <div className="left basis-2/3 px-1  ">
                    {/* Left */}
                    <Posts
                        profile_img={person1}
                        Name="Mickel John"
                        Img_Post={post1}
                        Description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus."
                    />
                    <Posts
                        profile_img={person2}
                        Name="Mickel John"
                        Img_Post={post2}
                        Description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus."
                    />
                    <Posts
                        profile_img={person3}
                        Name="Mickel John"
                        Img_Post={post3}
                        Description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus."
                    />
                    <Posts
                        profile_img={person1}
                        Name="Mickel John"
                        Img_Post={post1}
                        Description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus."
                    />
                </div>
                {/* right */}
                <div className="right bg-gray-100 basis-1/3 h-[100vh] rounded-2xl">
                    <div className="body-right py-7 px-8 ">
                        <div className="top flex flex-col gap-5 pb-7">
                            <h3 className="text-3xl font-semibold">Funny</h3>
                            <p className="text-xl font-medium">Created Jan 25, 2017</p>
                            <p className="text-xl font-medium">Public</p>
                            <div className="member-online flex justify-between ">
                                <div className="member ">
                                    <h3 className="text-3xl font-medium">15M</h3>
                                    <h3 className="text-xl font-normal">Members</h3>
                                </div>
                                <div className="online ">
                                    <h3 className="text-3xl font-medium">1.2K</h3>
                                    <h3 className="text-xl font-normal">Online</h3>
                                </div>
                            </div>
                        </div>

                        <div className="border-t-solid  border-t-[2px] border-t-black pt-5"></div>

                        <div className="bottom ">
                            <h3 className="text-xl font-normal">Rules</h3>
                            <ul className="list-decimal flex flex-col gap-5 pt-5 px-5 text-md font-medium">
                                <li>All posts must make an attempt at humor.</li>
                                <li>No memes, HIFW, MRW, MeIRL, DAE, or similar posts.</li>
                                <li>No reposts.</li>
                                <li>No personal info, no hate speech, no harassment.</li>
                                <li>No politics or political figures.</li>
                                <li>
                                    No forbidden titles, low-effort titles, or posts about Reddit
                                    cakedays.
                                </li>
                                <li>No gore, pornography, or animal cruelty.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community_Body;

{
    /* <div className="left basis-2/3 px-1  ">
  <div className="header-left py-7 border-t-solid  border-t-[3px] border-t-black">
      <div className='flex justify-between items-center gap-5'>
          <div className='flex justify-center items-center gap-5'>
              <img src={person1} alt="img" className="w-12" />
              <h3 className="text-xl font-semibold">Mickel John</h3>
          </div>
           <div>
              x
              <img src={dots} alt="dots" />
          </div> 
      </div>
  
      <p className='font-medium py-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.</p>
      <img src={post1} alt="img" className="w-full" />
      <div className="btns pt-5 flex gap-10">
          <button className='bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md '>21K</button>
          <button className='bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md'>Share</button>
      </div>
  </div>
  
  <div className="header-left py-7 border-t-solid  border-t-[3px] border-t-black">
      <div className='flex justify-between items-center gap-5'>
          <div className='flex justify-center items-center gap-5'>
              <img src={person2} alt="img" className="w-12" />
              <h3 className="text-xl font-semibold">Mickel John</h3>
          </div>
          <div>
              <img src={dots} alt="dots" />
          </div>
      </div>
  
      <p className='font-medium py-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.</p>
      <img src={post2} alt="img" className="w-full" />
      <div className="btns pt-5 flex gap-10">
          <button className='bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md '>21K</button>
          <button className='bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md'>Share</button>
      </div>
  </div>
  
  <div className="header-left py-7 border-t-solid  border-t-[3px] border-t-black">
  
      <div className='flex justify-between items-center gap-5'>
          <div className='flex justify-center items-center gap-5'>
              <img src={person3} alt="img" className="w-12" />
              <h3 className="text-xl font-semibold">Mickel John</h3>
          </div>
          <div>
              <img src={dots} alt="dots" />
          </div>
      </div>
  
      <p className='font-medium py-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.</p>
      <img src={post3} alt="img" className="w-full" />
      <div className="btns pt-5 flex gap-10">
          <button className='bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md '>21K</button>
          <button className='bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md'>Share</button>
      </div>
  </div>
  
  <div className="header-left py-7 border-t-solid  border-t-[3px] border-t-black">
  
      <div className='flex justify-between items-center gap-5'>
          <div className='flex justify-center items-center gap-5'>
              <img src={community2_img} alt="img" className="w-12" />
              <h3 className="text-xl font-semibold">Mickel John</h3>
          </div>
          <div>
              <img src={dots} alt="dots" />
          </div>
      </div>
  
      <p className='font-medium py-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.</p>
      <img src={post1} alt="img" className="w-full" />
      <div className="btns pt-5 flex gap-10">
          <button className='bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md '>21K</button>
          <button className='bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md'>Share</button>
      </div>
  </div>
  </div> */
}
