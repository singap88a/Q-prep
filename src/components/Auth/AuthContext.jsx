import React from 'react'
import { createContext, useContext, useState, useEffect } from "react";


export const AuthContext = createContext();


const AuthProvider  = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    });

    //   const [userRole, setUserRole] = useState(localStorage.getItem("role"));
    // console.log("UserROle: " , userRole)


    const userRole = JSON.parse(localStorage.getItem("role"));
    console.log(userRole);
    // const [userRole, setUserRole] = useState([]);

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]);

    // const login = (token, userRole) => {
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("isLoggedIn", true);
    //     localStorage.setItem("role", userRole);

    //     setToken(token);
    //     setUserRole(userRole);
    //     setIsLoggedIn(true);
    // };

    // const logout = () => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("isLoggedIn");
    //     localStorage.removeItem("role");

    //     setToken(null);
    //     setUserRole(null);
    //     setIsLoggedIn(false);
    // };



    return (
        <AuthContext.Provider
            value={{
                token,
                isLoggedIn,
                userRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;