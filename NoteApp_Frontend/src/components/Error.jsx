import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F9F9F9]">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-[#333] mb-4">
          404 Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <button className="bg-[#08B27E] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#06a768] transition duration-300">
          <NavLink to="/notes" className="text-white">
            Go to Home Page
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default Error;
