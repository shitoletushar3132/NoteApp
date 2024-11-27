import { useEffect, useState } from "react";
import { NotesContext } from "./NotesContext";
import Cookies from "js-cookie";
import { addNote } from "../components/api";

export const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [userData, setUserData] = useState([]);

  const addNoteToLocal = (note) => {
    // Update local state
    setNotes((prevNotes) => {
      const updatedNotes = [note, ...prevNotes];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      if (userData && userData._id) {
        addNote(note); // Pass the individual note to the server, not the full list
      }

      // After state is updated, check userData and call the API if user is logged in
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

  const addUserData = (userData) => {
    setUserData(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    if (userData && userData._id) {
      addNote(notes); // Pass the individual note to the server, not the full list
    }
  };

  const removeUserData = () => {
    Cookies.remove("authToken");
    setUserData([]);
    localStorage.removeItem("userData");
    if (userData && userData._id) {
      addNote(notes);
    }
  };

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("notes")) || [];
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    setUserData(userData);
    setNotes(localData);
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote: addNoteToLocal,
        deleteNote,
        editNote,
        addUserData,
        userData,
        removeUserData,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
