import React, { useContext, useState, useRef } from "react";
import { RiFileAddLine } from "react-icons/ri";
import { NotesContext } from "../context/NotesContext";
import { FaRegUser } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { logout, test } from "./api";
import Cookies from "js-cookie";

const Header = () => {
  const { addNote, userData, removeUserData } = useContext(NotesContext);
  const [showLogin, setShowLogin] = useState(false);
  const loginRef = useRef(null);

  // Handle clicks outside the dropdown
  const handleClickOutside = (e) => {
    if (loginRef.current && !loginRef.current.contains(e.target)) {
      setShowLogin(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleAddNewClick = () => {
    const newNoteData = {
      id: Date.now(),
      content: "To add note click edit button👆",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    addNote(newNoteData);
  };

  const handleLogout = () => {
    logout();
    removeUserData();
    console.log("User logged out");
  };

  return (
    <header className="bg-[#BCFFFA] flex justify-between items-center p-4 shadow-lg">
      <div className="text-2xl font-bold text-[#333]" onClick={() => test()}>
        TS NOTES
      </div>
      <div className="hidden md:flex">
        {userData?.name
          ? `Welcome, ${userData.name}!`
          : "Login for Accessing notes anywhere"}
      </div>
      <div className="flex gap-4 items-center">
        {/* Add New Note Button */}
        <NavLink to={"/"}>
          <button
            className="flex items-center justify-center bg-[#08B27E] rounded-lg p-2 text-white font-semibold hover:bg-[#06a768] transition duration-200"
            onClick={handleAddNewClick}
          >
            <RiFileAddLine size={22} />
            <span className="ml-2">Add New</span>
          </button>
        </NavLink>

        {/* Login/Logout Dropdown */}
        <div className="relative" ref={loginRef}>
          <button
            className="flex items-center justify-center bg-transparent border-none rounded-full p-1"
            onClick={() => setShowLogin(!showLogin)}
            aria-expanded={showLogin}
            aria-label="Toggle login dropdown"
          >
            {userData?.image ? (
              <img
                src={userData.image}
                alt="User Profile"
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <FaRegUser size={35} className="text-[#333]" />
            )}
          </button>

          {showLogin && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded-md shadow-md z-50">
              {!userData?.name ? (
                <NavLink to={"/login"} onClick={() => setShowLogin(false)}>
                  <div className="flex justify-between items-center h-12 px-3 text-gray-700">
                    <span className="text-sm">Login</span>
                    <BiLogIn size={25} />
                  </div>
                </NavLink>
              ) : (
                <div className="flex flex-col items-center py-2 text-gray-700">
                  <span className="text-sm">{userData.name}</span>
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
