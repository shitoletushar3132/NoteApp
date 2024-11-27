import React, { useContext, useEffect } from "react";
import "./login.css";
import Background from "../assets/Background2.jpg";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth, test } from "./api";
import { NotesContext } from "../context/NotesContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUserData, userData } = useContext(NotesContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      navigate("/");
    }
  }, [userData, navigate]);

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        setUserData(result?.data?.user);
      }
    } catch (error) {
      console.error("Error while requesting Google code:", error);
    }
  };

  const loginwithgoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => console.error("Google Login Error:", error),
    flow: "auth-code",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    test(); // Custom function for manual login (if implemented)
  };

  return (
    <div
      className="bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${Background})`,
        height: "calc(100vh - 112px)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 mt-[72px]"></div>

      {/* Login Form */}
      <div className="login-page pt-16">
        <div className="form">
          <h1 className="text-center mb-6">Login to Note App</h1>
          <form className="login-form" onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
            <p className="message">
              Not Registered? <a href="#">Create Account</a>
            </p>
          </form>
          <button className="login-with-google-btn" onClick={loginwithgoogle}>
            Sign In With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
