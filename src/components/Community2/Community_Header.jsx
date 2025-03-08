 import { Link } from "react-router-dom";

import community2_img from "../../assets/community2_imgs/image.png";

const Community_Header = () => {
    return (
        <div className="container">
            <div className="flex items-center justify-between py-5 header">
                <div className="flex items-center justify-between gap-5 header-left">
                    <img src={community2_img} alt="img" className="w-12 md:w-20" />
                    <h3 className="text-2xl font-medium">Funny</h3>
                </div>

                <div className="items-center justify-between header-right md:flex gap-7">
                    <Link to="/#">
                        <div className="relative z-10 py-1 px-2  text-center md:mb-0 mb-2 overflow-hidden font-semibold border-2 rounded-3xl md:py-[5px] md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white">
                            <span className="text-xl">+</span> Create Post
                        </div>
                    </Link>
                    <Link to="/#">
                        <div className="relative z-10 py-1 px-2  text-center overflow-hidden font-semibold text-white border-2 rounded-3xl md:py-[5px] md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary">
                            Join
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Community_Header;
