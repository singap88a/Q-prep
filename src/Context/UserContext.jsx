/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';
import userImage from '../assets/user.png';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn ? null : userImage;
  });

  // Reset profile image when logged out
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      setProfileImage(userImage);
    }
  }, []);

  return (
    <UserContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);