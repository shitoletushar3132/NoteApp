import React, { useContext, useState, useRef } from "react";
import { RiFileAddLine } from "react-icons/ri";
import { NotesContext } from "../context/NotesContext";
import { FaRegUser } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { addNote } = useContext(NotesContext);
  const [showLogin, setShowLogin] = useState(false);

  // Reference to the login dropdown for detecting click outside
  const loginRef = useRef(null);

  // Function to handle closing the login dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (loginRef.current && !loginRef.current.contains(e.target)) {
      setShowLogin(false);
    }
  };

  // Adding event listener on mount and cleaning up on unmount
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

  return (
    <header className="bg-[#BCFFFA] flex justify-between items-center p-4 shadow-lg">
      <div className="text-2xl font-bold text-[#333]">TS NOTES</div>
      <div className="flex gap-4 items-center">
        {/* Add New Note Button */}
        <NavLink to={"/notes"}>
          <button
            className="flex items-center justify-center bg-[#08B27E] rounded-lg p-2 text-white font-semibold hover:bg-[#06a768] transition duration-200"
            onClick={handleAddNewClick}
          >
            <RiFileAddLine size={22} />
            <span className="ml-2">Add New</span>
          </button>
        </NavLink>

        {/* Login Button and Dropdown */}
        <div className="relative" ref={loginRef}>
          <button
            className="flex items-center justify-center bg-transparent border-none"
            onClick={() => setShowLogin(!showLogin)}
          >
            <FaRegUser size={35} className="text-[#333]" />
          </button>

          {showLogin && (
            <NavLink to={"/login"}>
              <div className="absolute right-0 mt-2 w-36 h-12 bg-white border border-gray-300 rounded-md shadow-md flex justify-between items-center px-3 text-gray-700 z-50">
                <span className="text-sm">Login</span>
                <BiLogIn size={25} />
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
