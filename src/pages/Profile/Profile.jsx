import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import userImage from "../../assets/user.png";

function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("Egypt");
  const [profileImage, setProfileImage] = useState(userImage);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("profileData"));
    if (savedData) {
      setPhone(savedData.phone || "");
      setFirstName(savedData.firstName || "");
      setLastName(savedData.lastName || "");
      setEmail(savedData.email || "");
      setAddress(savedData.address || "");
      setDob(savedData.dob || "");
      setLocation(savedData.location || "Egypt");
      setProfileImage(savedData.profileImage || userImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const profileData = {
      phone,
      firstName,
      lastName,
      email,
      address,
      dob,
      location,
      profileImage,
    };
    localStorage.setItem("profileData", JSON.stringify(profileData));
    setIsEditMode(false); // Exit edit mode after saving
  };

  const handleReset = () => {
    localStorage.removeItem("profileData");
    setPhone("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setDob("");
    setLocation("Egypt");
    setProfileImage(userImage);
    setIsEditMode(false);
  };

  // Animation variants
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
          alt="User"
          className="w-20 h-20 rounded-full"
          whileHover={{ scale: 1.1 }} // Scale up on hover
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.label
          whileHover={{ scale: 1.05 }} // Slight scale on hover
          whileTap={{ scale: 0.95 }} // Slight scale on click
          className="relative z-10 px-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md cursor-pointer md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
        >
          <input
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            disabled={!isEditMode}
          />
          Edit your photo
        </motion.label>
      </div>

<<<<<<< HEAD
      <div>
        <form>
          <div className="block gap-20 my-8 md:flex sm:flex lg:flex">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="firstName"
                className="font-semibold text-secondary"
              >
                First name
              </label>
              <input
                type="text"
                placeholder="First name"
                id="firstName"
                className="bg-[#8349db34] p-2 rounded"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lastName"
                className="font-semibold text-secondary"
              >
                Last name
              </label>
              <input
                type="text"
                placeholder="Last name"
                id="lastName"
                className="bg-[#8349db34] p-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 mb-8 md:gap-20 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-secondary">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="bg-[#8349db34] p-2 rounded"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="font-semibold text-secondary">
                Address
              </label>
              <input
                type="text"
                placeholder="Address"
                id="address"
                className="bg-[#8349db34] p-2 rounded"
              />
            </div>
          </div>
=======
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="block gap-20 my-8 md:flex sm:flex lg:flex">
          <motion.div
            variants={slideIn}
            className="flex flex-col gap-2"
          >
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
          <motion.div
            variants={slideIn}
            className="flex flex-col gap-2"
          >
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
          <motion.div
            variants={slideIn}
            className="flex flex-col gap-2"
          >
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
          <motion.div
            variants={slideIn}
            className="flex flex-col gap-2"
          >
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
>>>>>>> 9297dd64a0791df1af78f1541386e72f79b92ec4

        <div className="grid grid-cols-1 gap-5 mb-8 md:gap-20 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
          <motion.div
            variants={slideIn}
            className="flex flex-col gap-2"
          >
            <label htmlFor="phone" className="font-semibold text-secondary">
              Phone number
            </label>
            <PhoneInput
              country={"eg"}
              value={phone}
              onChange={(value) => setPhone(value)}
              containerClass="w-full"
              inputClass="bg-[#8349db34] p-2 rounded"
              disabled={!isEditMode}
              required
            />
          </motion.div>
          <motion.div
            variants={slideIn}
            className="flex flex-col gap-2"
          >
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
          <motion.div
            variants={slideIn}
            className="flex flex-col gap-2"
          >
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
<<<<<<< HEAD
              Discard changes
            </button>
            <button
              type="reset"
              className="relative z-10 px-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
=======
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
                  onClick={handleReset}
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
        </div>
      </form>
    </motion.div>
>>>>>>> 9297dd64a0791df1af78f1541386e72f79b92ec4
  );
}

export default Profile;