// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// const RefreshToken = async () => {
//     const navigate = useNavigate();

//     const refreshToken = localStorage.getItem("refreshToken")

//     try {
//         const refresTokenFetch = await fetch("https://questionprep.azurewebsites.net/api/Authenticate/RefreshToken", {
//             // method: "Get",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ token: refreshToken })
//         });

//         const data = await refresTokenFetch.json();

//         console.log("refresh Token:", data);

//         if (!response.ok) throw new Error(data.message);

//         localStorage.setItem("token", data.token);
//         localStorage.setItem("refreshToken", data.refreshToken);

//         return data.token;

//     } catch (err) {
//         localStorage.clear();
//         navigate("/login");
//     }

// }

// export default RefreshToken;