import React from 'react'
import { RefreshToken } from "./RefreshToken";

const AutoRefresh = async (url, options = {}) => {
    let token = localStorage.getItem("token");

    options.headers = {
        ...(options.headers || {}),
        "Authorization": `Bearer ${token}`,
    };

    let response = await fetch(url, options);

    if (response.status === 401) {
        // Token expired
        try {
            token = await RefreshToken();
            options.headers.Authorization = `Bearer ${token}`;
            response = await fetch(url, options);
        } catch (error) {
            console.error("Refresh token failed:", error);
            localStorage.clear();
            if (navigate) navigate("/login");
            throw error;
        }
    }

    return response;
}

export default AutoRefresh;