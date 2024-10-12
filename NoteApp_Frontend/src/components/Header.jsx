import React, { useContext, useState } from "react";
import { RiFileAddLine } from "react-icons/ri";
import { NotesContext } from "../context/NotesContext";

const Header = () => {
  const { addNote } = useContext(NotesContext);

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
    <div>
      <div className="bg-[#BCFFFA] flex justify-between items-center p-4">
        <div className="text-xl font-bold">TS NOTES</div>
        <div className="flex gap-4 px-5">
          <button
            className="flex items-center justify-center bg-[#08B27E] rounded-xl p-2 text-white"
            onClick={handleAddNewClick}
          >
            <RiFileAddLine size={22} />
            <span className="ml-2 font-semibold">Add new</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
