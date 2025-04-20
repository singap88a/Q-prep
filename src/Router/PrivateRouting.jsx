import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/Auth/AuthContext";
import { useContext } from "react";

const AdminRoute = ({ children }) => {
    const { userRole } = useContext(AuthContext)
    console.log(userRole);

    if (userRole !== "admin") {
        return <Navigate to="/Unauthorized" replace />;
    }

    return children;
};

export default AdminRoute;