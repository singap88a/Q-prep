import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUsers,   } from "react-icons/fa"; // أيقونات من react-icons
import { LiaLayerGroupSolid } from "react-icons/lia";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // حالة فتح/غلق القائمة
  const location = useLocation();  

  // روابط القائمة
  const links = [
    { path: "/admin", name: "Main Tracks", icon: <FaHome /> },
    {
      path: "/requestQuestionId",
      name: "Request QuestionId",
      icon: <FaHome />,
    },

    { path: "/adminusers ", name: "Users", icon: <FaUsers /> },
    { path: "/groups", name: "Groups", icon: <LiaLayerGroupSolid /> },

    // { path: "/admin/settings", name: "Settings", icon: <FaCog /> },

  ];

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      {/* أيقونة فتح/غلق القائمة على الشاشات الصغيرة */}
      <button
        className={`fixed z-30 p-2 text-gray-800 bg-white rounded-lg border-[4px] top-18 left-14 md:hidden ${isSidebarOpen ? "translate-x-36" : "-translate-x-full opacity-80 hover:opacity-100"} transition-transform duration-200 ease-in-out`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* الـ Overlay
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={closeSidebar}
        ></div>
      )} */}

      {/* القائمة الجانبية */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform top-20 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out z-20`}
      >

        <div className="p-4 pt-14">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h2>
          <ul>
            {links.map((link) => (
              <li key={link.path} className="mb-4">
                <Link
                  to={link.path}
                  className={`flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${location.pathname === link.path
                    ? "bg-gray-100 font-semibold"
                    : ""
                    }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
