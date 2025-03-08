import person1 from "../../assets/community2_imgs/person1.png";
import person2 from "../../assets/community2_imgs/person2.png";
import person3 from "../../assets/community2_imgs/personn3.png";
import post1 from "../../assets/community2_imgs/post1.png";
import post2 from "../../assets/community2_imgs/post2.png";
import post3 from "../../assets/community2_imgs/post3.png";
import Community_right from "./Community_right";

import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Community_Body = () => {
  // data.js
  const postsData = [
    {
      id: 1,
      profile_img: person1,
      Name: "Mickel John",
      Img_Post: post1,
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
    },
    {
      id: 2,
      profile_img: person2,
      Name: "Mickel John",
      Img_Post: post2,
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
    },
    {
      id: 3,
      profile_img: person3,
      Name: "Mickel John",
      Img_Post: post3,
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
    },
    {
      id: 4,
      profile_img: person1,
      Name: "Mickel John",
      Img_Post: post1,
      Description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dui felis. Nam sed ex odio. Curabitur pulvinar libero et malesuada tempus.",
    },
  ];
  return (
    <div className="container max-w-screen-xl mx-auto">
      <div className="flex flex-col-reverse gap-10 py-5 body md:flex-row">
        <div className="px-1 left basis-2/3 ">
          {/* Left */}
          {postsData.map((post, id) => (
            <div key={id}>
              <div className="header-left py-7 border-t-solid  border-t-[2px] border-t-[#7f7e7eb3]">
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-center justify-center gap-5">
                    <img
                      src={post.profile_img}
                      alt="profile_img"
                      className="w-12 cursor-pointer"
                    />
                    <h3 className="text-xl font-semibold cursor-pointer">
                      {post.Name}
                    </h3>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className="text-3xl transition-all cursor-pointer hover:text-primary"
                    />
                  </div>
                </div>

                <p className="py-2 font-medium">{post.Description}</p>
                <img src={post.Img_Post} alt="Img_Post" className="w-full" />
                <div className="flex gap-10 pt-5 btns">
                  <button className="bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md hover:bg-black hover:text-white ">
                    21K
                  </button>
                  <button className="bg-blue-50 border-2 rounded-3xl px-8 py-[4px] text-lg font-semibold shadow-md hover:bg-black hover:text-white ">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* right */}
        <div className=" basis-1/3">
          <Community_right />
        </div>
      </div>
    </div>
  );
};

export default Community_Body;
