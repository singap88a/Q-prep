// src/services/authService.ts
import axios from "axios";

const API_URL = "https://questionprep.azurewebsites.net/api/Authenticate";

export const refreshToken = async () => {
    try {
        const response = await axios.post(`${API_URL}/RefreshToken`, {}, { withCredentials: true });
        console.log(response);

        const newToken = response.data.token;
        localStorage.setItem("token", newToken); // حفظ التوكن الجديد

        return newToken;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error;
    }
};
