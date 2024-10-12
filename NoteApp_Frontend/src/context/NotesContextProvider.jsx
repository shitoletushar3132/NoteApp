import { useEffect, useState } from "react";
import { NotesContext } from "./NotesContext";

export const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes((prevNotes) => {
      const updatedNotes = [note, ...prevNotes];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== noteId);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const editNote = (noteId, newContent) => {
    setNotes((prevNotes) => {
      const editedNotes = prevNotes.map((note) =>
        note.id === noteId ? { ...note, content: newContent } : note
      );
      localStorage.setItem("notes", JSON.stringify(editedNotes));
      return editedNotes;
    });
  };

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(localData);
  }, []);

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {children}
    </NotesContext.Provider>
  );
};
