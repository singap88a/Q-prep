/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import userImage from "../../assets/user.png";
import LogOut from "../../components/LogOut";
import { FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import PrivateRoute from "../../Router/PrivateRouting";
import { useUser } from "../../Context/UserContext";
import { AuthContext } from "../../components/Auth/AuthContext";

import { RiImageEditLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";



function Profile({ setIsLoggedIn, setSavedQuestions, setIsSaved }) {
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
  const [userId, setUserId] = useState(null);
  const { setProfileImage: setGlobalProfileImage } = useUser();

  const { userRole } = useContext(AuthContext)
  // console.log("userRole", userRole);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();



  const GetUserFunc = async () => {
    if (!token) return;
    try {
      if (!token) {
        throw new Error("No Token found");
      }
      const response = await fetch(
        `https://redasaad.azurewebsites.net/api/Account/GetUser`,
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
          ? `https://prep.blob.core.windows.net/photosprep/${data.urlPhoto}`
          : userImage
      );
      setUserId(data.id);



      // console.log("GetUser Data:", data);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `https://redasaad.azurewebsites.net/api/Account/GetUser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const err = new Error(response.message || response.error || "Login failed. Please check your credentials.");
          err.status = response.status;
          throw err;
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

        const newImage = data.urlPhoto
          ? `https://prep.blob.core.windows.net/photosprep/${data.urlPhoto}`
          : userImage;

        setProfileImage(newImage);
        setGlobalProfileImage(newImage); // تحديث الصورة في الكون텍ست العالمي

      } catch (error) {
        console.error("Error fetching user:", error.message);
        setError(error.message);
        if (error.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, setGlobalProfileImage]); // أضف setGlobalProfileImage إلى dependencies

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
    if (fileInput?.files[0]) {
      formData.append("Photo", fileInput.files[0]);
    }

    try {
      const response = await fetch(
        `https://redasaad.azurewebsites.net/api/Account/EditUser`,
        {
          method: "PUT",
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
      const newImage = data.urlPhoto
        ? `https://prep.blob.core.windows.net/photosprep/${data.urlPhoto}`
        : userImage;

      // تحديث الصورة محلياً وفي الكون텍ست العالمي
      setProfileImage(newImage);
      setGlobalProfileImage(newImage);
      toast.success("Edit successfully")

      // إظهار رسالة نجاح
      // console.log("Profile edited successfully");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error editing profile:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Dicard Changes
  const DiscardChanges = () => {
    setIsEditMode(false);
    GetUserFunc();
    setShowModal(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {

      const allowedTypesRegex = /\.(jpg|jpeg|png|bmp|webp)$/i;

      if (!allowedTypesRegex.test(file.name)) {
        toast.error("Only image files (jpg, jpeg, png, bmp, webp) are allowed.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);  // reader.result is [Base64]
        toast.info("Image Uploaded")
      };
      reader.readAsDataURL(file); // ReadAsDataURL read img as a [URL]
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


  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container p-4 mx-auto"
    >
      <ToastContainer />
      <div className="flex items-center gap-3 mb-8">


        <div>
          {/* Modal Confirmation */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 ">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-4  ">
                <h2 className="text-lg font-semibold mb-4">
                  Are you Sure want Discard changes !!
                </h2>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                  >
                    No
                  </button>
                  <button
                    onClick={DiscardChanges}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <i className="text-2xl font-bold cursor-pointer fa-solid fa-chevron-left text-primary"></i> */}
        <div className="flex sm:flex-row flex-col sm:items-center justify-between w-full sm:gap-3 gap-5">

          <div className="flex items-center gap-3 ">
            <motion.img
              src={profileImage}
              alt="Photo not load"
              className="md:w-20 md:h-20 w-16 h-16 rounded-full"
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
                className="relative z-10  px-2 py-1 mx-2 overflow-hidden md:font-bold font-semibold  md:text-lg text-sm text-white border-2 rounded-md cursor-pointer md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={!isEditMode}
                />
                <span className="flex items-center justify-center gap-1"> <span className="mt-1"><RiImageEditLine size={20} /></span> photo </span>
              </motion.label>
            }
          </div>
          {isEditMode &&
            <Link to='ChangePassword'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                exit={{ opacity: 0, y: -20, transition: { delay: 0.5 } }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10  md:w-full w-40 text-center  px-2 py-1 mx-2 overflow-hidden md:font-bold font-semibold md:text-lg text-sm text-white border-2 rounded-md cursor-pointer md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary ">
                Change Password
              </motion.div>
            </Link>
          }
        </div>
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

        <div className="flex sm:flex-row flex-col justify-between mb-20 md:gap-0 gap-10 ">
          <AnimatePresence mode="wait">
            {isEditMode ? (
              <motion.div
                key="edit-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex sm:flex-row flex-col md:gap-2 gap-3"
              >
                <motion.button
                  type="button"
                  onClick={handleOpenModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-2 py-1 overflow-hidden font-bold  text-lg border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white"
                >
                  Discard changes
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 px-2 py-1 overflow-hidden font-bold  text-lg text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
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
                className="relative z-10 px-2 py-1 overflow-hidden font-bold  text-lg text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
              >
                Edit Profile
              </motion.button>
            )}
          </AnimatePresence>

          {/* Logout */}
          <LogOut
            setIsLoggedIn={setIsLoggedIn}
            setSavedQuestions={setSavedQuestions}
            setIsSaved={setIsSaved}
          />
        </div>
      </form>

    </motion.div>
  );
}

export default Profile;