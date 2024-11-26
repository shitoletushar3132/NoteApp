import React from "react";
import "./login.css";
import Background from "../assets/Background2.jpg";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const responseGoogle = async (authResult) => {
    try {
      console.log(authResult);
    } catch (error) {
      console.error("Error while requesting Google code :", err);
    }
  };
  const loginwithgoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <div
      className="bg-cover bg-center "
      style={{
        backgroundImage: `url(${Background})`,
        height: "calc(100vh - 112px)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 mt-[72px]"></div>
      <div>
        <div className="login-page pt-16">
          <div className="form">
            <h1 style={{ textAlign: "center" }} className="mb-6">
              Login To Note App
            </h1>
            <form className="login-form">
              <input type="text" name="" id="" placeholder="username" />
              <input type="password" name="" id="" placeholder="password" />
              <button>Login</button>
              <p className="message">
                Not Registerd? <a href="#">Create Account</a>
              </p>
            </form>
            <button className="login-with-google-btn" onClick={loginwithgoogle}>
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
