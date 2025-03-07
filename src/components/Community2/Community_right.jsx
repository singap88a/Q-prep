import   { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // استيراد أيقونات من React Icons

function Community_right() {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div>
      {/* الجزء الأيمن */}
      <div className="right bg-[#8349db1e] basis-1/3 h-[100%] rounded-2xl">
        <div className="px-8 body-right py-7">
          {/* أيقونة للشاشات الصغيرة */}
          <div className="flex justify-end sm:hidden">
            <button
              onClick={toggleContentVisibility}
              className="text-3xl text-purple-700 transition-colors hover:text-purple-900"
            >
              {isContentVisible ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* المحتوى */}
          <div
            className={`${
              isContentVisible
                ? "block opacity-100 translate-y-0"
                : "hidden opacity-0 -translate-y-5"
            } sm:block sm:opacity-100 sm:translate-y-0 transition-all duration-300 ease-in-out`}
          >
            <div className="flex flex-col gap-5 top pb-7">
              <h3 className="text-3xl font-semibold">Funny</h3>
              <p className="text-xl font-medium">Created Jan 25, 2017</p>
              <p className="text-xl font-medium">Public</p>
              <div className="flex justify-between member-online">
                <div className="member">
                  <h3 className="text-3xl font-medium">15M</h3>
                  <h3 className="text-xl font-normal">Members</h3>
                </div>
                <div className="online">
                  <h3 className="text-3xl font-medium">1.2K</h3>
                  <h3 className="text-xl font-normal">Online</h3>
                </div>
              </div>
            </div>

            <div className="border-t-solid border-t-[2px] border-t-black pt-5"></div>

            <div className="bottom">
              <h3 className="text-xl font-normal">Rules</h3>
              <ul className="flex flex-col gap-5 px-5 pt-5 font-medium list-decimal text-md">
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
}

export default Community_right;