/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
 import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    
    // For boolean values, no need to parse JSON - just check if it exists
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        return loggedIn ? JSON.parse(loggedIn) : false;
    });

    // For role, provide a default empty array if not present
    const [userRole, setUserRole] = useState(() => {
        const role = localStorage.getItem("role");
        if (!role) return [];
        try {
            return JSON.parse(role);
        } catch (e) {
            return []; // if JSON parsing fails, return empty array
        }
    });
    // console.log("Auth", userRole)

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
        } else {
            setIsLoggedIn(false);
            localStorage.setItem("isLoggedIn", "false");
            localStorage.removeItem("role");
            setUserRole([]);
        }
    }, [token, setUserRole]);

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