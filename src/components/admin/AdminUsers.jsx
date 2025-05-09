import   { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://redasaad.azurewebsites.net/api/Account/GetUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Users:", res.data);
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="mt-10 text-lg text-center">Loading users...</div>;
  }

  return (
    <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen p-4 bg-gray-100 md:ml-64">
        <h1 className="mb-6 text-2xl font-bold text-center">Admin - Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="text-sm text-gray-700 uppercase bg-gray-100">
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Address</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-gray-700">
            {users.map((user, index) => {
              const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
              const photoUrl = user.urlPhoto
                ? `https://prep.blob.core.windows.net/photosprep/${user.urlPhoto}`
                
                 : "/default-user.png";

              return (
                <tr
                  key={user.id || index}
                  className="transition border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-3">{index + 1}</td>

                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={photoUrl}
                        alt="User"
                        className="object-cover w-10 h-10 border rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-user.png";  // Ensure fallback image
                        }}
                      />
                      <span>{fullName || "No Name"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-3">{user.email || "No Email"}</td>
                  <td className="px-6 py-3">{user.phoneNamber || "No Phone"}</td>
                  <td className="px-6 py-3">{user.address || "No Address"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>

  );
};

export default AdminUsers;
