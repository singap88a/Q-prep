import axios from 'axios';
import React, { Children, createContext, useEffect, useState } from 'react'

export const MainTrackContext = createContext();



const MainTrackProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [tracks, setTracks] = useState([]);
    console.log("trackscontext", tracks);
    const [loading, setLoading] = useState(false);

    const fetchTracks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://questionprep.azurewebsites.net/api/MainTrack/GetMainTrack",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTracks(response.data);
        } catch (error) {
            console.error("Error fetching tracks:", error);
            toast.error("Failed to fetch tracks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchTracks();
        }
    }, [token]);


    return (
        <>
            <MainTrackContext.Provider value={{
                token,
                tracks,
            }}>
                {children}
            </MainTrackContext.Provider>

        </>
    )
}

export default MainTrackProvider;