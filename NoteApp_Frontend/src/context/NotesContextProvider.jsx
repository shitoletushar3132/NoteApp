import { useEffect, useState } from "react";
import { NotesContext } from "./NotesContext";
import Cookies from "js-cookie";
import { addNote } from "../components/api";

export const NotesContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [notes, setNotes] = useState([]);

  return (
    <NotesContext.Provider
      value={{
        userData,
        setUserData,
        notes,
        setNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
