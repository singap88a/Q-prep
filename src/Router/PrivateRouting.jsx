import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../components/Auth/AuthContext";
import { useContext } from "react";

const AdminRoute = () => {
    const { userRole } = useContext(AuthContext);

    if (!userRole || !Array.isArray(userRole) || !userRole.includes("Admin")) {
        return <Navigate to="/Unauthorized" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;

