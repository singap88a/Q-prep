import React from "react";
import { Link } from "react-router-dom";
import "./Z_Error.css";

const ErrorPage = () => {
    return (
        <div className="ErrorPage">
            <main class="grid min-h-full place-items-center px-6 py-20 sm:py-40 lg:px-8">
                <div class="text-center">
                    <p class="font-semibold text-red-600 text-5xl ">404</p>
                    <h1 class="mt-2 text-balance text-5xl font-semibold tracking-tight sm:text-5xl text-red-600">
                        Page not found
                    </h1>
                    <p class="mt-4 text-pretty text-lg font-medium text-gray-200">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            class="rounded-md bg-green-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ErrorPage;
