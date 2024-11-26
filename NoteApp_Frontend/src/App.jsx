import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { NotesContextProvider } from "./context/NotesContextProvider";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Error from "./components/Error";

function App() {
  // Get the current location/path
  const location = useLocation();

  return (
    <>
      <NotesContextProvider>
        <Header />

        <Routes>
          <Route path="/notes" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>

        {/* Conditionally render Footer based on the current path */}
        {location.pathname !== "/login" && <Footer />}
      </NotesContextProvider>
    </>
  );
}

export default App;
