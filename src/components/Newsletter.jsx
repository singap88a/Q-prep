// import React from 'react'

function Newsletter() {
  return (
    <div className=" w-full px-10 py-2 flex justify-between bg-primary ">
        <div className="container flex">
        <div className="">
        <h6 className="text-white text-1.5xl font-bold">Newsletter </h6>
        <p className="text-gray-300  text-[15px]">
          Stay ahead in your interview prep! Subscribe to our newsletter and get
          the latest questions, tips, and expert advice delivered straight to
          your inbox.
        </p>
      </div>

      <div className=" flex w-[400px] justify-between rounded-[10px] bg-white h-[40px] relative m-auto  ">
        <form className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Enter your email address"
            className="w-full px-4 py-1 rounded-lg text-gray-700 focus:outline-none focus:bg-white "
          />
          <button
            type="submit"
            className="px-4 py-1 rounded-lg text-white  hover:bg-hover_secondary bg-primary absolute right-2 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>

        </div>
   
    </div>
  );
}

export default Newsletter;
