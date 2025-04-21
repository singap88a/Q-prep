import React from 'react'
import { createContext, useContext, useState, useEffect } from "react";


export const AuthContext = createContext();


const AuthProvider  = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    });
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem("role") || null;
    });

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]);

    const login = (token, role) => {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", role);

        setToken(token);
        setUserRole(role);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");

        setToken(null);
        setUserRole(null);
        setIsLoggedIn(false);
    };



    return (
        <AuthContext.Provider
            value={{
                token,
                isLoggedIn,
                userRole,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;