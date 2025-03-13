/* eslint-disable react/prop-types */
import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const ProtectRouting = ({ isLoggedIn }) => {
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectRouting;