// Profile.jsx
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import userImage from "../../assets/user.png";
import "react-phone-input-2/lib/style.css";  

function Profile() {
  const [phone, setPhone] = useState("");

  return (
    <div className="container">
      <div className="flex items-center gap-3">
        <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>

        <img src={userImage} alt="User" className="w-20" />
        <button className="relative z-10 px-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary">
          Edit your photo
        </button>
      </div>

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

          <div className="grid grid-cols-1 gap-5 mb-8 md:gap-20 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-semibold text-secondary">
                Phone number
              </label>
              <PhoneInput
                country={"eg"} // Default country (Egypt)
                value={phone}
                onChange={(value) => setPhone(value)}
                containerClass="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="dob" className="font-semibold text-secondary">
                Date of birth
              </label>
              <input
                type="date"
                id="dob"
                className="bg-[#8349db34] p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="location"
                className="font-semibold text-secondary"
              >
                Location
              </label>
              <select id="location" className="bg-[#8349db34] p-2 rounded">
                <option value="Egypt">Egypt</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mb-20">
            <button
              type="submit"
              className="relative px-2 py-1 overflow-hidden font-bold border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white"
            >
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
  );
}

export default Profile;
