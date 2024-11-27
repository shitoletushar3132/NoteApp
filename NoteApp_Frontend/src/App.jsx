import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { NotesContextProvider } from "./context/NotesContextProvider";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Error from "./components/Error";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const location = useLocation();

  // Environment variable for Google client ID
  const GOOGLE_CLIENT_ID =
    "109866568412-bpotdt4vc1kkt0p6uv4krprsdjlv6cpq.apps.googleusercontent.com";

  // Determine whether to show the footer
  const showFooter = location.pathname !== "/login";

  return (
    <>
      <NotesContextProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          {}
          <Route
            path="/login"
            element={
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <Login />
              </GoogleOAuthProvider>
            }
          />

          <Route path="*" element={<Error />} />
        </Routes>

        {showFooter && <Footer />}
      </NotesContextProvider>
    </>
  );
}

export default App;
