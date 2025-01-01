function Newsletter() {
  return (
    <div className="flex justify-between w-full px-5 py-5 sm:px-10  bg-primary">
      <div className="container flex flex-col items-center sm:flex-row gap-6">
        <div className="mb-4 lg:w-3/4 sm:mb-0 sm:w-1/2">
          <h6 className="text-xl font-bold text-white sm:text-2xl">Newsletter</h6>
          <p className="text-sm text-gray-300 sm:text-base">
            Stay ahead in your interview prep! Subscribe to our newsletter and get
            the latest questions, tips, and expert advice delivered straight to
            your inbox.
          </p>
        </div>

        <div className="w-full lg:w-1/4 sm:w-1/2 flex justify-between rounded-[10px] bg-white h-[40px] relative   ">
          <form className="flex items-center justify-between w-full">
            <input
              type="text"
              placeholder="Enter your email address"
              className="w-full  px-4 py-1 text-gray-700 rounded-lg focus:outline-none focus:bg-white"
            />
            <button
              type="submit"
              className="absolute px-4 py-1 text-white transition-all rounded-lg hover:bg-hover_secondary bg-primary right-2"
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
