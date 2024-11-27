import React, { useContext, useState, useRef, useEffect } from "react";
import { RiFileAddLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { NotesContext } from "../context/NotesContext";
import { logout, addNote, getUserData, getNotes } from "./api";

const Header = () => {
  const { userData, setUserData, setNotes } = useContext(NotesContext);
  const [showLogin, setShowLogin] = useState(false);
  const loginRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user data on component mount
  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data?.data?.notes);
    console.log(data);
  };
  useEffect(() => {
    fetchNotes();
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data?.data);
    };
    fetchUserData();
  }, [setUserData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setShowLogin(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Add a new note
  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      content: "To add note click edit button👆",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    addNote(newNote);
    fetchNotes();
  };

  // Logout handler
  const handleLogout = () => {
    setUserData({});
    logout();
  };

  return (
    <header className="bg-[#BCFFFA] flex justify-between items-center p-4 shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#333]">TS NOTES</div>

      {/* Greeting */}
      <div className="hidden md:block">
        {userData?.name
          ? `Welcome, ${userData.name}!`
          : "Login to access your notes anywhere"}
      </div>

      {/* Actions */}
      <div className="flex gap-4 items-center">
        {/* Add Note Button */}
        <NavLink to={"/"}>
          <button
            className="flex items-center bg-[#08B27E] rounded-lg px-4 py-2 text-white font-semibold hover:bg-[#06a768] transition"
            onClick={handleAddNote}
          >
            <RiFileAddLine size={20} />

            <span className="ml-2">Add New</span>
          </button>
        </NavLink>

        {/* Profile/Login Dropdown */}
        <div className="relative" ref={loginRef}>
          <button
            className="flex items-center justify-center rounded-full"
            onClick={() => setShowLogin(!showLogin)}
            aria-expanded={showLogin}
          >
            {userData?.image ? (
              <img
                src={userData.image}
                alt="User Profile"
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <FaRegUser size={30} className="text-[#333]" />
            )}
          </button>

          {showLogin && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-md z-50">
              {!userData?.name ? (
                <NavLink to={"/login"} onClick={() => setShowLogin(false)}>
                  <div className="flex items-center justify-between px-3 py-2 text-gray-700">
                    <span className="text-sm">Login</span>
                    <BiLogIn size={20} />
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
