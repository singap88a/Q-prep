/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import userImage from "../../assets/user.png";
import LogOut from "../../components/LogOut";

function Profile({ setIsLoggedIn }) {
  const [originalData, setOriginalData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("Egypt");
  const [profileImage, setProfileImage] = useState(userImage);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));


  const GetUserFunc = async () => {
    if (!token) return;
    try {
      if (!token) {
        throw new Error("No Token found");
      }
      const response = await fetch(
        `https://questionprep.azurewebsites.net/api/Account/GetUser`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }
      const data = await response.json();

      setOriginalData(data);

      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setAddress(data.address);
      setLocation(data.location);
      setDob(data.birthDay);
      setPhone(data.phoneNamber);
      setProfileImage(
        data.urlPhoto
          ? `https://questionprep.azurewebsites.net/ProfilePhoto/${data.urlPhoto}`
          : userImage
      );


      console.log("GetUser Data:", data);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetUserFunc();
  }, [token]);

  // Save Changes
  const handleSave = async () => {
    if (!token) {
      throw new Error("Token Not found");
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNamber", phone);
    formData.append("birthDay", dob);
    formData.append("address", address);
    formData.append("location", location);


    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) {
      formData.append("Photo", fileInput.files[0]);
    }

    console.log("Updated Profile Data:", formData);
    try {
      const response = await fetch(
        `https://questionprep.azurewebsites.net/api/Account/EditUser`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to edit profile: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setProfileImage(
        data.urlPhoto
          ? `https://questionprep.azurewebsites.net/ProfilePhoto/${data.urlPhoto}`
          : userImage
      );

      console.log("Profile edited successfully");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error editing profile:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset
  const DiscardChanges = () => {
    // if (originalData) {
    //   setFirstName(originalData.firstName);
    //   setLastName(originalData.lastName);
    //   setEmail(originalData.email);
    //   setAddress(originalData.address);
    //   setLocation(originalData.location);
    //   setDob(originalData.birthDay);
    //   setPhone(originalData.phoneNamber);
    //   setProfileImage(
    //     originalData.urlPhoto
    //       ? `https://questionprep.azurewebsites.net/ProfilePhoto/${originalData.urlPhoto}`
    //       : userImage
    //   );
    // }
    GetUserFunc();
    setIsEditMode(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);  // reader.result is [Base64]
      };
      reader.readAsDataURL(file); //readAsDataURL read img as a [URL]
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container p-4 mx-auto"
    >
      <div className="flex items-center gap-3 mb-8">
        <i className="text-2xl font-bold cursor-pointer fa-solid fa-chevron-left text-primary"></i>
        <motion.img
          src={profileImage}
          alt="Photo not load"
          className="w-20 h-20 rounded-full"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        {isEditMode &&
          <motion.label
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, y: -20, transition: { delay: 0.5 } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 px-2 mx-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md cursor-pointer md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
          >
            <input
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              disabled={!isEditMode}
            />
            Edit photo
          </motion.label>
        }
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="block gap-20 my-8 md:flex sm:flex lg:flex">
          <motion.div variants={slideIn} className="flex flex-col gap-2">
            <label htmlFor="firstName" className="font-semibold text-secondary">
              First name
            </label>
            <input
              type="text"
              placeholder="First name"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#8349db34] p-2 rounded"
              disabled={!isEditMode}
              required
            />
          </motion.div>
          <motion.div variants={slideIn} className="flex flex-col gap-2">
            <label htmlFor="lastName" className="font-semibold text-secondary">
              Last name
            </label>
            <input
              type="text"
              placeholder="Last name"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#8349db34] p-2 rounded"
              disabled={!isEditMode}
              required
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 mb-8 md:gap-20 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
          <motion.div variants={slideIn} className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-secondary">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#8349db34] p-2 rounded"
              disabled={!isEditMode}
              required
            />
          </motion.div>
          <motion.div variants={slideIn} className="flex flex-col gap-2">
            <label htmlFor="address" className="font-semibold text-secondary">
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-[#8349db34] p-2 rounded"
              disabled={!isEditMode}
              required
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 mb-8 md:gap-20 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
          <motion.div variants={slideIn} className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-semibold text-secondary">
              Phone number
            </label>
            <PhoneInput
              country={"+20"}
              value={phone}
              onChange={(value) => setPhone(value)}
              containerClass="w-full"
              inputClass="bg-[#8349db34] p-2 rounded"
              disabled={!isEditMode}
              required
            />
          </motion.div>
          <motion.div variants={slideIn} className="flex flex-col gap-2">
            <label htmlFor="dob" className="font-semibold text-secondary">
              Date of birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="bg-[#8349db34] p-2 rounded"
              disabled={!isEditMode}
              required
            />
          </motion.div>
          <motion.div variants={slideIn} className="flex flex-col gap-2">
            <label htmlFor="location" className="font-semibold text-secondary">
              Location
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-[#8349db34] p-2 rounded"
              disabled={!isEditMode}
              required
            >
              <option value="Egypt">Egypt</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
          </motion.div>
        </div>

        <div className="flex justify-between mb-20">
          <AnimatePresence mode="wait">
            {isEditMode ? (
              <motion.div
                key="edit-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-4"
              >
                <motion.button
                  type="button"
                  onClick={DiscardChanges}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-2 py-1 overflow-hidden font-bold border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white"
                >
                  Discard changes
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 px-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
                >
                  Save changes
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                key="edit-profile-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                type="button"
                onClick={() => setIsEditMode(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 px-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
              >
                Edit Profile
              </motion.button>
            )}
          </AnimatePresence>

          {/* Logout */}
          <LogOut setIsLoggedIn={setIsLoggedIn} />
        </div>
      </form>
    </motion.div>
  );
}

export default Profile;