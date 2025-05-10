import React from 'react'
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    
    // For boolean values, no need to parse JSON - just check if it exists
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        return loggedIn ? JSON.parse(loggedIn) : false;
    });

    // For role, provide a default empty string or null if not present
    const [userRole, setUserRole] = useState(() => {
        const role = (JSON.parse(localStorage.getItem("role")) || [])
        try {
            return role ? JSON.parse(role) : null;
        } catch (e) {
            return role || null; // if JSON parsing fails, return the raw value
        }
    });
    console.log("Auth", userRole)

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                token,
                isLoggedIn,
                userRole,
                setToken,
                setIsLoggedIn,
                setUserRole
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;