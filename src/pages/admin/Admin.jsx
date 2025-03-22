import   { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUsers, FaCog } from "react-icons/fa"; // أيقونات من react-icons
import MainTrackDashboard from "../../components/admin/MainTrackDashboard";
 
function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // حالة فتح/غلق القائمة
  const location = useLocation(); // للحصول على المسار الحالي

  // روابط القائمة
  const links = [
    { path: "/admin/dashboard", name: "Main Tracks", icon: <FaHome /> },
    { path: "/requestQuestionId", name: "Request QuestionId", icon: <FaHome /> },

    { path: "/admin/users", name: "Users", icon: <FaUsers /> },
    { path: "/admin/settings", name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex">
      {/* أيقونة فتح/غلق القائمة على الشاشات الصغيرة */}
      <button
        className="fixed z-50 p-2 text-gray-800 bg-white rounded-lg border-[4px] top-20 left-4 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes  /> : <FaBars  />}
      </button>

      {/* القائمة الجانبية */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform top-16 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
        <div className="p-4 pt-14">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Dashboard</h2>
          <ul>
            {links.map((link) => (
              <li key={link.path} className="mb-4">
                <Link
                  to={link.path}
                  className={`flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${
                    location.pathname === link.path ? "bg-gray-100 font-semibold" : ""
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

      {/* المحتوى الرئيسي */}
      <div className="flex-1 p-4 md:ml-64">
        <MainTrackDashboard />
      </div>
    </div>
  );
}

export default Admin;