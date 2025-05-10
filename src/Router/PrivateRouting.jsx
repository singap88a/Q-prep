import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../components/Auth/AuthContext";
import { useContext, useState } from "react";

const AdminRoute = () => {
    const { userRole } = useContext(AuthContext);
    const [token, setToken] = useState(localStorage.getItem("token"));

    if (!userRole || !token || !Array.isArray(userRole)  || !userRole.includes("Admin")) {
        return <Navigate to="/Unauthorized" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;

