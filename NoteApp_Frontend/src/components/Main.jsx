import React, { useContext, useEffect, useState } from "react";
import Background from "../assets/Background2.jpg";
import Note from "./Note";
import { NotesContext } from "../context/NotesContext";
import { useNavigate } from "react-router-dom";
import { getNotes } from "./api";

const Main = () => {
  const { notes, userData } = useContext(NotesContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData._id) {
      navigate("/login");
    }
  }, [userData]);

  return (
    <div
      className="bg-cover bg-center "
      style={{
        backgroundImage: `url(${Background})`,
        height: "calc(100vh - 112px)",
      }}
    >
      <div className="bg-[black] bg-opacity-25 h-full overflow-y-auto">
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap items-center justify-center gap-5">
            {notes?.map((note) => (
              <Note id={note.id} key={note.id} note={note} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
