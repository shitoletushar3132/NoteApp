import React, { useContext } from "react";
import Background from "../assets/Background2.jpg";
import Note from "./Note";
import { NotesContext } from "../context/NotesContext";

const Main = () => {
  const { notes } = useContext(NotesContext);

  return (
    <div
      className="bg-cover bg-center "
      style={{
        backgroundImage: `url(${Background})`,
        height: "calc(100vh - 112px)",
      }}
    >
      <div className="bg-[black] bg-opacity-25 h-full overflow-y-scroll">
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap items-center justify-center gap-5">
            {notes.map((note) => (
              <Note id={note.id} key={note.id} note={note} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
