// import React from 'react'
import userImage from "../../assets/user.png";

function Profile() {
  return (
    <div className="container">
      <div className="flex items-center gap-3">
        <i className="text-2xl font-bold fa-solid fa-chevron-left text-primary"></i>

        <img src={userImage} alt="" className="w-20" />
        <button className="relative z-10 px-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary">
          Edit your photo
        </button>
      </div>

      <div className="">
        <form action="">
          <div className="block gap-20 my-8 md:flex sm:flex lg:flex">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold text-secondary">
                First name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="bg-[#8349db34] p-2 rounded  "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold text-secondary">
                Last name
              </label>
              <input
                type="text"
                placeholder="Last name "
                className="bg-[#8349db34] p-2 rounded"
              />
            </div>
          </div>
            {/* ///////////////// */}
          <div className="grid grid-cols-1 gap-20 mb-8 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold text-secondary">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="bg-[#8349db34] p-2 rounded  "
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="" className="font-semibold text-secondary">
                Address
              </label>
              <input
                type="text"
                placeholder="Address"
                className="bg-[#8349db34] p-2 rounded   "
              />
            </div>
          </div>
          {/* ///////////////////// */}
          <div className="grid grid-cols-1 gap-20 mb-8 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold text-secondary">
                  Phone number
                </label>
                <input
                  type="text"
                  placeholder="Phone number"
                  className="bg-[#8349db34] p-2 rounded  "
                />
  
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold text-secondary">
                Date of birth
              </label>
              <input
                type="date"
                placeholder="Date of birth"
                className="bg-[#8349db34] p-2 rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold text-secondary">
              Location
              </label>
              <select
                className="bg-[#8349db34] p-2 rounded"
              >
                <option value="">Egypt</option>
                <option value="">USA</option>
                <option value="">Canada</option>
                <option value="">UK</option>
                <option value="">Australia</option>
                <option value="">Other</option>
                
                
              </select>
            </div>
          </div>
          {/* //// */}
          <div className="flex justify-between mb-20 ">
            <button className="relative z-10 px-2 py-1 overflow-hidden font-bold border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 text-secondary hover:text-white">Save changes</button>
            <button className="relative z-10 px-2 py-1 overflow-hidden font-bold text-white border-2 rounded-md md:px-8 isolation-auto border-secondary before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full before:bg-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 hover:text-secondary bg-secondary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
