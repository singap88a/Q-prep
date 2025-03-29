import axios from "axios";
import { refreshToken } from "./RefreshToken";

const API_URL = "https://questionprep.azurewebsites.net/api";

// دالة تنفيذ الطلب مع التحقق من التوكن
const fetchData = async (endpoint, options = {}) => {
    try {
        const token = localStorage.getItem("token");

        // إرسال الطلب الأولي
        const response = await axios.get(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                ...options.headers
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            try {
                console.log("Token expired, refreshing token...");
                const newToken = await refreshToken(); // جلب التوكن الجديد

                // إعادة المحاولة باستخدام التوكن الجديد
                const retryResponse = await axios.get(`${API_URL}${endpoint}`, {
                    ...options,
                    headers: {
                        Authorization: `Bearer ${newToken}`,
                        ...options.headers
                    },
                    withCredentials: true,
                });

                return retryResponse.data;
            } catch (refreshError) {
                console.error("Failed to refresh token, redirecting to login...");
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        } else {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
};

export default fetchData;
